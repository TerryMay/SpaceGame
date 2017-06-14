import * as PIXI from "pixi.js";

class Asteroid extends PIXI.Sprite {
  //sizes: 1 - 10
  constructor(size = 5, x = 0, y = 0, speed = 0, direction = 0) {
    super();
    this.size = size;
  }

  getRenderer() {
    const numOfPoints = this.size * 3;

    let count = 1;
    const center = new PIXI.Point(300,300);
    const g = new PIXI.Graphics();
    const theta = ((Math.PI*2) / numOfPoints);
    
    while(count <= numOfPoints) {
      console.log(count);
      const p1 = this.jitter(this.getPointByDegree(center, theta*count, this.size*10));
      g.beginFill(0xFF0000);
      g.drawCircle(p1.x, p1.y, 1);
      g.endFill();
      count ++;
    }
    return g;
  }

  getPointByDegree(center, angle, radius) {
    //to Radians
    //angle = angle * Math.PI / 180;
    const x = center.x + radius * Math.cos(angle);
    const y = center.y + radius * Math.sin(angle);
    return new PIXI.Point(x,y);
  }

  jitter(point) {
    point.x = point.x + (Math.random() < 0.5 ? -1 : 1) * 10;
    point.y = point.y + (Math.random() < 0.5 ? -1 : 1) * 10;
    return point;
  }
}

export default Asteroid;
