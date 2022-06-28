const DEFAULT_SIZE = 16;
const DEFAULT_MODE = 'color';
const BASE_COLOR = 'rgb(255, 228, 196)';

const gridContainer = document.getElementsByClassName('grid-container')[0];
const clearButton = document.getElementById('clear');
const eraserButton = document.getElementById('eraser');
const shaderButton = document.getElementById('shader');

let currentMode = DEFAULT_MODE;
let mouseDown = false;

document.addEventListener('mouseup', () => {mouseDown=false});

function resetGrid(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function makeGrid(size) { //generate size x size grid;
    resetGrid(gridContainer);
    gridContainer.style.setProperty('--grid-rows', size);
    gridContainer.style.setProperty('--grid-columns', size);
    for (let n=0; n<(size**2); n++) {
        let cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.addEventListener('mousedown', toggleCell);
        cell.addEventListener('mouseenter', toggleCell);
        gridContainer.appendChild(cell);
    }
}


function toggleCell(e) {
    if((e.type == 'mouseenter' && mouseDown || e.type == 'mousedown')) {
        mouseDown=true;
        if (currentMode == DEFAULT_MODE) {
            e.target.style.backgroundColor = 'rgb(95, 158, 160)';
        } else if (currentMode == 'erase') {
            e.target.style.backgroundColor = BASE_COLOR;
        } else if (currentMode == 'shade') {
            let bgColor = window.getComputedStyle(e.target).backgroundColor;
            if (bgColor == 'rgb(95, 158, 160)') return;

            let rgbAlpha = parseFloat(bgColor.slice(19, 22));

            if (!rgbAlpha) {
                e.target.style.backgroundColor =  `rgb(95, 158, 160, 0.1)`;
            } else {
                e.target.style.backgroundColor = `rgb(95, 158, 160, ${rgbAlpha + 0.1})`;
            }
        }
    }
}



var slider = document.getElementById('grid-size-selector');
var output = document.getElementById('output');
let size = '16x16';
output.innerText = size;

slider.oninput = function() {
    size = this.value;
    output.innerText = `${size}x${size}`;
    makeGrid(size);
}


clearButton.onclick = () => {
    let cells = Array.from(document.getElementsByClassName('grid-cell'));
    for (let i=0; i<cells.length; i++) {
        cells[i].style.backgroundColor = BASE_COLOR;
    }
}

eraserButton.onclick = () => {
    (currentMode == 'erase')? (currentMode = DEFAULT_MODE): (currentMode = 'erase');
}


shaderButton.onclick = () => {
    (currentMode == 'shade')? (currentMode = DEFAULT_MODE): (currentMode = 'shade');
}




window.onload = () => {
    makeGrid(DEFAULT_SIZE);
} 