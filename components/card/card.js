let dragSrcEl;
let dragging = false
let isDragging = false;
let startPosition = {x: 0, y: 0};
let scrollLeft = 0;
let scrollTop = 0;
let last = document.querySelectorAll('.dragover')[0]
const header = document.querySelector("header")
const cards = document.querySelectorAll(".card");
const columnss = document.querySelectorAll(".column")
let draggingColumn;
let droppedColumn;
let startedColumn;


function isBefore(el1, el2) {
    let cur
    if (el2.parentNode === el1.parentNode) {
        for (cur = el1.previousSibling; cur; cur = cur.previousSibling) {
            if (cur === el2) return true
        }
    }
    return false;
}

makeMouseScrollable(document.querySelector("#playGround"))
while (dragging) {
    isDragging = false
    startPosition = {x: 0, y: 0};
    scrollLeft = 0;
    scrollTop = 0;
    stopMouseScrolling(document.querySelector("#playGround"))
}
document.querySelector("#playGround").effectAllowed = "move"


function drag() {
    dragging = true;
    isDragging = false
    startPosition = {x: 0, y: 0};
    scrollLeft = 0;
    scrollTop = 0;
    stopMouseScrolling()

    return false
}

function dragStart(e) {
    dragging = true
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.setData('text/plain', null)
    dragSrcEl = e.target;
    dragSrcEl.opacity = 0.5;

    startedColumn = this.closest(".column")
    console.log(startedColumn)

    e.dataTransfer.setData("taskId", this.id);
    e.dataTransfer.setData("completed", this.getAttribute("data-completed"));

    isDragging = false
    startPosition = {x: 0, y: 0};
    scrollLeft = 0;
    scrollTop = 0;
    stopMouseScrolling(document.querySelector("#playGround"))
    return false;
}

function dragEnter(e) {
}

function dragOver(e) {
    dragging = true;
    draggingColumn = this.closest(".column");
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    last = document.querySelectorAll('.dragover')[0];

    if (last === undefined) {
        this.classList.add("dragover");
    } else {
        last.classList.remove("dragover");
        this.classList.add("dragover");
        last = this;
    }

    if (dragSrcEl !== this && !this.contains(dragSrcEl)) {

        if (isBefore(dragSrcEl, this)) {
            draggingColumn.insertBefore(dragSrcEl, this);
        } else {
            draggingColumn.insertBefore(dragSrcEl, this.nextElementSibling);
        }
    }
    this.scrollIntoView({behavior: "smooth", block: "end"})

    isDragging = false;
    startPosition = {x: 0, y: 0};
    scrollLeft = 0;
    scrollTop = 0;
    stopMouseScrolling(playGround);
    return false;
}

function dragLeave(e) {
    dragging = true
    e.preventDefault();
    if (this.classList.contains('dragover') && this !== last) {
        this.classList.remove('dragover')
    }

    isDragging = false
    startPosition = {x: 0, y: 0};
    scrollLeft = 0;
    scrollTop = 0;
    stopMouseScrolling(playGround)
    return false;
}

function dragDrop(e) {
    this.classList.remove("dragover")
    dragging = false
    header.scrollIntoView({behavior: "smooth", block: "end"})
    makeMouseScrollable(playGround)
    return false;
}

async function dragEnd(e) {
    this.classList.remove("dragover");
    header.scrollIntoView({behavior: "smooth", block: "end"});

    droppedColumn = this.closest(".column");
    //
    // console.log("Dropped Column ID:", droppedColumn.id);
    // console.log("Number of Cards in Dropped Column:", droppedColumn.querySelectorAll(".card").length);
    //
    // const updatedCol = updatedColumn(defaultBoard, droppedColumn.id, droppedColumn, await fetchData());
    // console.log("Updated Column:", updatedCol);
    //
    // updateColumn(defaultBoard, droppedColumn.id, droppedColumn, await fetchData());
    // await console.log("After Update - Find Column:", findColumn(defaultBoard, droppedColumn.id, await fetchData()));
    // console.log("After update: ",JSON.parse(fetchData()))

    isDragging = false;
    startPosition = {x: 0, y: 0};
    scrollLeft = 0;
    scrollTop = 0;
    stopMouseScrolling(playGround);
    dragging = true;

    return false;
}


