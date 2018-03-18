var canvas;
var h1;
var p1;

function setup() {
  canvas = createCanvas(200, 200);
  createElement('h1', 'Who is this ?');
  createP("Hi Shravan");
  
}

function draw() {
  background(0);
  fill(255, 0, 0);
  rect(100, 100, 50, 50);
}