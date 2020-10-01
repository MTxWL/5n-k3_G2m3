const c = document.querySelector(".canvas");
const ctx = c.getContext("2d");

const scale = 40;
const rows = c.height / scale;
const columns = c.width / scale;

console.log(c.width)
console.log(c.width -20)
console.log(c.height -20)

var snake;

function init() {

  snake = new Snake();
  apple = new Apple();
  apple.appleLocation();

  window.setInterval(() => {
    ctx.clearRect(0, 0, c.width, c.height);
    apple.draw();
    snake.reset();
    snake.draw();

    if (snake.eat(apple)) {
      apple.appleLocation();
      console.log('new apple location')
    }

    snake.eatTail();
    document.querySelector('.points').innerText = snake.points;
  }, 250);
};

init()

window.addEventListener('keydown', ((evt) => {
  const direction = evt.key.replace('Arrow', '');
  snake.listenDirection(direction);
}));

function Snake() {
  this.x = 0;
  this.y = 0;
  this.xAccelerate= scale * 1;
  this.yAccelerate = 0;
  this.points = 0;
  this.tail = [];

  this.listenDirection = function(direction) {
    switch(direction) {
      case 'Up':
        this.xAccelerate = 0;
        this.yAccelerate = -scale * 1;
        break;
      case 'Down':
        this.xAccelerate = 0;
        this.yAccelerate = scale * 1;
        break;
      case 'Left':
        this.xAccelerate = -scale * 1;
        this.yAccelerate = 0;
        break;
      case 'Right':
        this.xAccelerate = scale * 1;
        this.yAccelerate = 0;
        break;
    }
  }

    this.draw = function() {
    ctx.fillStyle = "#FFFFFF";

    for (let i=0; i<this.tail.length; i++) {
      ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
    }
    ctx.fillRect(this.x, this.y, scale, scale);
    console.log('snake is moving')
  }

  this.reset = function() {
    for (let i=0; i<this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i+1];
    }

    this.tail[this.points - 1] =
      { x: this.x, y: this.y };

    this.x += this.xAccelerate;
    this.y += this.yAccelerate;

    if (this.x > c.width -50) {
      // this.x = 0;
      this.xAccelerate = -(this.xAccelerate);
      console.log('bounce the screen right')
    }
    if (this.y > c.height -50) {
      // this.y = 0;
      this.yAccelerate = -this.yAccelerate;
      console.log('bounce the screen down')
    }
    if (this.x -10 < 0) {
      this.xAccelerate = -(this.xAccelerate);

      console.log('bounce the screen left')
    }
    if (this.y - 10 < 0) {
      this.yAccelerate = -this.yAccelerate;
      console.log('bounce the screen up')
    }
  }

  this.eat = function(apple) {
    if (this.x === apple.x && this.y === apple.y) {
        this.points++;
         console.log('snake just eat apple, points added')
      return true;
      }
    return false;
  }

  this.eatTail = function() {
    for (var i=0; i<this.tail.length; i++) {
      if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
        this.points = 0;
        this.tail = [];
         console.log('snake ate its own tail, points are substracted')
      }
    }
  }
}

function Apple() {
  this.x;
  this.y;

  this.appleLocation = function() {
    this.x = (Math.floor(Math.random() * columns - 1) + 1) * scale;
    this.y = (Math.floor(Math.random() * rows - 1) + 1) * scale;
  }

  this.draw = function() {
    ctx.fillStyle = "#53fd02";
    ctx.fillRect(this.x, this.y, scale, scale);
    }
}