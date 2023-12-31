const fileInput = document.getElementById("file");
const modeBtn = document.getElementById("mode-btn");
const modeClear = document.getElementById("clear-btn");
const modeErase = document.getElementById("eraser-btn");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const colors = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
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
    modeBtn.innerText = "Fill";
  }
}
function onCanvasClick(event) {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
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
  //html에서 "data-"를 입력해서 event.target.dataset.color을 이용할 수 있다.
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  colors.value = colorValue;
}
function onClear() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}
function onErase() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Draw";
}
function onFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  // console.dir(url);
  // URL.createObjectURL(file)에서 파일의 URL을 만들어 준다.
  // 브라우저가 자신의 메모리에만 저장. 다른 브라우저나 인터넷주소로 볼 수 없다.
  const image = new Image();
  image.src = url;
  // html의 <img src = ""/>와 같다.
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_HEIGHT, CANVAS_WIDTH);
    fileInput.value = null;
    // 파일을 업로드 하고 fileInput을 비운다.
  };
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
modeClear.addEventListener("click", onClear);
modeErase.addEventListener("click", onErase);
fileInput.addEventListener("change", onFileChange);
