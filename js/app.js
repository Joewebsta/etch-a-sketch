const header = document.querySelector('header');
const container = document.querySelector('.container');
const browserHeight = window.innerHeight;
const headerHeight = header.offsetHeight;
const percentPageHeight = .9;
const borderWidth = 1;
let hVal = 0;

setGridDimensions();

function setGridDimensions() {
    const etchASketchHeight = (browserHeight - headerHeight) * percentPageHeight;
    container.setAttribute('style', `height: ${etchASketchHeight}px; width: ${etchASketchHeight}px`);
    
    calcModuleDimensions(etchASketchHeight);
}

function calcModuleDimensions(etchASketchHeight, gridColumns = 16) {
    const totBorderHeight = gridColumns * 2 * borderWidth;
    const usableEASHeight = etchASketchHeight - totBorderHeight;
    const moduleHeight = usableEASHeight / gridColumns;

    createModules(moduleHeight, gridColumns);
}

function createModules(moduleHeight, gridColumns) {
    const totModules = gridColumns ** 2;
    
    for (i = 0; i < totModules; i++) {
        const module = document.createElement('div');
        module.setAttribute('style', `height: ${moduleHeight}px; width: ${moduleHeight}px; border-width: ${borderWidth}`);
        module.classList.add('module');
        module.setAttribute('data-hover-count', '0');
        container.appendChild(module);
    }
};

const modules = document.querySelectorAll('.module');
modules.forEach(mod => mod.addEventListener('mouseenter', changeColor));

function changeColor(e) {
    const elem = e.target;
    let elemHoverCount = Number(elem.getAttribute('data-hover-count'))
    let hslVal = '';

    if (elemHoverCount === 0) {
        hslVal = `hsl(${hVal}, 100%, 50%)`;
        this.style.backgroundColor = hslVal;
    } else {
        lVal = 50 - (elemHoverCount * 5);
        hslVal = `hsl(${hVal}, 100%, ${lVal}%)`;
        this.style.backgroundColor = hslVal; 
    }
    hVal += 3;
    
    elem.setAttribute('data-hover-count', `${elemHoverCount += 1}`);
}