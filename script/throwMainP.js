//(1)
//* 가는 비행기 *
let mPlanes = [];
let mPlane;
// let gravity;

//비행기 컨트롤
let T10;
let T20;
let T30;

let timer = 0;
let accTime = 0.4;
let speed = 4;
let ascending = -0.2;
let descending = 0.04;

// 마우스 컨트롤
let isReleased = false;
let isPressed = false;
let mouse, mouseConstraint;

let pDead = false;

//(2)
//* 돌아오는 비행기 *
const {
  Engine,
  Bodies,
  Composite,
  Constraint,
  Vector,
  Mouse,
  MouseConstraint,
  Body,
  SAT,
} = Matter;

let engine;

let rPlanes = [];
let walls = [];

// 단어 판별
let BW;
let GW;
let CW;
let AW;

// 배경 설정
function preload() {
  backgroundImage = loadImage('./img/house.png');
  paperPlane = loadImage('./img/paperPlane.svg');
  paperBall = loadImage('./img/paperBall.svg');
  lamp = loadImage('./img/lamp.svg');
  cat = loadImage('./img/cat.svg');
  heart = loadImage('./img/heart.svg');
}

function setup() {
  setCanvasContainer('canvas', 2, 1.5, true);
  //(1)
  //* 가는 비행기 *
  mVec = createVector();
  pMVec = createVector();

  //(2)
  //* 돌아오는 비행기 *
  rectMode(CENTER);

  engine = Engine.create();

  pixelDensity(1);

  // 바닥
  walls.push(new Walls(width / 2, height - 10, width, height / 7, {}));
  // 왼쪽 벽
  walls.push(
    new Lamp(width / 5, height / 2.5, width / 10, width / 2.5, {}, lamp)
  );

  // 마우스 컨트롤
  mouse = Mouse.create(canvas.elt);
  let options = {
    mouse: mouse,
    constraint: {
      stiffness: 1,
    },
  };
  mouseConstraint = MouseConstraint.create(engine, options);
  Composite.add(engine.world, mouseConstraint);

  background(backgroundImage);
}

function draw() {
  background(backgroundImage);
  //(1)
  //* 가는 비행기 *
  console.log(mPlanes.length);
  for (let i = mPlanes.length - 1; i >= 0; i--) {
    let mP = mPlanes[i];

    // 마우스를 놓으면 작동
    if (isReleased == true) {
      //속도, 가속시간, 중력적용
      timer++;
      if (timer < accTime * 60) {
        let force = createVector(speed, ascending);
        mP.applyForce(force);
      } else {
        let force = createVector(0, descending);
        mP.applyForce(force);
      }

      // 초기 설정 단계
      // 텍스트 양에 따른 비행기 속도 조절
      if (T10 == true) {
        mP.update(7);
      } else if (T20 == true) {
        mP.update(5);
      } else if (T30 == true) {
        mP.update(3);
      } else {
        mP.update(10);
      }

      // 화면 밖으로 나가면 사라짐
      if (mP.isDead()) {
        mPlanes.splice(i, 1);
        // mPlanes = [];
        pDead = true;
        // console.log('pDead', pDead);
      } else {
        pDead = false;
      }
    }
    // console.log('BW', BW);

    //(2)
    //* 돌아오는 비행기 생성 *
    if (pDead == true && BW == true) {
      rPlane = new returnP(
        width,
        height / 2,
        width / 25,
        width / 25,
        10,
        paperBall,
        {
          restitution: 0.6,
          angle: radians(-20),
          frictionAir: 0.1,
        }
      );
      rPlanes.push(rPlane);
      BW = false;
    } else if (pDead == true && GW == true) {
      rPlane = new returnP(
        width,
        height / 2,
        width / 20,
        width / 20,
        10,
        heart,
        {
          restitution: 0.6,
          angle: radians(-20),
          frictionAir: 0.1,
        }
      );
      rPlanes.push(rPlane);
      GW = false;
    } else if (pDead == true && CW == true) {
      rPlane = new returnP(width, height / 2, width / 12, width / 12, 10, cat, {
        restitution: 0.6,
        angle: radians(-20),
        frictionAir: 0.1,
      });
      rPlanes.push(rPlane);
      CW = false;
    } else if (pDead == true && AW == true) {
      for (let i = 0; i < 45; i++) {
        rPlane = new returnP(
          random(width, width + 50),
          random(height / 2.3, height / 1.7),
          width / 25,
          width / 25,
          10,
          paperBall,
          {
            restitution: 0.6,
            angle: radians(-20),
            frictionAir: 0.1,
          }
        );
        rPlanes.push(rPlane);
      }
      AW = false;
    }
    // console.log('고양이', CW);

    // console.log(mP.pos.y);
    push();
    rotate(mP.vel.heading());
    mP.display();
    // mP.displayVectors();
    pop();
  }
  //(2)
  //* 돌아오는 비행기 *
  Engine.update(engine);

  // 조건 : 벽에 충돌 하였는가? *비행기 당 한번만 실행
  rPlanes.forEach((mP) => {
    if (!mP.c) {
      if (SAT.collides(mP.body, walls[1].body) == null) {
        mP.c = false;
        // console.log(mP.c);
      } else if (SAT.collides(mP.body, walls[1].body) != null) {
        mP.c = true;
        // console.log(mP.c);
      }
    }
    if (!mP.c) {
      // 왼쪽으로 향하도록 조절 *높이, 속도
      mP.setVelocity(p5.Vector.mult(createVector(-3, 0.2).normalize(), 16));
    } else if (mP.c) {
      // 충돌 시, 떨어지는 비행기
      mP.setVelocity(p5.Vector.mult(createVector(0, 0.01).normalize(), 2));
    }
    mP.display();
  });

  walls.forEach((w) => {
    w.display();
  });
}

// 엔터를 누르면 비행기 생성
function keyPressed() {
  if (keyCode == ENTER) {
    mPlanes = [];
    //(1)
    //* 가는 비행기 *
    mPlane = new MainPlane(width / 8, height / 3, 5, height / 10, paperPlane);
    timer = 0;
    isReleased = false;
    isPressed = false;
    pDead = false;
    mPlanes.push(mPlane);
    console.log('mPlanes.length', mPlanes.length);
  }
}

//(1)
//* 가는 비행기 *
// 마우스 컨트롤 ** 캔버스의 일정 영역에 있을 경우 구현
function mouseMoved() {
  if (!isMouseInsideCanvas()) return;
  for (let i = 0; i < mPlanes.length; i++) {
    let mP = mPlanes[i];
    mP.mouseMoved(mouseX, mouseY);
  }
}

function mousePressed() {
  if (!isMouseInsideCanvas()) return;
  for (let i = 0; i < mPlanes.length; i++) {
    let mP = mPlanes[i];
    if (mP.pos.x < width && mP.isHover) {
      mp.mouseMoved();
      mP.mousePressed(mouseX, mouseY);
      mP.pos = createVector(width / 2, height - 100);
      isPressed = true;
      isReleased = false;
    }
  }
}
function mouseDragged() {
  if (!isMouseInsideCanvas()) return;
  for (let i = 0; i < mPlanes.length; i++) {
    let mP = mPlanes[i];
    if (mP.pos.x < width && mP.isHover) {
      mP.mouseDragged(mouseX, mouseY);
    }
  }
}

function mouseReleased() {
  if (!isMouseInsideCanvas()) return;
  for (let i = 0; i < mPlanes.length; i++) {
    let mP = mPlanes[i];
    if (mP.pos.x < width && mP.isHover) {
      mP.mouseReleased();
      isReleased = true;
    }
  }
}
