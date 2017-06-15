import * as PIXI from "pixi.js";
import Omega from "./Omega";

class BasicTriangle extends PIXI.Graphics {
  constructor() {
    super();
    this.thrustOrigin = new PIXI.Point(0, 13);
    this.weaponOrigin = new PIXI.Point(26,13);
    this.thrustRenderer = this.getBasicThrust;
  }

  setThrustRenderer(thrustGraphic) {
    this.thrustRenderer = thrustGraphic;
  }

  getWeaponOrigin() {
    return this.weaponOrigin;
  }
  
  render(state) {
    this.clear();
    switch (state) {
      case Omega.HULL_STATE.THRUSTING:
        this.addChild(this.thrustRenderer(this.thrustOrigin));
      case Omega.HULL_STATE.CLEAN:
        this.lineStyle(2, 0xADD8E6, 1);
        this.moveTo(0, 0);
        this.lineTo(26,13);
        this.lineTo(0,26);
        this.lineTo(0,0)
        break;
      }
  }

  getBasicThrust() {
    this.lineStyle(8, 0xFFFFFF, 1);
    this.moveTo(this.thrustOrigin.x, this.thrustOrigin.y);
    this.lineTo(-(Math.random()*15), 15);
    return this;
  }
}

export default BasicTriangle;
