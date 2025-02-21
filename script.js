const tablePlaces = {
    crafting: {
        slots: [
            { x: 43, y: 43 }, { x: 154, y: 43 }, { x: 265, y: 43 },
            { x: 43, y: 154 }, { x: 154, y: 154 }, { x: 265, y: 154 },
            { x: 43, y: 265 }, { x: 154, y: 265 }, { x: 265, y: 265 },
            { x: 621, y: 155 }
        ],
        slotSize: 111,
        width: 800,
        height: 418,
        itemSize: 90,
    },
    cutting: {
        slots: [
            { x: 56, y: 224 }, { x: 272, y: 64 }, { x: 520, y: 224 },
        ],
        slotSize: 144,
        width: 752,
        height: 456,
        itemSize: 128,
    },
    blasting: {
        slots: [
            { x: 56, y: 56 }, { x: 536, y: 200 }, { x: 56, y: 344 },
        ],
        slotSize: 144,
        width: 768,
        height: 544,
        itemSize: 128,
    },
};
/**
 * Populates a table-place with objects.
 * @param {string} containerId - ID of the HTML element.
 * @param {string} tableType - Type of table-place (must match a key in tablePlaces).
 * @param {Array} objectList - Objects with { slot, img }.
 */
function populateTable(containerId, tableType, objectList) {
    const container = document.getElementById(containerId);
    if (!container || !tablePlaces[tableType]) return;
    container.className = `table-place ${tableType}`;

    const tableData = tablePlaces[tableType];
    container.innerHTML = "";

    const containerWidth = container.clientWidth;
    const scale = containerWidth / tableData.width;

    const itemWidth = tableData.itemSize;
    const itemHeight = tableData.itemSize;
    objectList.forEach(obj => {
        const slotData = tableData.slots[obj.slot];
        if (!slotData) return;

        // Create the object element
        const objDiv = document.createElement("div");
        objDiv.classList.add("item");
        objDiv.style.backgroundImage = `url(${obj.img})`;

        // Scale positioning
        objDiv.style.width = `${(itemWidth / tableData.width) * 100}%`; // Keeps size relative
        objDiv.style.height = `${(itemHeight / tableData.height) * 100}%`;
        objDiv.style.position = "absolute";
        objDiv.style.left = `${(slotData.x + (tableData.slotSize-itemWidth)/2) * scale}px`;
        objDiv.style.top = `${(slotData.y + (tableData.slotSize-itemHeight)/2) * scale}px`;

        container.appendChild(objDiv);

        // Add text if provided
        if (obj.amount && obj.amount !== "1") {
            const textDiv = document.createElement("div");
            textDiv.classList.add("itemAmount");
            textDiv.innerText = obj.amount;

            // Position text inside the object
            //textDiv.style.position = "absolute";
            //textDiv.style.right = "5px";
            //textDiv.style.bottom = "5px";

            objDiv.appendChild(textDiv);
        }
    });
}
function populateRedCuCrafter(containerId, toggles, objectList) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.className = `table-place redcu-crafting`;

    const tableData = {
        slots: [
            { x: 240, y: 120 }, { x: 240, y: 264 }, { x: 240, y: 408 },
            { x: 440, y: 192 }, { x: 776, y: 272 },
        ],
        slotSize: 144,
        itemSize: 128,
        categorories: [
            { x: 56, y: 48 }, { x: 56, y: 192 }, { x: 56, y: 336 }, { x: 56, y: 480 }, 
        ],
        tipes: [
            { x: 960, y: 48 }, { x: 960, y: 192 },
        ],
        width: 1160,
        height: 680,
    };
    container.innerHTML = "";

    const containerWidth = container.clientWidth;
    const scale = containerWidth / tableData.width;

    const itemWidth = tableData.itemSize;
    const itemHeight = tableData.itemSize;
    objectList.forEach(obj => {
        const slotData = tableData.slots[obj.slot];
        if (!slotData) return;

        // Create the object element
        const objDiv = document.createElement("div");
        objDiv.classList.add("item");
        //objDiv.classList.add("pixelated");
        objDiv.style.backgroundImage = `url(${obj.img})`;

        // Scale positioning
        objDiv.style.width = `${(itemWidth / tableData.width) * 100}%`;
        objDiv.style.height = `${(itemHeight / tableData.height) * 100}%`;
        objDiv.style.position = "absolute";
        objDiv.style.left = `${(slotData.x + (tableData.slotSize-itemWidth)/2) * scale}px`;
        objDiv.style.top = `${(slotData.y + (tableData.slotSize-itemHeight)/2) * scale}px`;

        container.appendChild(objDiv);

        if (obj.addon){
            obj.addon.forEach(oad => {
                const oadDiv = document.createElement("div");
                oadDiv.classList.add("item");
                //oadDiv.classList.add("pixelated");
                oadDiv.style.backgroundImage = `url(${oad})`;
                oadDiv.style.width = objDiv.style.width
                oadDiv.style.height = objDiv.style.height
                oadDiv.style.position = objDiv.style.position
                oadDiv.style.left = objDiv.style.left
                oadDiv.style.top = objDiv.style.top
                container.appendChild(oadDiv);
            })
        }
        
        // Add text if provided
        if (obj.amount && obj.amount !== "1") {
            const textDiv = document.createElement("div");
            textDiv.classList.add("itemAmount");
            textDiv.innerText = obj.amount;

            // Position text inside the object
            //textDiv.style.position = "absolute";
            //textDiv.style.right = "5px";
            //textDiv.style.bottom = "5px";

            objDiv.appendChild(textDiv);
        }
    });

    function addSelector(pos){
        const objDiv = document.createElement("div");

        objDiv.classList.add("selector");
        objDiv.style.backgroundImage = `url("media/gui/selector.png")`;
        objDiv.style.width = `${(144 / tableData.width) * 100}%`;
        objDiv.style.height = `${(144 / tableData.height) * 100}%`;
        objDiv.style.position = "absolute";
        objDiv.style.left = `${(pos.x + (tableData.slotSize-144)/2) * scale}px`;
        objDiv.style.top = `${(pos.y + (tableData.slotSize-144)/2) * scale}px`;

        container.appendChild(objDiv);
    }
    addSelector({ x: 440, y: 192 });
    if (tableData.categorories[toggles.category]){addSelector(tableData.categorories[toggles.category]);}
    if (tableData.tipes[toggles.tipe]){addSelector(tableData.tipes[toggles.tipe]);}
}
/**
 * Applies layered images inside a specified div container.
 * @param {string} containerId - The ID of the target div element.
 * @param {string} baseImage - The filename of the base image (e.g., "component.png").
 * @param {Array<string>} marks - Array of filenames for the middle layer (marks).
 * @param {Array<string>} modifiers - Array of filenames for the top layer (modifiers).
 */
