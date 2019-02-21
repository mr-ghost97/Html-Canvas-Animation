//Author: Bhakta Raj

var canvas = document.getElementById("canvas");
var c = canvas.getContext('2d');

var W = window.innerWidth;
var H = window.innerHeight;
canvas.width = W;
canvas.height = H;

var mouse = {
  x: undefined,
  y: undefined
}

var maxRadius = 50;
var minRadius = 10;
var noOfCircle = 800;
var colorArray = [
  '#00ADB5',
  '#FFF4E0',
  '#F8B500',
  '#FC3C3C'
];
var circleArray = [];
window.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
})
window.addEventListener('resize', function() {
  W = window.innerWidth;
  H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;
  init();
})
//creating circle object
function Circle(x, dx, y, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }
  this.update = function() {
    if (this.x + this.radius > W || this.x - this.radius < 0)
      this.dx = -this.dx;
    if (this.y + this.radius > H || this.y - this.radius < 0)
      this.dy = -this.dy;
    this.x += this.dx;
    this.y += this.dy;
    //interacvite
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      if (this.radius < maxRadius)
        this.radius += 5;
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  }
}



function init() {
  circleArray = [];
  //creating array to store circles
  for (i = 0; i < noOfCircle; i++) {
    //creating random circle coordinates, radius and velocity.
    var radius = (Math.random() * 10) + 1;
    var x = Math.random() * (W - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 3;
    var y = Math.random() * (H - radius * 2) + radius;
    var dy = (Math.random() - 0.5) * 3;

    //push circles in the array
    circleArray.push(new Circle(x, dx, y, dy, radius));
  }
}

function animate() {
  requestAnimationFrame(animate);
  //clear Canvas
  c.clearRect(0, 0, W, H);

  //draw all circles from the circleArray

  for (i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}
init();
animate();
