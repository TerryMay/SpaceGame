import * as PIXI from "pixi.js";
import Vector from "./lib/Vector";

class MyCicle extends PIXI.Container {
  constructor() {
    super();
    this.vector = new Vector(0,0);
    this.direction = new Vector(0,0);
    this.graphics = new PIXI.Graphics();
    this.addChild(this.graphics);
    this.update();
  }

  update() {
    this.x = this.vector.x;
    this.y = this.vector.y;
    this.draw();
  }

  draw() {
    this.graphics.x = 0;
    this.graphics.y = 0;
    this.graphics.beginFill(0xFFFFFF, 1);
    this.path = [
      new PIXI.Point(50,0),
      new PIXI.Point(50, 100),
      new PIXI.Point(0, 50),
    ]
    this.graphics.drawPolygon(this.path);
  }

  addVector(v2) {
    this.vector = this.vector.add(v2);
    this.update();
  }

  addDirection(v2) {
    this.direction = this.direction.add(v2);
    this.update();
  }

  getVector() {
    return this.vector;
  }

  getDirection() {
    return this.direction;
  }
}

export default MyCicle;