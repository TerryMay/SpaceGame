import * as PIXI from "pixi.js";
import Vector from "./lib/Vector";

class Ship extends PIXI.Container {
  constructor(x, y, speed = 1, direction = 0) {
    super();
    this.position = new Vector(x,y);
    this.velocity = new Vector(0,0);
    this.velocity.setLength(speed);
    this.velocity.setAngle(direction);

    this.graphics = new PIXI.Graphics();
    
    this.addChild(this.graphics);
    this.update();
  }

  update() {
    this.x = this.position.x;
    this.y = this.position.y;
    this.rotation = this.velocity.getAngle();
    this.draw();
  }

  draw() {
    this.graphics.x = 0;
    this.graphics.y = 0;
    this.graphics.beginFill(0xFFFFFF, 1);
    this.path = [
      new PIXI.Point(10, 0),
      new PIXI.Point(0, 20),
      new PIXI.Point(20, 20),
    ]
    this.graphics.drawPolygon(this.path);
  }

  addDirection(v2) {
    this.velocity = this.velocity.add(v2);
    this.update();
  }

  getPosition() {
    return this.position;
  }

  getDirection() {
    return this.direction;
  }
}

export default Ship;