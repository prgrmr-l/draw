const modeBtn = document.getElementById("mode-btn");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const colors = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;
let isPainting = false;
let isFilling = true;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}
function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "Draw";
  } else {
    isFilling = true;
    modeBtn.innerText = "fill";
  }
}
function onCanvasClick(event) {
  if (isFilling) {
    ctx.fillRect(0, 0, 800, 800);
  } else {
    ctx.arc(
      event.offsetX,
      event.offsetY,
      lineWidth.value / 100,
      0,
      2 * Math.PI
    );
    ctx.stroke();
  }
}
function startPainting(event) {
  ctx.arc(event.offsetX, event.offsetY, lineWidth.value / 100, 0, 2 * Math.PI);
  isPainting = true;
}
function cancelPainting() {
  isPainting = false;
  ctx.beginPath();
}

function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}
function onColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
  //console.dir(event.target.dataset.color);
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  colors.value = colorValue;
}

canvas.addEventListener("click", onCanvasClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
lineWidth.addEventListener("change", onLineWidthChange);
colors.addEventListener("change", onColorChange);

colorOptions.forEach((colors) =>
  colors.addEventListener("click", onColorClick)
);
modeBtn.addEventListener("click", onModeClick);
