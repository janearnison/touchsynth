let audioContext;
let device;
let y;
let x;

function setup() {
  // set canvas to window size
  createCanvas(windowWidth, windowHeight);

  audioContext = new (window.AudioContext || window.webkitAudioContext)();

  loadRNBO();

  document.addEventListener("pointermove", updateRNBO);
  window.addEventListener("pointerdown", handlePointerDown); // Listen for pointer down event on the window
  

}

async function loadRNBO() {
  const { createDevice } = RNBO;

  await audioContext.resume();

  const rawPatcher = await fetch('patch.export.json');
  const patcher = await rawPatcher.json();

  device = await createDevice({ context: audioContext, patcher });
  device.node.connect(audioContext.destination);

  x = device.parametersById.get('x');
  y = device.parametersById.get('y');
}


function draw() {

  background(255, 100, 40);

  // for each touch, draw an ellipse at its location with a unique color.
  for (var i = 0; i < Math.min(touches.length, 4); i++) {
    // Create a unique color based on the touch index
    var uniqueColor = color((i * 10) % 255, (i * 4) % 255, (i * 100) % 255);
    fill(uniqueColor);
    ellipse(touches[i].x, touches[i].y, 50, 50);
}
}

function updateRNBO(e) {
  let yValue = map(e.clientY, height, 0, 0, 1); // Normalize mouseY
  let xValue = map(e.clientX, 0, width, 0, 1); // Normalize mouseX

  if (y) {
    y.normalizedValue = yValue;
  }

  if (x) {
    x.normalizedValue = xValue;
  }
}

// do this prevent default touch interaction
function mousePressed() {
  return false;
}

document.addEventListener('gesturestart', function(e) {
  e.preventDefault();
});