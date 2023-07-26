let slider = document.getElementById("myRange");
let output = document.getElementById("grid-size-text");
let grid = document.getElementById("grid");
let div = document.createElement("div");
let mouseDown = false;

let clearButton = document.getElementById("clearButton");
let eraserButton = document.getElementById("eraserButton");
let colorPicker = document.getElementById("colorPicker");
let colorPickerValue = "rgb(0, 0, 0)";
let colorMode = document.getElementById("colorMode");
let rainbowMode = document.getElementById("rainbowMode");
let colorPickerContainer = document.getElementById("colorPickerContainer");
let checkBox = document.getElementById("checkBox");

let isRainbowMode = false;
let isColorMode = false;
let isGridActivated = false;

document.body.onmousedown = () => mouseDown = true;
document.body.onmouseup = () => mouseDown = false; 

slider.step = "16";
slider.value = "16";
slider.max = "64";

clearButton.addEventListener("click", CreateGrid);
eraserButton.addEventListener("click", Eraser);
colorPicker.addEventListener("change", ColorPicker);
colorPickerContainer.addEventListener("change", ChangePickerBackgroundColor);
colorMode.addEventListener("click", ColorPicker);
rainbowMode.addEventListener("click", RainbowMode);
checkBox.addEventListener("click", CheckBox);

output.textContent = `${slider.value} x ${slider.value}`;


CreateGrid();

slider.oninput = () =>
{
    grid = document.getElementById("grid");
    grid.style.gridTemplateColumns = `repeat(${slider.value}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${slider.value}, 1fr)`;

    CreateGrid();

    output.textContent = `${slider.value} x ${slider.value}`;
}

function SetElementColor(e) 
{
    if(e.type === "mouseover" && !mouseDown)
    {
        return;
    }
    else if(isRainbowMode)
    {
        colorPickerValue = `rgb(${getRandomInt(255)},${getRandomInt(255)},${getRandomInt(255)})`;
        colorPickerContainer.style.backgroundColor = colorPickerValue;
        e.target.style.backgroundColor = colorPickerValue;
    }
    else if(isColorMode)
    {
        colorPickerContainer.style.backgroundColor = colorPickerValue;
        e.target.style.backgroundColor = colorPickerValue;
    }
}

function CreateGrid() 
{
    while(grid.firstChild)
    {
        grid.replaceChildren();
    }

    for (let i = 0; i < slider.value; i++) 
    {
        for (let j = 0; j < slider.value; j++) 
        {
            div = document.createElement("div");
            if (isGridActivated) 
            {
                div.classList = "element";     
            }
            div.addEventListener("mousedown", SetElementColor)
            div.addEventListener("mouseover", SetElementColor)
            grid.appendChild(div);   
        }  
    } 
}

function Eraser() 
{
    colorPickerValue = "rgb(255,255,255)";
    isColorMode = false;
    isRainbowMode = false;
}

function ColorPicker() 
{
    colorPickerValue = document.getElementById("colorPicker").value;
    isColorMode = true;
    isRainbowMode = false;
}

function RainbowMode() 
{
    isRainbowMode = true;
    isColorMode = false;
}

function getRandomInt(max) 
{
    return Math.floor(Math.random() * max);
}

function ChangePickerBackgroundColor() 
{
    colorPickerContainer.style.backgroundColor = colorPickerValue;    
}

function CheckBox() 
{
    isGridActivated = !isGridActivated;   
    CreateGrid();
}