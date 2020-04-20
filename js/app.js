const header = document.querySelector('header');
const container = document.querySelector('.container');
const browserHeight = Math.floor(window.innerHeight);
const headerHeight = Math.floor(header.offsetHeight);
const gridSizeButton = document.querySelector('.grid-size-btn');
const gridResetButton = document.querySelector('.grid-reset-btn');
const percentPageHeight = .9;
const borderWidth = 1;
let hVal = 210;

gridResetButton.addEventListener('click', resetGrid);
gridSizeButton.addEventListener('click', changeGridSize);

setGridDimensions();

function calcEASHeight(browserHeight, headerHeight, percentPageHeight) {
    return (browserHeight - headerHeight) * percentPageHeight;
}

function setGridDimensions() {
    const etchASketchHeight = calcEASHeight(browserHeight, headerHeight, percentPageHeight);
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

    createHoverEffect();
};

function createHoverEffect() {
    const modules = getModules();
    modules.forEach(mod => mod.addEventListener('mouseenter', changeColor));
}

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

function changeGridSize() {
    const modules = getModules();
    const colNum = Math. sqrt(modules.length);
    const etchASketchHeight = calcEASHeight(browserHeight, headerHeight, percentPageHeight);
    container.innerHTML = "";
    
    let modifiedEASHeight = Number(prompt('Please enter a grid size (i.e. number of columns and rows):', colNum));
    calcModuleDimensions(etchASketchHeight, modifiedEASHeight);
}

function getModules() {
    return document.querySelectorAll('.module');
}

function resetGrid() {
    const modules = getModules();
    modules.forEach(mod => mod.style.backgroundColor = "#FFF");  
}

