import * as PIXI from "pixi.js";

class MySquare extends PIXI.Container {
  constructor() {
    super();
    const graphics = new PIXI.Graphics();
    graphics.x = window.innerWidth/2;
    graphics.y = window.innerHeight/2;
    graphics.beginFill(0xFFFFFF, 1);
    graphics.drawRect(100,100,100,100);
    this.addChild(graphics);
  }
}

export default MySquare;