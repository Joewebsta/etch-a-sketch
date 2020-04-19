const header = document.querySelector('header');
const container = document.querySelector('.container');
const browserHeight = Math.floor(window.innerHeight);
const headerHeight = Math.floor(header.offsetHeight);
const gridSizeButton = document.querySelector('.grid-size-btn');
const percentPageHeight = .9;
const borderWidth = 1;
let hVal = 0;

setGridDimensions();

function makeIntAndEven(num) {
    const intNum = Math.floor(num);
    return intNum % 2 === 0 ? intNum : intNum + 1;
}

function calcEASHeight(browserHeight, headerHeight, percentPageHeight) {
    return (browserHeight - headerHeight) * percentPageHeight;
}

function setGridDimensions() {
    const etchASketchHeight = calcEASHeight(browserHeight, headerHeight, percentPageHeight);
    console.log(etchASketchHeight); 
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
    const modules = document.querySelectorAll('.module');
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

gridSizeButton.addEventListener('click', modifyGridSize);

function modifyGridSize() {
    const etchASketchHeight = calcEASHeight(browserHeight, headerHeight, percentPageHeight);
    container.innerHTML = "";
    
    var modifiedEASHeight = Number(prompt('Please enter size:', '16'));
    calcModuleDimensions(etchASketchHeight, modifiedEASHeight);
}
