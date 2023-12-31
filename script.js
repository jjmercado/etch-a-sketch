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
let isEraserMode = false;
let isGridActivated = false;

document.body.onmousedown = () => mouseDown = true;
document.body.onmouseup = () => mouseDown = false; 

slider.step = "16";
slider.value = "16";
slider.max = "64";

clearButton.addEventListener("click", CreateGrid);
clearButton.addEventListener("click", ChangeButtonColor);
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
    else if(isEraserMode)
    {
        colorPickerValue = "honeydew";
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
    isEraserMode = true;
    isColorMode = false;
    isRainbowMode = false;
    eraserButton.style.backgroundColor = "rgb(193, 209, 193)";
    eraserButton.style.color = "black";

    ChangeButtonColorOnClick(colorMode, rainbowMode, clearButton);
}

function ColorPicker() 
{
    colorPickerValue = document.getElementById("colorPicker").value;
    isColorMode = true;
    isRainbowMode = false;
    isEraserMode = false;
    colorMode.style.backgroundColor = "rgb(193, 209, 193)";
    colorMode.style.color = "black";

    ChangeButtonColorOnClick(eraserButton, rainbowMode, clearButton);
}

function RainbowMode() 
{
    isRainbowMode = true;
    isColorMode = false;
    isEraserMode = false;
    rainbowMode.style.backgroundColor = "rgb(193, 209, 193)";
    rainbowMode.style.color = "black";

    ChangeButtonColorOnClick(colorMode, eraserButton, clearButton);
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

function ChangeButtonColor() 
{
    clearButton.style.backgroundColor = "rgb(193, 209, 193)";
    clearButton.style.color = "black";

    ChangeButtonColorOnClick(colorMode, eraserButton, rainbowMode);
}

function ChangeButtonColorOnClick(button1, button2, button3) 
{
    buttons = [button1, button2, button3]

    buttons.forEach((button) =>
    {    
        button.style.backgroundColor = "rgb(85, 92, 85)";
        button.style.color = "white";
    }) 
}