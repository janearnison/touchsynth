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

function handlePointerMove(event) {
  event.preventDefault();

  // Update coordinates based on pointer position
  const pointer = event.pointerId === undefined ? event : event.getPointerList().getPointer(event.pointerId);
  const xValue = map(pointer.clientX, 0, window.innerWidth, 0, 1);
  const yValue = map(pointer.clientY, 0, window.innerHeight, 1, 0); // Invert y-axis for pitch mapping

  if (x && y) {
    x.normalizedValue = xValue;
    y.normalizedValue = yValue;
  }
}


function draw() {
  background(180, 17, 240);

  // Draw ellipses for each touch
  for (let i = 0; i < touches.length; i++) {
    const touch = touches[i];
    fill(255);
    ellipse(touch.x, touch.y, 50, 50);
  }
}


