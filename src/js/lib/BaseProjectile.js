import Vector from "./Vector";
import * as PIXI from "pixi.js";

class BaseProjectile extends PIXI.Sprite {
  constructor(x = 0, y = 0, speed = 0, direction = 0) {
    super();
    this.id = 0;
    this.position = new Vector(x,y);
    this.velocity = new Vector(0,0);
    this.velocity.setLength(speed);
    this.velocity.setAngle(direction);
    this.hasDrawn = false;
    this.render();
  }

  setId(id) {
    this.id = id;
  }

  getId() {
    return this.id;
  }

  setPosition(x = 0, y = 0) {
    this.position.setX(x);
    this.position.setY(y);
  }

  setVelocity(speed =0, direction = 0) {
    this.velocity.setLength(speed);
    this.velocity.setAngle(direction);
  }

  accelerate(accel) {
    this.velocity.addTo(accel);
  }

  update() {
    this.position.addTo(this.velocity);
    this.x = this.position.getX();
    this.y = this.position.getY();
  }

  render() {
    //override me
    if (!this.hasDrawn) {
      const projectile = new PIXI.Graphics();
      projectile.beginFill(0xFFFFFF);
      projectile.drawCircle(0,0,2);
      projectile.endFill();
      this.addChild(projectile);
    }
    return this.renderCache;
  }
}

export default BaseProjectile;
