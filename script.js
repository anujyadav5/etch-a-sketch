const gridContainer = document.getElementsByClassName('grid-container')[0];

function clearGrid(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function makeGrid(size) { //generate size x size grid;
    clearGrid(gridContainer);
    gridContainer.style.setProperty('--grid-rows', size);
    gridContainer.style.setProperty('--grid-columns', size);
    for (let n=0; n<(size**2); n++) {
        let cell = document.createElement('div');
        cell.className = 'grid-cell';
        sketchableCell(cell);
        gridContainer.appendChild(cell);
    }
}

let mouseDown = false;
document.addEventListener('mouseup', () => {mouseDown=false});

function sketchableCell(e) {

    e.addEventListener('mousedown', () => {
        mouseDown=true;
        e.classList.add('colored-cell');
    });

    e.addEventListener('mouseover', () => {
        if (mouseDown) {
            e.classList.add('colored-cell');
        }
    });
}

makeGrid(16, 16); //default;

var slider = document.getElementById('grid-size-selector');
var output = document.getElementById('output');
let size = '16x16';
output.innerText = size;

slider.oninput = function() {
    size = this.value;
    output.innerText = `${size}x${size}`;
    console.log(size)
    makeGrid(size);
}