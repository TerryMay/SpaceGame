import * as PIXI from "pixi.js";
import Vector from "./Vector";

class BasicCannon {
  constructor() {
    this.position = new Vector(0,0);
    this.velocity = new Vector(0,0);
    this.velocity.setLength(0);
    this.velocity.setAngle(0);
    this.angle = 0;
    
  }

  getFireEmitter(controls) {
    return controls.getFireObservable()
      .flatMap((input) => {
        if (input === 9) {
          return Rx.Observable.of(this.getBallisticsRenderer());
        } else {
          return Rx.Observable.of(null);
        }
      });
    // this.position.setX(origin.getX() + Math.cos(origin.getAngle() * 40));
    // this.position.setY(origin.getY() + Math.sin(origin.getAngle() * 40));
    // this.position.setAngle(origin.getAngle());
    // this.position.setLength(15);
  }

  update(velocity) {
    console.log("update");
    this.position.addTo(velocity);

  }

  getBallisticsRenderer() {
    const projectile = new PIXI.Graphics();
    projectile.beginFill(0xFFFFFF);
    projectile.drawCircle(0,0,6);
    projectile.endFill();
    const container = new PIXI.Sprite();
    container.anchor.set(.5,.5);
    container.addChild(projectile);
    return container;
  }
}

export default BasicCannon;
