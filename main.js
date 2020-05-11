var canvas = document.getElementById("canv");
var c = canvas.getContext("2d");

class Paddle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 30;
    this.h = 150;

    this.ySpeed = 0;
  }
  show() {
    c.fillStyle = 'white';
    c.fillRect(this.x, this.y, this.w, this.h);
  }
  update() {
    //movement
    this.y += this.ySpeed;
  }
}

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 40;
    this.h = 40;

    this.xSpeed = -5;
    this.ySpeed = 0;
  }
  show() {
    c.fillStyle = 'white';
    c.fillRect(this.x, this.y, this.w, this.h);
  }
  update() {

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    //physics and stuff
    if (this.x < p2.x + p2.w && this.x + this.w > p2.x && this.y < p2.y + p2.h && this.y + this.h > p2.y) {
      this.xSpeed = -10;
    }

    if (this.y+20 > p1.y+75) {
      if (this.x < p1.x + p1.w && this.x + this.w > p1.x && this.y < p1.y + p1.h && this.y + this.h > p1.y) {
        this.xSpeed = 10;
        this.ySpeed = 2;
      }
    } else if (this.y+20 < p1.y + 75) {
      if (this.x < p1.x + p1.w && this.x + this.w > p1.x && this.y < p1.y + p1.h && this.y + this.h > p1.y) {
        this.xSpeed = 10;
        this.ySpeed = -2;
      }
    } else {
      if (this.x < p1.x + p1.w && this.x + this.w > p1.x && this.y < p1.y + p1.h && this.y + this.h > p1.y) {
        this.xSpeed = 10;
      }
    }

    if (this.y+20 > p2.y+75) {
      if (this.x < p2.x + p2.w && this.x + this.w > p2.x && this.y < p2.y + p2.h && this.y + this.h > p2.y) {
        this.xSpeed = -10;
        this.ySpeed = 2;
      }
    } else if (this.y+20 < p2.y+75) {
      if (this.x < p2.x + p2.w && this.x + this.w > p2.x && this.y < p2.y + p2.h && this.y + this.h > p2.y) {
        this.xSpeed = -10;
        this.ySpeed = -2;
      } else {
        if (this.x < p2.x + p2.w && this.x + this.w > p2.x && this.y < p2.y + p2.h && this.y + this.h > p2.y) {
          this.xSpeed = -10;
        }
      }
    }

    if (this.y + 20 > p2.y+140) {
      if (this.x < p2.x + p2.w && this.x + this.w > p2.x && this.y < p2.y + p2.h && this.y + this.h > p2.y) {
        this.xSpeed = -10;
        this.ySpeed = 4;
      }
    }
    if (this.y + 20 < p2.y+10) {
      if (this.x < p2.x + p2.w && this.x + this.w > p2.x && this.y < p2.y + p2.h && this.y + this.h > p2.y) {
        this.xSpeed = -10;
        this.ySpeed = -4;
      }
    }

    if (this.y + 20 > p1.y+140) {
      if (this.x < p1.x + p1.w && this.x + this.w > p1.x && this.y < p1.y + p1.h && this.y + this.h > p1.y) {
        this.xSpeed = 10;
        this.ySpeed = 4;
      }
    }
    if (this.y + 20 < p1.y+10) {
      if (this.x < p1.x + p1.w && this.x + this.w > p1.x && this.y < p1.y + p1.h && this.y + this.h > p1.y) {
        this.xSpeed = 10;
        this.ySpeed = -4;
      }
    }

    if (this.y <= 0) {
      this.ySpeed = 2;
    }
    if (this.y >= 800-40) {
      this.ySpeed = -2;
    }

    //Score system
    if (this.x <= 0) {
      p2Score++;
      this.x = 400;
      this.y = 400;
      this.xSpeed = 0;
      this.ySpeed = 0;
      p1.y = 350;
      p2.y = 350;
      setTimeout(serve2, 1000);
    }
    if (this.x >= 800) {
      p1Score++;
      this.x = 400;
      this.y = 400;
      this.xSpeed = 0;
      this.ySpeed = 0;
      p1.y = 350;
      p2.y = 350;
      setTimeout(serve1, 1000);
    }

  }
}

var p1;
var p2;

var mouseX, mouseY;

var ball;

var p1Score = 0;
var p2Score = 0;

var needsAlert = true;

document.addEventListener('mousemove', function(e) {
  mouseX = e.x;
  mouseY = e.y;
})

window.onload = function() {
  start();
  setInterval(update, 10);
}

function serve1() {
  ball.xSpeed = -10;
}

function serve2() {
  ball.xSpeed = 10;
}

function start() {
  p1 = new Paddle(10, 350);
  p2 = new Paddle(762, 350);

  ball = new Ball(400, 400);
}

function update() {
  //background
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
  //paddles
  p1.show();
  p2.show();
  p1.update();
  p2.update();
  //ball
  ball.show();
  ball.update();
  //update Score
  document.getElementById("p1Score").innerHTML = p1Score;
  document.getElementById("p2Score").innerHTML = p2Score;
  //check for winner
  if (p1Score >= 10) {
    if (needsAlert) {
      alert("Player 1 Wins!");
      needsAlert = false;
    }
    location.reload();
  }
  if (p2Score >= 10) {
    if (needsAlert) {
      alert("Player 2 Wins!");
      needsAlert = false;
    }
    location.reload();
  }
}

function keyDown(e) {
  if (e.keyCode === 87) {
    p1.ySpeed = -10;
  }
  if (e.keyCode === 83) {
    p1.ySpeed = 10;
  }
  if (e.keyCode === 40) {
    p2.ySpeed = 10;
  }
  if (e.keyCode === 38) {
    p2.ySpeed = -10;
  }
}

function keyUp(e) {
  if (e.keyCode === 87) {
    p1.ySpeed = 0;
  }
  if (e.keyCode === 83) {
    p1.ySpeed = 0;
  }
  if (e.keyCode === 40) {
    p2.ySpeed = 0;
  }
  if (e.keyCode === 38) {
    p2.ySpeed = 0;
  }
}

document.onkeydown = keyDown;
document.onkeyup = keyUp;
