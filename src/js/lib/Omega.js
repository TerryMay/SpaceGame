import * as PIXI from "pixi.js";
import Vector from "./Vector";
import Controls from "./Controls";
import TriangleHull from "./BasicTriangle";

class Omega extends PIXI.Sprite {
  static get HULL_STATE() {
    return {
      CLEAN:'clean',
      THRUSTING:'thrusting',
    };
  };

  constructor(x = 0, y = 0, controls, engine) {
    super();
    this.enabled = false;
    this.controls = null;
    this.position = new Vector(x,y);
    this.velocity = new Vector(0,0);
    this.velocity.setLength(0);
    this.velocity.setAngle(0);
    this.angle = 0;
    this.pivot = new PIXI.Point(25,25);
    this.anchor.set(0.5, 0.5);
    this.engine = engine;
    this.hull = new TriangleHull();
    this.hullIsDirty = true;
    this.addChild(this.hull);
    this.setControls(controls);
  }

  setControls(controls) {
    this.controls = controls;
    this.engine.getThrustEmitter(this.controls.getMovementObservable())
      .subscribe((thrustVector) => {
        this.velocity.addTo(thrustVector);
        this.angle = this.engine.getAngle();
      });
  }

  setWeapon(weapon) {
    this.weapon = weapon;
    return weapon.getFireEmitter(this.controls.getFireUpObservable())
      .flatMap((projectile) => {
        projectile.setPosition(this.x, this.y);
        projectile.setVelocity(15, this.angle);
        return Rx.Observable.of(projectile);
      });
  }

  getWeaponObservable(controls) {
    if (this.weapon !== null) {
      return this.weapon.getFireEmitter(controls);
    } else {
      return null;
    }
  }

  setEngine(engine) {
    this.engine = engine;
  }

  setHull(hull) {
    this.hull = hull;
  }

  update() {
    this.position.addTo(this.velocity);
    this.x = this.position.getX();
    this.y = this.position.getY();
    this.rotation = this.angle;
    if (this.engine.thrusting) {
      this.hullIsDirty = true;
      this.renderHull(Omega.HULL_STATE.THRUSTING);
    } else if (this.hullIsDirty) {
      this.renderHull(Omega.HULL_STATE.CLEAN);
      this.hullIsDirty = false;
    }
  }

  renderHull(state) {
    if (this.hullIsDirty) {
      this.hull.setThrustRenderer(this.engine.getThrustRenderer);
      this.hull.render(state);
    }
  }
}

export default Omega;