function renderComponent(containerId, baseImage, marks, modifiers) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";
    container.classList.add("component-render-container");

    function createImageElement(src) {
        const img = document.createElement("img");
        img.src = src;
        img.classList.add("layer-component");
        return img;
    }

    container.appendChild(createImageElement(`media/renders/${baseImage}`));
    marks.forEach(mark => {
        container.appendChild(createImageElement(`media/renders/pinmarks/${mark}.png`));
    });
    modifiers.forEach(modifier => {
        container.appendChild(createImageElement(`media/renders/${modifier}`));
    });
}
/**
 * Applies layered images inside a specified div container.
 * @param {string} containerId - The ID of the target div element.
 * @param {string} baseImage - The filename of the base image (e.g., "component.png").
 * @param {Array<string>} marks - Array of filenames for the middle layer (marks).
 * @param {Array<string>} modifiers - Array of filenames for the top layer (modifiers).
 */
function renderMidComponent(containerId, background, baseImage, forwground) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";
    container.classList.add("component-render-container");

    function createImageElement(src) {
        const img = document.createElement("img");
        img.src = src;
        img.classList.add("layer-component");
        return img;
    }

    background.forEach(bg => {
        container.appendChild(createImageElement(`media/renders/${bg}`));
    });
    container.appendChild(createImageElement(`media/renders/${baseImage}`));
    forwground.forEach(fg => {
        container.appendChild(createImageElement(`media/renders/${fg}`));
    });
}
/**
 * Applies layered images inside a specified div container.
 * @param {string} containerId - The ID of the target div element.
 * @param {string} baseImage - The filename of the base image (e.g., "component.png").
 * @param {Array<string>} marks - Array of filenames for the middle layer (marks).
 * @param {Array<string>} modifiers - Array of filenames for the top layer (modifiers).
 */
