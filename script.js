/* default values */
const DEFAULT_SIZE = 10;
const DEFAULT_COLOR = '#000000';
const BUTTON_SELECTED_COLOR = '#c23434';

let currentColor = DEFAULT_COLOR;
let currentSize = DEFAULT_SIZE;


function setCurrentColor(newColor) {
    currentColor = newColor;
}
function setCurrentSize(newSize) {
    currentSize = newSize;
}



/* variables */
const colorPiker = document.getElementById('color-piker');
const eraseBtn = document.getElementById('erase-btn');
const colorBtn = document.getElementById('color-btn');
const clearBtn = document.getElementById('clear-btn');
const rangeText = document.getElementById('range-text');
const sizeSlider = document.getElementById('size-slider');
const gridContainer = document.getElementById('grid-container');


//actualiza el color
colorPiker.onchange = (e) => {
    setCurrentColor(e.target.value);
    btnColorear();
}

// permite dibujar mantieniendo el click apretado
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

//dibuja el grid inicial
girdSetup(currentSize);


// cambia el color de las celdas
function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    e.target.style.backgroundColor = currentColor;
}

//borra todo el dibujo al cambiar el tamaño
function clearGrid() {
    gridContainer.innerHTML = '';
}


// crea el grid segun el tamaño
function girdSetup(size) {
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size * size; i++) {
        const gridDiv = document.createElement('div');
        gridDiv.classList.add('grid-div');
        gridDiv.addEventListener('mouseover', changeColor);
        gridDiv.addEventListener('mousedown', changeColor)
        gridContainer.appendChild(gridDiv);
    }
    colorBtn.style.backgroundColor = BUTTON_SELECTED_COLOR;
    eraseBtn.style.backgroundColor = '#2d2d2d';
    setCurrentColor(colorPiker.value);
}


//muestra en pantalla el tamaño del grid sobre el slider y resetea el dibujo al cambiar el tamaño
sizeSlider.addEventListener('input', function () {
    clearGrid();
    rangeText.textContent = sizeSlider.value + ' * ' + sizeSlider.value;
    setCurrentSize(sizeSlider.value);
    girdSetup(currentSize);
})


// boton para efecto goma de borrar
eraseBtn.addEventListener('click', function () {
    setCurrentColor('#ffffff');
    colorBtn.style.backgroundColor = '#2d2d2d';
    eraseBtn.style.backgroundColor = BUTTON_SELECTED_COLOR;
})

//boton para colorear

function btnColorear() {
    eraseBtn.style.backgroundColor = '#2d2d2d';
    colorBtn.style.backgroundColor = BUTTON_SELECTED_COLOR;
    setCurrentColor(colorPiker.value);
}

colorBtn.addEventListener('click', btnColorear)

//bonton para borrar todo el lienzo
clearBtn.addEventListener('click', function () {
    clearGrid();
    girdSetup(currentSize);
    btnColorear();
})