import Vector from "./Vector";

class BaseProjectile {
  constructor(x = 0, y = 0, speed = 0, direction = 0) {
    this.position = new Vector(x,y);
    this.velocity = new Vector(0,0);
    this.velocity.setLength(speed);
    this.velocity.setAngle(direction);
    this.renderCache = null;
    this.id = 0;
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
    this.renderCache.x = this.position.getX();
    this.renderCache.y = this.position.getY();
  }

  getRenderer() {
    //override me
    if (this.renderCache === null) {
      const projectile = new PIXI.Graphics();
      projectile.beginFill(0xFFFFFF);
      projectile.drawCircle(0,0,4);
      projectile.endFill();
      const container = new PIXI.Sprite();
      container.anchor.set(.5,.5);
      container.addChild(projectile);
      this.renderCache = container;
    }
    return this.renderCache; 
  }
}

export default BaseProjectile;
