//** 되돌아 오는 비행기 클래스 설정 **
class Lamp {
  constructor(x, y, w, h, options, img) {
    this.w = w;
    this.h = h;
    this.img = img;
    options.isStatic = true;
    this.body = Bodies.rectangle(x, y, this.w, this.h, options);
    Composite.add(engine.world, this.body);
  }

  setVelocity(velocity) {
    Body.setVelocity(this.body, Vector.create(velocity.x, velocity.y));
  }

  setAngularVelocity(angularVelocity) {
    Body.setAngularVelocity(this.body, angularVelocity);
  }

  display() {
    const pos = this.body.position;
    const angle = this.body.angle;

    // noStroke();
    // noFill();
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    image(this.img, 0, 0, this.w, this.h);
    // rect(0, 0, this.w, this.h);
    pop();
  }
}

class Walls {
  constructor(x, y, w, h, options) {
    this.w = w;
    this.h = h;
    // this.img = img;
    options.isStatic = true;
    this.body = Bodies.rectangle(x, y, this.w, this.h, options);
    Composite.add(engine.world, this.body);
  }

  setVelocity(velocity) {
    Body.setVelocity(this.body, Vector.create(velocity.x, velocity.y));
  }

  setAngularVelocity(angularVelocity) {
    Body.setAngularVelocity(this.body, angularVelocity);
  }

  display() {
    const pos = this.body.position;
    const angle = this.body.angle;

    noStroke();
    noFill();
    push();
    translate(pos.x, pos.y);
    rotate(angle);

    // image(this.img, 0, 0, this.w, this.h);
    rect(0, 0, this.w, this.h);
    pop();
  }
}

class returnP {
  //쓰레기로 돌아오는 비행기 클래스
  constructor(x, y, w, h, options, img) {
    this.w = w;
    this.h = h;
    this.img = img;
    this.body = Bodies.rectangle(x, y, this.w, this.h, options);
    Composite.add(engine.world, this.body);
  }

  setVelocity(velocity) {
    Body.setVelocity(this.body, Vector.create(velocity.x, velocity.y));
  }

  setAngularVelocity(angularVelocity) {
    Body.setAngularVelocity(this.body, angularVelocity);
  }

  display() {
    const pos = this.body.position;
    const angle = this.body.angle;
    push();
    // stroke(1);
    // fill('white');
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.img, 0, 0, this.w, this.h);
    pop();
  }

  isDead() {
    return this.body.position.y > height + 100;
  }

  remove() {
    Composite.remove(matterEngine.world, this.body);
  }
  isCollided() {
    c = SAT.collides(p.body, walls[1].body);

    p.display();

    walls.forEach((w) => {
      w.display();
    });
    // console.log(c.collided);
  }
}

class Heart {
  //하트로 돌아오는 비행기 클래스
  constructor(x, y, w, h, options, img) {
    this.w = w;
    this.h = h;
    this.img = img;
    this.body = Bodies.rectangle(x, y, this.w, this.h, options);
    Composite.add(engine.world, this.body);
  }

  setVelocity(velocity) {
    Body.setVelocity(this.body, Vector.create(velocity.x, velocity.y));
  }

  setAngularVelocity(angularVelocity) {
    Body.setAngularVelocity(this.body, angularVelocity);
  }

  display() {
    const pos = this.body.position;
    const angle = this.body.angle;
    push();
    // stroke(1);
    // fill('white');
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.img, 0, 0, this.w, this.h);
    pop();
  }

  isDead() {
    return this.body.position.y > height + 100;
  }

  remove() {
    Composite.remove(matterEngine.world, this.body);
  }
  isCollided() {
    c = SAT.collides(p.body, walls[1].body);

    p.display();

    walls.forEach((w) => {
      w.display();
    });
    // console.log(c.collided);
  }
}

class Cat {
  //고양이로 돌아오는 비행기 클래스
  constructor(x, y, w, h, options, img) {
    this.w = w;
    this.h = h;
    this.img = img;
    this.body = Bodies.rectangle(x, y, this.w, this.h, options);
    Composite.add(engine.world, this.body);
  }

  setVelocity(velocity) {
    Body.setVelocity(this.body, Vector.create(velocity.x, velocity.y));
  }

  setAngularVelocity(angularVelocity) {
    Body.setAngularVelocity(this.body, angularVelocity);
  }

  display() {
    const pos = this.body.position;
    const angle = this.body.angle;
    push();
    // stroke(1);
    // fill('white');
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.img, 0, 0, this.w, this.h);
    pop();
  }

  isDead() {
    return this.body.position.y > height + 100;
  }

  remove() {
    Composite.remove(matterEngine.world, this.body);
  }
  isCollided() {
    c = SAT.collides(p.body, walls[1].body);

    p.display();

    walls.forEach((w) => {
      w.display();
    });
    // console.log(c.collided);
  }
}
