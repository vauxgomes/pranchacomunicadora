// Drag
// https://web.dev/drag-and-drop/
let dragObj = null;
let editDrag = false;

function handleDragStart(e) {
    this.classList.add("border-warning");
    this.style.opacity = 0.2;

    dragObj = this;

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", this.innerHTML);
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }

    return false;
}

function handleDragEnd(e) {
    this.classList.remove("border-warning");
    this.style.opacity = 1;
}

function handleDragEnter(e) {
    this.classList.add("border-success");
}

function handleDragLeave(e) {
    this.classList.remove("border-success");
}

function handleDrop(e) {
    this.classList.remove("border-success");
    e.stopPropagation();

    if (dragObj !== this) {
        dragObj.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData("text/html");
    }

    return false;
}

document.querySelectorAll(".board-blocks .item").forEach((item) => {
    item.addEventListener("dragstart", handleDragStart);
    item.addEventListener("dragover", handleDragOver);
    item.addEventListener("dragend", handleDragEnd);
    item.addEventListener("dragenter", handleDragEnter);
    item.addEventListener("dragleave", handleDragLeave);
    item.addEventListener("drop", handleDrop);
});

document.querySelector("#move-items").addEventListener("click", (e) => {
    if (!editDrag) {
        editDrag = true;

        document.querySelectorAll(".board-blocks .item").forEach((item) => {
            item.setAttribute("draggable", true);
            item.classList.add("item-border");
        });
    } else {
        editDrag = false;

        document.querySelectorAll(".board-blocks .item").forEach((item) => {
            item.setAttribute("draggable", false);
            item.classList.remove("item-border");
        });
    }
});
