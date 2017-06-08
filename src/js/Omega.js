import * as PIXI from "pixi.js";
import Vector from "./lib/Vector";
import Controls from "./lib/Controls";

class Omega extends PIXI.Sprite {
  static get HULL_STATE() {
    return {
      CLEAN:'clean',
      THRUSTING:'thrusting',
    };
  };

  constructor(x = 0, y = 0, engine, friction = new Vector(0.15, 0)) {
    super();
    this.enabled = false;
    this.position = new Vector(x,y);
    this.velocity = new Vector(0,0);
    this.velocity.setLength(0);
    this.velocity.setAngle(0);
    this.angle = 0;

    this.friction = friction;
    this.engine = engine;
    this.pivot = new PIXI.Point(25,25);
    this.anchor.set(0.5, 0.5);
    this.hull = new PIXI.Graphics();
    this.hullIsDirty = true;
    this.addChild(this.hull);
  }

  setControls(controlsObservable) {
    controlsObservable
      .flatMap(input => Rx.Observable.of(this.engine.getThrustVector(input)))
      .subscribe((thrustVector) => {
        this.velocity.addTo(thrustVector);
        this.angle = this.engine.getAngle();
      });
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
      this.hull.clear();
      switch (state) {
        case Omega.HULL_STATE.THRUSTING:
          this.hull.lineStyle(8, 0xFFFFFF, 1);
          this.hull.moveTo(0, 25);
          this.hull.lineTo(-(Math.random()*25), 25);
        case Omega.HULL_STATE.CLEAN:
          this.hull.lineStyle(2, 0xFFFFFF, 1);
          this.hull.moveTo(0, 0);
          this.hull.lineTo(50,25);
          this.hull.lineTo(0,50);
          this.hull.lineTo(0,0)
          break;
      }
    }
  }
}

export default Omega;
