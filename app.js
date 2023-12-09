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

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}
function onClick(event) {
  ctx.arc(event.offsetX, event.offsetY, lineWidth.value / 100, 0, 2 * Math.PI);
  ctx.stroke();
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

canvas.addEventListener("click", onClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
lineWidth.addEventListener("change", onLineWidthChange);
colors.addEventListener("change", onColorChange);

colorOptions.forEach((colors) =>
  colors.addEventListener("click", onColorClick)
);
//colors는 html에 있는 "색깔 input"에서 색깔을 선택하고 발생하는 event에서 target.value의 값을 가지고 온다.
//colorOptions의 각각의 색깔은 colors.addEventListener("click", onColorClick)의 결과에서 나온 값을 매개로 colors와 연동한다.
//onColorClick을 변수로하는 함수에서는 배열 colorOptions에 속한 각 color-option 클래스를 선택할 때마다 발생하는 target.dataset.color을 참고한다.
//참고한 target.dataset.color는 colors와 매개가 되어 colors.addEventListener("change", onColorChange에 적용
// ctx.strokeStyle = event.target.value와 ctx.fillStyle = event.target.value를 통해 색을 변화한다.
