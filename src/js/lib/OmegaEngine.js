import Vector from "./Vector";
import Controls from "./Controls";

class OmegaEngine {
  constructor() {
    this.thrust = new Vector(0,0);
    this.angle = 0;
    this.turningLeft = false;
    this.turningRight = false;
    this.thrusting = false;
    this.thrustObserver = null;
    this.impluse = 15;
    this.impluseEngine = null;
  }

  getAngle() {
    return this.angle;
  }

  getThrustEmitter(inputObservable) {
    return Rx.Observable.create((observer) => {
      observer.onNext(new Vector(0,0));
      this.thrustObserver = observer;
      this.handleInput(inputObservable);
    })
  }

  emitEngineThrust() {
    if (this.thrusting || this.turningLeft || this.turningRight) {
      if (this.impluseEngine === null) {
        this.impluseEngine = setInterval(() => {
          console.log("*");
          this.thrustObserver.onNext(this.thrust);
          if (this.turningRight) {
            this.angle += .05;
          }
          if (this.turningLeft) {
            this.angle -= .05;
          }
        }, this.impluse);
      }
    } else {
      this.thrustObserver.onNext(this.thrust);
      clearInterval(this.impluseEngine);
      this.impluseEngine = null;
    }
  }

  handleInput(inputObservable) {
    inputObservable
      .subscribe((input) => {
        switch(input) {
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
        if (this.thrusting) {
          this.thrust.setLength(.051);
        } else {
          this.thrust.setLength(0);
        }
        this.thrust.setAngle(this.angle);
        this.emitEngineThrust();
    });
  }
}

export default OmegaEngine;
