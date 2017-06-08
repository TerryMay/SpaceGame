import * as PIXI from "pixi.js";
import Vector from "./lib/Vector";
import Controls from "./lib/Controls";

class Ship extends PIXI.DisplayObject {
  constructor(x = 0, y = 0, speed = 0, direction = 0) {
    super();
    this.position = new Vector(x,y);
    this.position.setAngle(0);
    this.velocity = new Vector(0,0);
    this.velocity.setLength(speed);
    this.velocity.setAngle(direction);

    this.graphics = new PIXI.Graphics();
    this.pivot = new PIXI.Point(15,15);
    // this.addChild(this.graphics);
    this.position.addTo(this.velocity);
    this.x = this.position.getX();
    this.y = this.position.getY();
    this.rotation += this.position.getAngle();
  }

  renderCanvas(renderer) {
    super.renderCanvas(renderer);
  }
  
  addControls(controlsObservable) {
    controlsObservable
      .selectMany((direction) => {
        const thrust = new Vector(this.position.getX(), this.position.getY());
        thrust.setLength(0);
        thrust.setAngle(0);
        switch(direction) {
          case Controls.KEY.UP_DOWN:
            thrust.setLength(0.1);
            break;
          case Controls.KEY.UP_UP:
            //thrust.setLength(0);
            break;
          case Controls.KEY.DOWN_UP:
            
            break;
          case Controls.KEY.DOWN_DOWN:
            thrust.setLength(0);
            break;
          case Controls.KEY.LEFT_UP:
            break;
          case Controls.KEY.LEFT_DOWN:
            thrust.setAngle(-0.05);
            break;
          case Controls.KEY.RIGHT_UP:
            break;
          case Controls.KEY.RIGHT_DOWN:
            thrust.setAngle(0.05);
            break;
          case Controls.KEY.FIRE_DOWN:
            break;
          case Controls.KEY.FIRE_UP:
            break;
        };
        return Rx.Observable.of(thrust);
    }).subscribe(vector => this.addDirection(vector));
  }

  update() {
    this.position.addTo(this.velocity);
    this.x = this.position.getX();
    this.y = this.position.getY();
    this.rotation += this.velocity.getAngle();
    this.draw();
  }

  draw() {
    this.graphics.beginFill(0xFFFFFF, 1);
    this.path = [
      new PIXI.Point(0, -10),
      new PIXI.Point(-10, 10),
      new PIXI.Point(10, 10),
    ];
    this.graphics.drawRect(0,0, 30, 30);
    //this.graphics.drawPolygon(this.path);
  }

  addDirection(v2) {
    this.velocity.addTo(v2);
    this.velocity.setAngle(v2.getAngle());
    console.log (this.velocity);
    //this.update();
  }

  getPosition() {
    return this.position;
  }

  getDirection() {
    return this.direction;
  }
}

export default Ship;