function blitzComponent(containerId, baseImage, marks, modifiers) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";
    container.classList.add("component-blitz-container");

    function createImageElement(src) {
        const img = document.createElement("img");
        img.src = src;
        img.classList.add("layer-component");
        img.classList.add("pixelated");
        return img;
    }

    container.appendChild(createImageElement(`media/textures/${baseImage}`));
    marks.forEach(mark => {
        container.appendChild(createImageElement(`media/textures/pinmarks/${mark}.png`));
    });
    modifiers.forEach(modifier => {
        container.appendChild(createImageElement(`media/textures/${modifier}`));
    });
}

function toggleImageHover(imageId, offSrc, onSrc) {
    const img = document.getElementById(imageId);
    if (!img) return;
    img.addEventListener("mouseenter", function () {img.src = onSrc;});
    img.addEventListener("mouseleave", function () {img.src = offSrc;});
}
function toggleDivHover(divId, offSrc, onSrc) {
    const img = document.getElementById(divId);
    if (!img) return;
    img.addEventListener("mouseenter", onSrc);
    img.addEventListener("mouseleave", offSrc);
}

function setupImageSwitcher(imageId, buttons) {
    const img = document.getElementById(imageId);
    if (!img) return;

    let activeButton = document.getElementById(buttons[0].buttonId);

    buttons.forEach(({ buttonId, imageSrc }) => {
        const button = document.getElementById(buttonId);
        if (!button) return;

        button.addEventListener("click", function () {
            img.src = imageSrc;

            if (activeButton) {
                activeButton.classList.remove("active");
            }

            button.classList.add("active");
            activeButton = button;
        });
    });
}
function addButtonClickListeners(buttons) {
    buttons.forEach(({ buttonId, functionCall }) => {
        const button = document.getElementById(buttonId);
        if (!button) return;
        button.addEventListener("click", functionCall);
    });
}

function setupImageSwitcherHover(imageId, buttons) {
    const img = document.getElementById(imageId);
    if (!img) return;
    let currentIndex = 0;
    function setActiveButton(index) {
        buttons.forEach(({ buttonId, imageSrc, hoverSrc }) => {
            const button = document.getElementById(buttonId);
            button.classList.remove("active")
        });
        const button = document.getElementById(buttons[index].buttonId);
        button.classList.add("active");
        img.src = buttons[index].imageSrc;
        currentIndex = index;
    }
    for (let i = 0; i < buttons.length; i++) {
        const button = document.getElementById(buttons[i].buttonId);
        button.addEventListener("click", () => {
            setActiveButton(i);
        });
    }
    img.addEventListener("mouseenter", () => {
        img.src = buttons[currentIndex].hoverSrc;
    });
    img.addEventListener("mouseleave", () => {
        img.src = buttons[currentIndex].imageSrc;
    });
    setActiveButton(0);
}

function setupButtonDivSwitcher(buttons, hoverElementId, targetElementId, insiderElementId) {
    const hoverElement = document.getElementById(hoverElementId);
    const targetElement = document.getElementById(targetElementId);
    const indiderElement = document.getElementById(insiderElementId);
    
    //if (!hoverElement || !targetElement) return;

    let activeIndex = 0;

    function setActiveButton(index) {
        buttons.forEach(({ buttonId }) => {
            const button = document.getElementById(buttonId);
            button.classList.remove("active");
        });

        const button = document.getElementById(buttons[index].buttonId);
        button.classList.add("active");
        activeIndex = index;

        if (typeof buttons[index].functionCall === "function") {
            buttons[index].functionCall();
        }
    }

    buttons.forEach((btn, i) => {
        const button = document.getElementById(btn.buttonId);
        button.addEventListener("click", () => {
            setActiveButton(i);
        });
    });

    indiderElement.addEventListener("mouseenter", () => {
        hoverElement.style.display = "none";
        targetElement.style.display = "block";
    });

    indiderElement.addEventListener("mouseleave", () => {
        targetElement.style.display = "none";
        hoverElement.style.display = "block";
    });

    setActiveButton(0);
}