import Vector from './Vector';

class Particle {
  constructor(x, y, speed, direction) {
    this.position = new Vector(x, y);
    this.velocity = new Vector(0, 0);
    this.velocity.setLength(speed);
    this.velocity.setAngle(direction);
  }

  accelerate(accel) {
    this.velocity.addTo(accel);
  }

  update() {
    this.position.addTo(this.velocity);
  }
}