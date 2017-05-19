import * as PIXI from "pixi.js";

class MyCicle extends PIXI.Container {
  constructor() {
    super();
    const graphics = new PIXI.Graphics();
    graphics.x = window.innerWidth/2;
    graphics.y = window.innerHeight/2;
    graphics.beginFill(0xFFFFFF, 1);
    this.path = [
      new PIXI.Point(50,0),
      new PIXI.Point(50, 100),
      new PIXI.Point(0, 50),
    ]
    graphics.drawPolygon(this.path);
    this.addChild(graphics);
  }
}

export default MyCicle;