let menuBtn = document.querySelector(".menu-btn");

let toolBar = document.querySelector(".tool-bar");

let toolBarFlag = false;
menuBtn.addEventListener('click', (e) => {
    toolBarFlag = !toolBarFlag;
    if (toolBarFlag) {
        toolBar.style.display = "flex";
        toolBar.classList.add("toolBarAni")
    } else {
        toolBar.style.display = "none";
        toolBar.classList.remove("toolBarAni")
    }
})

let pen = document.querySelector(".pen");

let penTool = document.querySelector(".pentool");
let penFlag = false;
pen.addEventListener('click', (e) => {
    penFlag = !penFlag;
    if (penFlag) {
        penTool.style.display = "flex";
    } else {
        penTool.style.display = "none";
    }
})

let eraser = document.querySelector(".eraser");

let eraserTool = document.querySelector(".eraserTool");
let eraserFlag = false;
eraser.addEventListener('click', (e) => {
    eraserFlag = !eraserFlag;
    if (eraserFlag) {
        eraserTool.style.display = "flex";
    } else {
        eraserTool.style.display = "none";
    }
})

