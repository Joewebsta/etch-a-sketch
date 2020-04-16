const header = document.querySelector('header');
const container = document.querySelector('.container');
const browserHeight = window.innerHeight;
const headerHeight = header.offsetHeight;
const gridColumns = 16;
const borderWidth = 1;

function setGridDimensions() {
    const gridHeight = (browserHeight - headerHeight) * .9;
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

function initialize() {
    setGridDimensions();
};

initialize()