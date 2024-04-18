// ICM-2016

// Take a look at the HTML file where some things have been
// added for mobile viewing

var colors;

let osc, env;

let notes = [50, 52, 54, 55, 57, 59, 61, 62];


function setup() {
  // Make the canvas the size of the mobile device screen
  createCanvas(windowWidth, windowHeight);
  background(200);

  // An array of five colors, one for each finger
  colors = [color(255,0,0), color(0,255,0), color(0,0,255), color(255, 255,0), color(0,255,255)];


  // set up simple oscillator 
  env = new p5.Envelope(0.01, 0.1, 1, 0.5);
  
  osc = new p5.Oscillator('triangle');
  osc.start();
  osc.amp(env);

}

function draw() {
  // The touches array holds an object for each and every touch
  // The array length is dynamic and tied to the number of fingers 
  // currently touching
  for (var i = 0; i < touches.length; i++) {
    noStroke();
    // One color per finger
    fill(colors[i]);
    // Draw a circle at each finger
    ellipse(touches[i].x, touches[i].y, 24, 24);
  }
}

function touchStarted() {
  env.play();
}


// this prevents dragging screen around
function touchMoved() {
  return false;
}
