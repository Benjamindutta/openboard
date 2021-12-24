let canvas = document.querySelector('canvas');
canvas.height = window.screen.height;
canvas.width = window.screen.width;
let tool = canvas.getContext('2d');
tool.beginPath();

let isDraw = false;

let penColor = 'red';
let penWidth = 2;
tool.strokeStyle = penColor;

canvas.addEventListener('mousedown', (e) => {
    isDraw = true;
    let data = {
        x: e.clientX,
        y: e.clientY,
        penColor: penColor,
        penWidth: penWidth
    }
    // beginpath(data);

    socket.emit('beginPath', data);
})

canvas.addEventListener('mousemove', (e) => {
    if (isDraw) {
        let data = {
            x: e.clientX,
            y: e.clientY,
            penColor: penColor,
            penWidth: penWidth
        }
        // draw(data);
        socket.emit('draw', data);
    }
})
let redoundoData = [];
let tracker = 0;
let imageData = canvas.toDataURL();
redoundoData.push(imageData);
canvas.addEventListener('mouseup', (e) => {
    isDraw = false;
    imageData = canvas.toDataURL();
    redoundoData.push(imageData);
    tracker = redoundoData.length - 1;
})

let redColor = document.querySelector('.colorRed');
redColor.addEventListener('click', (e) => {
    penColor = 'red';
    tool.strokeStyle = penColor;
})

let yellowColor = document.querySelector('.colorYellow');
yellowColor.addEventListener('click', (e) => {
    penColor = 'yellow';
    tool.strokeStyle = penColor;
})

let blueColor = document.querySelector('.colorBlue');
blueColor.addEventListener('click', (e) => {
    penColor = 'blue';
    tool.strokeStyle = penColor;
})

let penRange = document.querySelector("#penRange");

penRange.addEventListener('change', (e) => {
    console.log(penRange.value);
    penWidth = penRange.value;
    tool.lineWidth = penWidth;
})
let eraserWidth = 2;
let eraserFlagnew = false;

let eraserClick = document.querySelector('.eraser');

eraserClick.addEventListener('click', (e) => {

    eraserFlagnew = !eraserFlagnew;
    if (eraserFlagnew) {
        tool.strokeStyle = 'white';
        tool.lineWidth = eraserWidth;
    } else {
        tool.strokeStyle = penColor;
        tool.lineWidth = penWidth;
    }
})

let eraserRange = document.querySelector("#eraserRange");

eraserRange.addEventListener('change', (e) => {
    // console.log(eraserRange.value);
    eraserWidth = eraserRange.value;
    tool.lineWidth = eraserWidth;
})


//download image

let download_file = document.querySelector('.download')

download_file.addEventListener('click', (e) => {
    let url = canvas.toDataURL();

    let a = document.createElement('a');
    a.href = url;
    a.download = 'whiteboardImage.jpg';
    a.click();
})

let undo = document.querySelector('.undo');

undo.addEventListener('click', (e) => {
    console.log(tracker)
    if (tracker > 0) {
        tracker = tracker - 1;
    }
    // plotImage(tracker, redoundoData);
    let obj = { tracker: tracker, redoundoData: redoundoData }
    socket.emit('plotImage', obj);


})

let redo = document.querySelector('.redo');

redo.addEventListener('click', (e) => {
    console.log(tracker)
    if (tracker < redoundoData.length - 1) {
        tracker = tracker + 1;
    }
    let obj = { tracker: tracker, redoundoData: redoundoData }
    // plotImage(obj);
    socket.emit('plotImage', obj);

})

function plotImage(obj) {
    let imageData = obj.redoundoData[obj.tracker];
    let newimage = new Image();
    // console.log(imageData)
    newimage.src = imageData;
    // console.log(newimage.src);
    newimage.onload = function () {
        tool.clearRect(0, 0, canvas.width, canvas.height);
        tool.drawImage(newimage, 0, 0, canvas.width, canvas.height);
    }
}
function beginpath(data) {
    tool.beginPath();
    tool.moveTo(data.x, data.y);
    tool.strokeStyle = data.penColor;
    tool.lineWidth = data.penWidth
}

function draw(data) {
    tool.lineTo(data.x, data.y);
    tool.stroke();
}

socket.on('beginPath', (data) => {
    beginpath(data);
})

socket.on('draw', (data) => {
    draw(data);
})

socket.on('plotImage', (data) => {
    plotImage(data);
})