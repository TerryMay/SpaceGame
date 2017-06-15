import * as PIXI from "pixi.js";
import Vector from "./Vector";

class Asteroid extends PIXI.Sprite {
  //sizes: 1 - 10
  constructor(size = 10, x = 0, y = 0, speed = 0, direction = 0) {
    super();
    // cap the size at 10
    this.size = (size > 10) ? 10 : size;
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
    this.renderCache.x = this.position.getX();
    this.renderCache.y = this.position.getY();
  }

  render() {
    if (!this.hasDrawn) {
      const numOfPoints = this.size * 3;

      let count = 1;
      const center = new PIXI.Point(0,0);
      this.pivot = center;
      const g = new PIXI.Graphics();
      const theta = ((Math.PI*2) / numOfPoints);
      const points = [];
      while(count <= numOfPoints) {
        let p1 = this.getPointByDegree(center, theta*count, this.size*10);
        p1 = this.jitter(p1, this.size);
        points.push(p1);
        count ++;
      }

      // connect the last point of the polygon to the first
      points.push(new PIXI.Point(points[0].x, points[0].y));
      //draw
      g.lineStyle(2, 0xADD8E6);
      g.drawPolygon(points);
      this.addChild(g);
      this.hasDrawn = true;
    }
  }

  // should move these to a utility class
  getPointByDegree(center, angle, radius) {
    //to Radians, not needed here but nice to remember
    //angle = angle * Math.PI / 180;
    const x = center.x + radius * Math.cos(angle);
    const y = center.y + radius * Math.sin(angle);
    return new PIXI.Point(x,y);
  }

  jitter(point, factor) {
    point.x = point.x + (Math.random() < 0.5 ? -1 : 1) * factor;
    point.y = point.y + (Math.random() < 0.5 ? -1 : 1) * factor;
    return point;
  }
}

export default Asteroid;
