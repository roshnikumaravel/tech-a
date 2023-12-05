let font;
let points;
let slider;

function preload() {
  font = loadFont('FengardoNeue_Black.otf');
}

function setup() {
  createCanvas(600, 600);
  slider = createSlider(-50,50,0);
  slider.position(width/2-75,height+5);
  textFont(font);
  textSize(100);
  frameRate(10);
}

function draw() {
  background(240);
  fill(0);
  stroke(0);
  text("hello!", width/2-120, height/2+30);
 
  let val = slider.value();
  let SF;

  /* push();
  textSize(12);
  text(val,10,10);
  pop(); */

  if (val>0){
  SF = map(val,0,50,0.2,0.5);
  points = font.textToPoints("hello!", width/2-120, height/2+30, 100, {sampleFactor:SF});
  let lineX = map(val,0,50,0,35);
  let lineY = map(val,0,50,0,5);
  for (let i=0; i<points.length; i++) {
    let x = random(lineX);
    let y = random(lineY);
    push();
    strokeWeight(random(1,2));
    line(points[i].x-x, points[i].y-y, points[i].x+x, points[i].y+y);
    pop();
  }
  }
  if (val<0){
  SF = map(val,-50,0,0.15,0.2);
  points = font.textToPoints("hello!", width/2-120, height/2+30, 100, {sampleFactor:SF});
  let dotSize= map(val,-50,0,9.5,0);
  for (let i=0; i<points.length; i++) {
    //ellipse(points[i].x, points[i].y, dotSize,dotSize);
    let x = constrain(random(dotSize-3,dotSize),0,15);
    ellipse(points[i].x, points[i].y, x,x);
  }}
}