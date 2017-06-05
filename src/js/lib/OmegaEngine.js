import Vector from "./Vector";
import Controls from "./Controls";

class OmegaEngine {
  constructor() {
    this.thrust = new Vector(0,0);
    this.angle = 0;
    this.turningLeft = false;
    this.turningRight = false;
    this.thrusting = false;
  }

  getAngle() {
    return this.angle;
  }

  getThrustVector(input) {
    switch(input) {
      case Controls.KEY.DOWN_DOWN:
      case Controls.KEY.UP_UP:
        this.thrusting = false;
        break;
      case Controls.KEY.UP_DOWN:
        this.thrusting = true;
        break;
      case Controls.KEY.LEFT_UP:
        this.turningLeft = false;
        break;
      case Controls.KEY.LEFT_DOWN:
        this.turningLeft = true;
        break;
      case Controls.KEY.RIGHT_UP:
        this.turningRight = false;
        break;
      case Controls.KEY.RIGHT_DOWN:
        this.turningRight = true;
        break;
      default:
        break;
    }

    if (this.turningRight) {
      this.angle += .05;
    }
    if (this.turningLeft) {
      this.angle -= .05;
    }
    if (this.thrusting) {
      this.thrust.setLength(.1);
    } else {
      this.thrust.setLength(0);
    }
    this.thrust.setAngle(this.angle);
    return this.thrust;
  }
}

export default OmegaEngine;
