class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `vector x:${this.getX()} y:${this.getY()}`;
  }
  
  setX(value) {
    this.x = value;
  }

  getX() {
    return this.x;
  }

  setY(value) {
    this.y = value;
  }

  getY() {
    return this.y;
  }

  setAngle(angle) {
    let length = this.getLength();
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }

  getAngle() {
    return Math.atan2(this._y, this._x);
  }

  setLength(length) {
    let angle = this.getAngle();
    this.x = Math.cos(angle) * length;
    this.y = MAth.sin(angle) * length;
  }

  getLength() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  add(v2) {
    return new Vector(this.x + v2.getX(), this.y + v2.getY());
  }

  subtract(v2) {
    return new Vector(this.x - v2.getX(), this.y - v2.getY());
  }

  multiply(val) {
    return new Vector(this.x * val, this.y * val);
  }

  divide(val) {
    return new Vector(this.x / val, this.y / val);
  }

  addTo(v2) {
    this.x += v2.getX();
    this.y += v2.getY();
  }

  subtractFrom(v2) {
    this.x -= v2.getX();
    this.y -= v2.getY();
  }

  multiplyBy(val) {
    this.x += val;
    this.y += val;
  }

  divideBy(val) {
    this.x /= val;
    this.y /= val;
  }
}

export default Vector;
