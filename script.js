let menuBtn = document.querySelector(".menu-btn");

let toolBar = document.querySelector(".tool-bar");

let toolBarFlag = false;
menuBtn.addEventListener('click', (e) => {
    toolBarFlag = !toolBarFlag;
    if (toolBarFlag) {
        toolBar.style.display = "none";
        toolBar.classList.remove("toolBarAni")
    } else {
        toolBar.style.display = "flex";
        toolBar.classList.add("toolBarAni")
    }
})