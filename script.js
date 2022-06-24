const gridContainer = document.getElementsByClassName('grid-container')[0];

function makeGrid(size) {
    gridContainer.style.setProperty('--grid-rows', size);
    gridContainer.style.setProperty('--grid-columns', size);
    for (let n=0; n<(size**2); n++) {
        let cell = document.createElement('div');
        gridContainer.appendChild(cell).className = 'grid-cell';
    }
}

makeGrid(16, 16);

const cells = Array.from(document.getElementsByClassName('grid-cell'));

let mouseDown = false;

for (let cell of cells) {

    cell.addEventListener('mousedown', () => {
        mouseDown=true;
        cell.classList.add('colored-cell');
    });
    document.addEventListener('mouseup', () => {mouseDown=false});

    cell.addEventListener('mouseover', () => {
        if (mouseDown) {
            cell.classList.add('colored-cell');
        }
    });
}



