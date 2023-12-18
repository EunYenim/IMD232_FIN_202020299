// 참고** Example 6-8: MouseConstraint Demonstration(Modified by OO-SUNG SON (spctrm404)
// Original Code from: https://editor.p5js.org/natureofcode/sketches/mTRKgn44p
// Daniel Shiffman
// The Nature of Code

//** 날리는 비행기 클래스 **

class MainPlane {
  constructor(x, y, mass, rad, img) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.mass = mass;
    this.rad = rad;
    this.color = color;
    this.isHover = false;
    this.isDragging = true;
    this.draggingOffset = createVector(0, 0);

    this.img = img;
  }

  applyForce(force) {
    const acc = p5.Vector.div(force, this.mass);
    this.acc.add(acc);
  }

  update(limit) {
    this.vel.add(this.acc);
    this.vel.limit(limit);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  display() {
    rectMode(CENTER);
    image(
      this.img,
      this.pos.x - this.rad / 2,
      this.pos.y - this.rad / 2,
      this.rad,
      this.rad
    );
  }

  // 방향 표시
  displayVectors() {
    stroke('red');
    line(
      this.pos.x,
      this.pos.y,
      this.pos.x + this.vel.x * 10,
      this.pos.y + this.vel.y * 10
    );
  }

  isDead() {
    return (
      this.pos.x < -this.rad ||
      this.pos.x > width + this.rad ||
      this.pos.y > height + this.rad
    );
  }

  // 마우스 드래그
  mouseMoved(mX, mY) {
    this.isHover =
      (this.pos.x - mX) ** 2 + (this.pos.y - mY) ** 2 <= this.rad ** 2;
  }

  mousePressed(mX, mY) {
    if (!this.isHover) return;
    this.isDragging = true;
    this.draggingOffset.x = this.pos.x - mX;
    this.draggingOffset.y = this.pos.y - mY;
  }

  mouseDragged(mX, mY) {
    if (this.isDragging) {
      this.pos.x = mX + this.draggingOffset.x;
      this.pos.y = mY + this.draggingOffset.y;
    }
  }

  mouseReleased() {
    this.isDragging = false;
  }
}
