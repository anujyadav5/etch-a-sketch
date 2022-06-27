const DEFAULT_SIZE = 16;
const DEFAULT_MODE = 'color';

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
        cell.addEventListener('mouseover', toggleCell);
        gridContainer.appendChild(cell);
    }
}


function toggleCell(e) {
    if((e.type == 'mouseover' && mouseDown || e.type == 'mousedown')) {
        mouseDown=true;
        if (currentMode == DEFAULT_MODE) {
            e.target.classList.add('colored-cell');
        } else if (currentMode == 'erase') {
            e.target.classList.remove('colored-cell');
        } else if (currentMode == 'shade') {
            
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
        cells[i].classList.remove('colored-cell');
    }
}

eraserButton.onclick = () => {
    (currentMode == 'erase')? (currentMode = 'color'): (currentMode = 'erase');
}






window.onload = () => {
    makeGrid(DEFAULT_SIZE);
} 