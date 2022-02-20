const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColor");
const range = document.querySelector("#jsRange");
const modeButton = document.querySelector("#jsMode");
const saveButton = document.querySelector("#jsSave");

const DEFAULT_COLOR = "#2c2c2c";

canvas.width = 800;
canvas.height = 600;

ctx.strokeStyle = DEFAULT_COLOR;
ctx.strokeStyle = DEFAULT_COLOR;
ctx.lineWidth = 10.0;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColor(event){
    const selectColor = event.target.style.backgroundColor;
    ctx.strokeStyle = selectColor;
    ctx.fillStyle = selectColor;
}

function handleRange(event){
    const rangeValue = event.target.value;
    ctx.lineWidth = rangeValue;
}

function handleModeButton(){
    if(filling === true){
        filling = false;
        modeButton.innerText = "채우기";
    } else {
        filling = true;
        modeButton.innerText = "그리기";  
    }
}

function handleFill(){
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCtxMenu(event){
    event.preventDefault();
}

function handleSaveButton(){
    const imageUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "art.png";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleFill);
    canvas.addEventListener("contextmenu", handleCtxMenu);
}

Array.from(colors).forEach((color) =>
    color.addEventListener("click", handleColor)
);

if(range){
    range.addEventListener("input", handleRange)
}

if(modeButton){
    modeButton.addEventListener("click", handleModeButton)
}

if(saveButton){
    saveButton.addEventListener("click", handleSaveButton)
}