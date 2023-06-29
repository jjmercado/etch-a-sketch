let slider = document.getElementById("myRange");
let output = document.getElementById("grid-size-text");
let grid = document.getElementById("grid");
let div = document.createElement("div");

slider.step = "16";
slider.value = "16";
slider.max = "64";

output.textContent = `${slider.value} x ${slider.value}`;


for (let i = 0; i < slider.value; i++) 
{
    for (let j = 0; j < slider.value; j++) 
    {
        div = document.createElement("div");
        div.classList = "element";
        grid.appendChild(div);   
    }  
}

slider.oninput = () =>
{
    grid = document.getElementById("grid");
    grid.style.gridTemplateColumns = `repeat(${slider.value}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${slider.value}, 1fr)`;


    while(grid.firstChild)
    {
        grid.replaceChildren();
    }
    
        
    for (let i = 0; i < slider.value; i++) 
    {
        for (let j = 0; j < slider.value; j++) 
        {
            div = document.createElement("div");
            div.classList = "element";
            grid.appendChild(div);   
        }  
    } 

    output.textContent = `${slider.value} x ${slider.value}`;
}
