let audioContext;
let device;
let y;
let x;
let lastTapTime = 0;
const doubleTapThreshold = 300; // Time threshold for double-tap in milliseconds


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

function startAudioContext() {
  if (audioContext.state === 'suspended') {
      audioContext.resume();
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

function handlePointerDown(event) {
  const currentTime = new Date().getTime();
  const isDoubleTap = currentTime - lastTapTime < doubleTapThreshold;

  if (isDoubleTap) {
      toggleAudioContext();
  }

  lastTapTime = currentTime;
}

function toggleAudioContext() {
  if (audioContext.state === 'running') {
      audioContext.suspend();
  } else if (audioContext.state === 'suspended') {
      audioContext.resume();
  }
}


function draw() {
  background(180, 17, 240);
  

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
}

// This prevents default touch interaction
function mousePressed() {
  return false;
}

document.addEventListener('gesturestart', function(e) {
  e.preventDefault();
});

var coordX = 0;
var coordY = 0;

// Use pointermove event to handle both mouse and touch events
window.onmousemove = coordHandler;
window.onpointerdown = coordHandler;
window.onpointermove = coordHandler;

function coordHandler(event) {
  // Update coordinates based on event type
  switch (event.type) {
    case 'mousemove':
    case 'pointerdown':
    case 'pointermove':
      coordX = event.clientX;
      coordY = event.clientY;
      break;
  }
}
