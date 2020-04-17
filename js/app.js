const header = document.querySelector('header');
const container = document.querySelector('.container');
const browserHeight = window.innerHeight;
const headerHeight = header.offsetHeight;
const percentPageHeight = .9;
const gridColumns = 16;
const borderWidth = 1;



setGridDimensions();

function setGridDimensions() {
    const gridHeight = (browserHeight - headerHeight) * percentPageHeight;
    container.setAttribute('style', `height: ${gridHeight}px; width: ${gridHeight}px`);
    
    calcModuleDimensions(gridHeight);
}

function calcModuleDimensions(gridHeight) {
    const totBorderHeight = gridColumns * 2 * borderWidth;
    const usableGridHeight = gridHeight - totBorderHeight;
    const moduleHeight = usableGridHeight / gridColumns;

    createModules(moduleHeight);
}

function createModules(moduleHeight) {
    const totModules = gridColumns ** 2;
    
    for (i = 0; i < totModules; i++) {
        const module = document.createElement('div');
        module.setAttribute('style', `height: ${moduleHeight}px; width: ${moduleHeight}px; border-width: ${borderWidth}`);
        module.classList.add('module');
        container.appendChild(module);
    }
};

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


const modules = document.querySelectorAll('.module');
modules.forEach(mod => mod.addEventListener('mouseenter', changeColor));

function changeColor(e) {
    const r = getRandomInt(256);
    const b = getRandomInt(256);
    const g = getRandomInt(256);
    e.target.style.backgroundColor = `rgb(${r},${g},${b})`; 
}

