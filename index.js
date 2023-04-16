let container = document.querySelector(".container"); // - selects the HTML element with the class name "container" and stores it in the container variable
let gridButton = document.getElementById("submit-grid"); // - selects the HTML element with the ID "submit-grid" and stores it in the gridButton variable
let clearGridButton = document.getElementById("clear-grid"); //- selects the HTML element with the ID "clear-grid" and stores it in the clearGridButton variable
let gridWidth = document.getElementById("width-range"); //- selects the HTML element with the ID "width-range" and stores it in the gridWidth variable.
let gridHeight = document.getElementById("height-range"); // - selects the HTML element with the ID "height-range" and stores it in the gridHeight variable.
let colorButton = document.getElementById("color-input"); //- selects the HTML element with the ID "color-input" and stores it in the colorButton variable.
let eraseBtn = document.getElementById("erase-btn"); // - selects the HTML element with the ID "erase-btn" and stores it in the eraseBtn variable.
let paintBtn = document.getElementById("paint-btn"); //- selects the HTML element with the ID "paint-btn" and stores it in the paintBtn variable.
let widthValue = document.getElementById("width-value"); // - selects the HTML element with the ID "width-value" and stores it in the widthValue variable.
let heightValue = document.getElementById("height-value"); //- selects the HTML element with the ID "height-value" and stores it in the heightValue variable.

//In summary, this code selects and stores references to various HTML elements that are likely part of a grid-based drawing application, 
//such as buttons to submit and clear the grid, sliders to adjust the grid width and height, and buttons to toggle between painting and erasing modes.



let events = { //- initializes a new object named events.
    mouse: {//-creates a sub-object named mouse within the events object.
        down: "mousedown", //- defines a string value of "mousedown" for the down property within the mouse sub-object.
        move: "mousemove", //- - defines a string value of "mousemove" for the move property within the mouse sub-object.
        up: "mouseup" //- defines a string value of "mouseup" for the up property within the mouse sub-object.
    }, //- ends the mouse sub-objec
    touch: { // - creates a sub-object named touch within the events object.
        down: "touchstart", //- defines a string value of "touchstart" for the down property within the touch sub-object.
        mobe: "touchmove", //-- defines a string value of "touchmove" for the move property within the touch sub-object.
        up: "touchend", // - defines a string value of "touchend" for the up property within the touch sub-object.
    },//- ends the touch sub-object.
};// - ends the events object.

let deviceType = ""; // - initializes a new variable named deviceType and assigns an empty string ("") as its initial value.s likely used to store information about the type of device being used (e.g., desktop, tablet, mobile).

let draw = false;
let erase = false;

const isTouchDevice = () => { //- defines a new function named isTouchDevice using an arrow function syntax.
    try { // - starts a try block to attempt to create a new TouchEvent object.
        document.createEvent("TouchEvent"); //- attempts to create a new TouchEvent object.
        deviceType = "touch"; //- if the TouchEvent object is created successfully, sets the value of deviceType variable to "touch".
        return true; //-if the TouchEvent object is created successfully, returns true to indicate that the device supports touch input.
    } catch (e) { //- if creating a TouchEvent object throws an error, starts a catch block.
        deviceType = "mouse"; //- sets the value of deviceType variable to "mouse"
        return false; //- returns false to indicate that the device does not support touch input.
    }
};

isTouchDevice(); //-Then, the function isTouchDevice is called to determine whether the user's device supports touch input. If the device supports touch input, the value of deviceType will be set to "touch", and the function will return true. If the device does not support touch input, the value of deviceType will be set to "mouse", and the function will return false.

gridButton.addEventListener("click", () => { //- sets up an event listener on the gridButton element that listens for a "click" event and executes an anonymous arrow function when the event is triggered.
    container.innerHTML = ""; //-- clears the HTML contents of the container element
    let count = 0; //-itializes a new variable named count and sets its initial value to 0.
    for (let i = 0; i < gridHeight.value; i++) {
        count += 2;
        let div = document.createElement("div");
        div.classList.add("gridRow");

        for (let j = 0; j < gridWidth.value; j++) {
            count += 2;
            let col = document.createElement("div");
            col.classList.add("gridCol");
            col.setAttribute("id", `gridCol${count}`);
            col.addEventListener(events[deviceType].down, () => {
                draw = true;
                if (erase) {
                    col.style.backgroundColor = "transparent";
                } else {
                    col.style.backgroundColor = colorButton.value;
                }
            });

            col.addEventListener(events[deviceType].move, (e) => {
                let elementId = document.elementFromPoint(
                    !isTouchDevice() ? e.clientX : e.touches[0].clientX,
                    !isTouchDevice() ? e.clientY : e.touches[0].clientY,
                ).id;
                checker(elementId);
            });

            col.addEventListener(events[deviceType].up, () => {
                draw = false;
            });

            div.appendChild(col);

        }

        container.appendChild(div);

    }
});

function checker(elementId) {
    let gridColumns = document.querySelectorAll(".gridCol");
    gridColumns.forEach((element) => {
        if (elementId == element.id) {
            if (draw && !erase) {
                element.style.backgroundColor = colorButton.value;
            } else if (draw && erase) {
                element.style.backgroundColor = "transparent";
            }
        }
    });
}

clearGridButton.addEventListener("click", () => {
    container.innerHTML = "";
});

eraseBtn.addEventListener("click", () => {
    erase = true;
});

paintBtn.addEventListener("click", () => {
    erase = false;
});

gridWidth.addEventListener("input", () => {
    widthValue.innerHTML = gridWidth.value < 9 ? `0${gridWidth.value}` : gridWidth.value;
});

gridHeight.addEventListener("input", () => {
    heightValue.innerHTML = gridHeight.value < 9 ? `0${gridHeight.value}` : gridHeight.value;
});

window.onload = () => {
    gridHeight.value = 0;
    gridWidth.value = 0;
};