function mouseDown(e) {
    this.classList.add("dragover")
    dragging = true
    isDragging = false
    startPosition = {x: 0, y: 0};
    scrollLeft = 0;
    scrollTop = 0;
    stopMouseScrolling(playGround)
    return false
}

function mouseUp() {
    this.classList.remove('dragover')
    isDragging = false
    startPosition = {x: 0, y: 0};
    scrollLeft = 0;
    let scrollTop = 0;
    stopMouseScrolling(playGround)
    return false
}

function dragDropColumn(e) {
    e.preventDefault()
    header.scrollIntoView({behavior: "smooth", block: "end"})
    const sourceCardId = e.dataTransfer.getData("taskId");
    const targetCardId = this.getAttribute("id");
    const completed = e.dataTransfer.getData("completed");

    // console.log(e.dataTransfer.getData("newColumnId"))
    // console.log(droppedColumn.id)


    return false
}

function dragOverColumn(e) {
    this.appendChild(dragSrcEl)
    const newColumn = document.querySelector('#newColumn')
    const columnsss = document.querySelectorAll(".column")
    const theColumn = getColumnWithMostChildNodes(columnsss)
    newColumn.style.height = `${calculateSumOfCardHeights(theColumn) + theColumn.querySelectorAll(".card").length * 18}px`
    columnsss.forEach(col => {
        col.style.height = `${100}%`
    })


    // this.scrollIntoView({behavior:"smooth"})
    if (this.querySelectorAll('.card').length === theColumn.querySelectorAll('.card').length) {

    } else {

        this.scrollIntoView({behavior: "smooth", block: "start"})
    }
    return false
}

function addEventsDragAndDrop(el) {
    el.addEventListener("dragstart", dragStart, false);
    el.addEventListener("dragover", dragOver, false);
    el.addEventListener("dragleave", dragLeave, false);
    el.addEventListener("dragenter", dragEnter, false);
    el.addEventListener("drop", dragDrop, false);
    el.addEventListener("dragend", dragEnd, false);
    el.addEventListener("mousedown", mouseDown, false)
    el.addEventListener("mouseup", mouseUp, false)
}

columnss.forEach(col => {
    col.addEventListener("dragover", dragOverColumn, false)
    col.addEventListener("drop", dragDropColumn, false)
})
// make images Draggable <END>

cards.forEach((card) => {
    card.draggable = true;
    addEventsDragAndDrop(card);
});


function makeMouseScrollable(el) {
    el.addEventListener("mousedown", (e) => {
        isDragging = true;
        startPosition = {
            x: e.clientX,
            y: e.clientY,
        };
        scrollLeft = document.querySelector("#playGround").scrollLeft;
        scrollTop = document.querySelector("#playGround").scrollTop;

    });
    el.addEventListener("mouseup", () => {
        if (isDragging) {
            isDragging = false;
        }
    });

    el.addEventListener("mousemove", (e) => {
        if (isDragging) {
            const deltaX = e.clientX - startPosition.x;
            const deltaY = e.clientY - startPosition.y;

            document.querySelector("#playGround").scrollLeft = scrollLeft - deltaX;
            document.querySelector("#playGround").scrollTop = scrollTop - deltaY;
        }
    });
}

function stopMouseScrolling(el) {
    el.removeEventListener("mousedown", (e) => {
        isDragging = true;
        startPosition = {
            x: e.clientX,
            y: e.clientY,
        };
        scrollLeft = document.querySelector("#playGround").scrollLeft;
        scrollTop = document.querySelector("#playGround").scrollTop;

    });
    el.removeEventListener("mouseup", () => {
        if (isDragging) {
            isDragging = false;
        }
    });

    el.removeEventListener("mousemove", (e) => {
        if (isDragging) {
            const deltaX = e.clientX - startPosition.x;
            const deltaY = e.clientY - startPosition.y;

            document.querySelector("#playGround").scrollLeft = scrollLeft - deltaX;
            document.querySelector("#playGround").scrollTop = scrollTop - deltaY;
        }
    });
}

