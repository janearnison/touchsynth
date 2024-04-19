function setup() {
  // set canvas to window size
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);

  fill('magenta');

  // for each touch, draw an ellipse at its location with a unique color.
  for (var i = 0; i < Math.min(touches.length, 4); i++) {
    // Create a unique color based on the touch index
    var uniqueColor = color((i * 30) % 255, (i * 40) % 255, (i * 50) % 255);
    fill(uniqueColor);
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