function setup() {
  // set canvas to window size
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);

  fill('magenta');

  // for each touch, draw an ellipse at its location.
  // touches are stored in array.
  for (var i = 0; i < touches.length; i++) {
    ellipse(touches[i].x, touches[i].y, 50, 50);
  }
}

// do this prevent default touch interaction
function mousePressed() {
  return false;
}

document.addEventListener('gesturestart', function(e) {
  e.preventDefault();
});