function cardJS() {

    let dragging = false
    let isDragging = false;
    let startPosition = {x: 0, y: 0};
    let scrollLeft = 0;
    let scrollTop = 0;
    let last = document.querySelectorAll('.dragover')[0]
    const header = document.querySelector("header")
    let draggingColumn;
    let droppedColumn;
    let startedColumn;


    function isBefore(el1, el2) {
        let cur
        if (el2.parentNode === el1.parentNode) {
            for (cur = el1.previousSibling; cur; cur = cur.previousSibling) {
                if (cur === el2) return true
            }
        }
        return false;
    }

    makeMouseScrollable(document.querySelector("#playGround"))
    while (dragging) {
        isDragging = false
        startPosition = {x: 0, y: 0};
        scrollLeft = 0;
        scrollTop = 0;
        stopMouseScrolling(document.querySelector("#playGround"))
    }
    document.querySelector("#playGround").effectAllowed = "move"


    function drag() {
        dragging = true;
        isDragging = false
        startPosition = {x: 0, y: 0};
        scrollLeft = 0;
        scrollTop = 0;
        stopMouseScrolling()

        return false
    }

    function dragStart(e) {
        dragging = true
        e.dataTransfer.dropEffect = "move";
        e.dataTransfer.setData('text/plain', null)
        dragSrcEl = e.target;
        dragSrcEl.opacity = 0.5;

        startedColumn = this.closest(".column")
        console.log(startedColumn)

        e.dataTransfer.setData("taskId", this.id);
        e.dataTransfer.setData("completed", this.getAttribute("data-completed"));

        isDragging = false
        startPosition = {x: 0, y: 0};
        scrollLeft = 0;
        scrollTop = 0;
        stopMouseScrolling(document.querySelector("#playGround"))
        return false;
    }

    function dragEnter(e) {
    }

    function dragOver(e) {
        dragging = true;
        draggingColumn = this.closest(".column");
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";


        last = document.querySelectorAll('.dragover')[0];

        if (last === undefined) {
            this.classList.add("dragover");
        } else {
            last.classList.remove("dragover");
            this.classList.add("dragover");
            last = this;
        }

        if (dragSrcEl !== this && !this.contains(dragSrcEl)) {

            if (isBefore(dragSrcEl, this)) {
                draggingColumn.insertBefore(dragSrcEl, this);
            } else {
                draggingColumn.insertBefore(dragSrcEl, this.nextElementSibling);
            }
        }
        this.scrollIntoView({behavior: "smooth", block: "end"})

        isDragging = false;
        startPosition = {x: 0, y: 0};
        scrollLeft = 0;
        scrollTop = 0;
        stopMouseScrolling(playGround);
        return false;
    }

    function dragLeave(e) {
        dragging = true
        e.preventDefault();
        if (this.classList.contains('dragover') && this !== last) {
            this.classList.remove('dragover')
        }

        isDragging = false
        startPosition = {x: 0, y: 0};
        scrollLeft = 0;
        scrollTop = 0;
        stopMouseScrolling(playGround)
        return false;
    }

    function dragDrop(e) {
        this.classList.remove("dragover")
        dragging = false
        header.scrollIntoView({behavior: "smooth", block: "end"})
        makeMouseScrollable(playGround)
        return false;
    }

    async function dragEnd(e) {
        this.classList.remove("dragover");
        header.scrollIntoView({behavior: "smooth", block: "end"});

        droppedColumn = this.closest(".column");
        //
        // console.log("Dropped Column ID:", droppedColumn.id);
        // console.log("Number of Cards in Dropped Column:", droppedColumn.querySelectorAll(".card").length);
        //
        // const updatedCol = updatedColumn(defaultBoard, droppedColumn.id, droppedColumn, await fetchData());
        // console.log("Updated Column:", updatedCol);
        //
        // updateColumn(defaultBoard, droppedColumn.id, droppedColumn, await fetchData());
        // await console.log("After Update - Find Column:", findColumn(defaultBoard, droppedColumn.id, await fetchData()));
        // console.log("After update: ",JSON.parse(fetchData()))

        isDragging = false;
        startPosition = {x: 0, y: 0};
        scrollLeft = 0;
        scrollTop = 0;
        stopMouseScrolling(playGround);
        dragging = true;

        return false;
    }


    function mouseDown(e) {
        this.classList.add("dragover")
        dragging = true
        isDragging = false
        startPosition = {x: 0, y: 0};
        scrollLeft = 0;
        scrollTop = 0;
        stopMouseScrolling(playGround)
        return false
    }

    function mouseUp() {
        this.classList.remove('dragover')
        isDragging = false
        startPosition = {x: 0, y: 0};
        scrollLeft = 0;
        let scrollTop = 0;
        stopMouseScrolling(playGround)
        return false
    }

    function dragDropColumn(e) {
        e.preventDefault()
        header.scrollIntoView({behavior: "smooth", block: "end"})
        const sourceCardId = e.dataTransfer.getData("taskId");
        const targetCardId = this.getAttribute("id");
        const completed = e.dataTransfer.getData("completed");

        // console.log(e.dataTransfer.getData("newColumnId"))
        // console.log(droppedColumn.id)


        return false
    }

    function dragOverColumn(e) {
        this.appendChild(dragSrcEl)
        const newColumn = document.querySelector('#newColumn')
        const columnsss = document.querySelectorAll(".column")
        const theColumn = getColumnWithMostChildNodes(columnsss)
        newColumn.style.height = `${calculateSumOfCardHeights(theColumn) + theColumn.querySelectorAll(".card").length * 18}px`
        columnsss.forEach(col => {
            col.style.height = `${100}%`
        })


        // this.scrollIntoView({behavior:"smooth"})
        if (this.querySelectorAll('.card').length === theColumn.querySelectorAll('.card').length) {

        } else {

            this.scrollIntoView({behavior: "smooth", block: "start"})
        }
        return false
    }

    function addEventsDragAndDrop(el) {
        el.addEventListener("dragstart", dragStart, false);
        el.addEventListener("dragover", dragOver, false);
        el.addEventListener("dragleave", dragLeave, false);
        el.addEventListener("dragenter", dragEnter, false);
        el.addEventListener("drop", dragDrop, false);
        el.addEventListener("dragend", dragEnd, false);
        el.addEventListener("mousedown", mouseDown, false)
        el.addEventListener("mouseup", mouseUp, false)
    }

    const columnss = document.querySelectorAll(".column")
    columnss.forEach(col => {
        col.addEventListener("dragover", dragOverColumn, false)
        col.addEventListener("drop", dragDropColumn, false)
    })
// make images Draggable <END>

    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
        card.draggable = true;
        addEventsDragAndDrop(card);
    });


    function makeMouseScrollable(el) {
        el.addEventListener("mousedown", (e) => {
            isDragging = true;
            startPosition = {
                x: e.clientX,
                y: e.clientY,
            };
            scrollLeft = document.querySelector("#playGround").scrollLeft;
            scrollTop = document.querySelector("#playGround").scrollTop;

        });
        el.addEventListener("mouseup", () => {
            if (isDragging) {
                isDragging = false;
            }
        });

        el.addEventListener("mousemove", (e) => {
            if (isDragging) {
                const deltaX = e.clientX - startPosition.x;
                const deltaY = e.clientY - startPosition.y;

                document.querySelector("#playGround").scrollLeft = scrollLeft - deltaX;
                document.querySelector("#playGround").scrollTop = scrollTop - deltaY;
            }
        });
    }

    function stopMouseScrolling(el) {
        el.removeEventListener("mousedown", (e) => {
            isDragging = true;
            startPosition = {
                x: e.clientX,
                y: e.clientY,
            };
            scrollLeft = document.querySelector("#playGround").scrollLeft;
            scrollTop = document.querySelector("#playGround").scrollTop;

        });
        el.removeEventListener("mouseup", () => {
            if (isDragging) {
                isDragging = false;
            }
        });

        el.removeEventListener("mousemove", (e) => {
            if (isDragging) {
                const deltaX = e.clientX - startPosition.x;
                const deltaY = e.clientY - startPosition.y;

                document.querySelector("#playGround").scrollLeft = scrollLeft - deltaX;
                document.querySelector("#playGround").scrollTop = scrollTop - deltaY;
            }
        });
    }
}

