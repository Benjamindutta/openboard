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


let stickyNotes = document.querySelector(".stickynote");


stickyNotes.addEventListener('click', (e) => {
    let div = document.createElement("div");
    div.setAttribute("class", "sticky-note-cont");

    div.innerHTML = `
    <div class="sticky-note-header">
                <div class="minimize-btn">
                    <span class="material-icons-outlined minimize">
                        do_disturb_on
                    </span>
                </div>
                <div class="cancel_btn">
                    <span class="material-icons-outlined">
                        cancel
                    </span>
                </div>
    </div>
    <div class="contentArea">
     <textarea id="textArea"></textarea>
    </div>
   `;
    let mainBody = document.querySelector('.mainbody');
    mainBody.appendChild(div);
    dragndrop(div);

    //minimize
    let minimizeBtn = div.querySelector(".minimize");
    let minimizeFlag = false;
    minimizeBtn.addEventListener('click', (e) => {
        minimizeFlag = !minimizeFlag;
        if (minimizeFlag) {
            let stickyArea = div.querySelector('.contentArea');
            stickyArea.style.display = 'none';
        } else {
            let stickyArea = div.querySelector('.contentArea');
            stickyArea.style.display = 'flex';
        }
    })

    let removeBtn = div.querySelector(".cancel_btn");
    removeBtn.addEventListener('click', (e) => {
        removeBtn.parentElement.parentElement.remove();
    })
})

let imageNotes = document.querySelector(".imageIn");


imageNotes.addEventListener('click', (e) => {
    let input = document.createElement("input");
    input.setAttribute("type", "file");

    input.click();
    input.addEventListener('change', (e) => {
        let imageFile = input.files[0];
        let url = URL.createObjectURL(imageFile);


        let div = document.createElement("div");
        div.setAttribute("class", "sticky-note-cont");

        div.innerHTML = `
    <div class="sticky-note-header">
                <div class="minimize-btn">
                    <span class="material-icons-outlined minimize">
                        do_disturb_on
                    </span>
                </div>
                <div class="cancel_btn">
                    <span class="material-icons-outlined">
                        cancel
                    </span>
                </div>
    </div>
    <div class="contentArea">
    <img src="${url}"/>
    </div>`;
        let mainBody = document.querySelector('.mainbody');
        mainBody.appendChild(div);
        dragndrop(div);

        //minimize
        let minimizeBtn = div.querySelector(".minimize");
        let minimizeFlag = false;
        minimizeBtn.addEventListener('click', (e) => {
            minimizeFlag = !minimizeFlag;
            if (minimizeFlag) {
                let stickyArea = div.querySelector('.contentArea');
                stickyArea.style.display = 'none';
            } else {
                let stickyArea = div.querySelector('.contentArea');
                stickyArea.style.display = 'flex';
            }
        })

        let removeBtn = div.querySelector(".cancel_btn");
        removeBtn.addEventListener('click', (e) => {
            removeBtn.parentElement.parentElement.remove();
        })
    })

})

function dragndrop(div) {
    div.onmousedown = function (event) {

        let shiftX = event.clientX - div.getBoundingClientRect().left;
        let shiftY = event.clientY - div.getBoundingClientRect().top;

        div.style.position = 'absolute';
        div.style.zIndex = 1000;


        moveAt(event.pageX, event.pageY);

        // moves the div at (pageX, pageY) coordinates
        // taking initial shifts into account
        function moveAt(pageX, pageY) {
            div.style.left = pageX - shiftX + 'px';
            div.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        // move the div on mousemove
        document.addEventListener('mousemove', onMouseMove);

        // drop the div, remove unneeded handlers
        div.onmouseup = function () {
            document.removeEventListener('mousemove', onMouseMove);
            div.onmouseup = null;
        };

    };
}

