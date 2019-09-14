let penMode = "";
let colour = "";
//Choose Pen
function choosePen(type){
    penMode = type;
    return penMode;
}
//Choose Ink
function chooseInk(inkChoice){
    colour = inkChoice;
    return colour;
}
//Highlight Ink Buttons
var btnContainer = document.getElementById("inks");
var btns = btnContainer.getElementsByClassName("ink");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("active-ink");
      current[0].className = current[0].className.replace(" active-ink", "");
      this.className += " active-ink";
    });
  }
//Highlight Pen Buttons
var btnContainer = document.getElementById("pens");
var btns = btnContainer.getElementsByClassName("pen");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("active-pen");
      current[0].className = current[0].className.replace(" active-pen", "");
      this.className += " active-pen";
    });
  }
// Create Grid
function makeCanvas(){
    var div = document.createElement("div");
    div.id = "canvas";
    document.getElementById("container").appendChild(div);
}
function createGrid(x,penType){
    makeCanvas();
    var gridWidth = x;
    //var penColour = penType;
    var squares = gridWidth*gridWidth;
    var squareWidth = ((document.getElementById("container").clientHeight) / gridWidth + "px");
    var rowWidth = document.getElementById("container").clientHeight + "px";
    function makeGrid(x,y){
        for (let i = 1; i <= x; i++) {
            let rowNum = "row"+y;
            var cellRef = y + "_" + i;
            var div = document.createElement("div");
            div.id = cellRef;
            div.style.width = squareWidth;
            div.style.height = squareWidth;
            div.className = "cell";
            div.style.display = "inline-block";
            div.style.opacity = 0;
            document.getElementById(rowNum).appendChild(div);
        }
    }
    function makeRow(x){
        for (let i = 1; i <= x; i++) {
            let rowNum = "row"+i;
            var div = document.createElement("div");
            div.style.display = "inline-block";
            div.id = rowNum;
            document.getElementById("canvas").appendChild(div);
            makeGrid(x,i);
        }      
    }
    makeRow(gridWidth);
    //Add Listener
    let cells = document.querySelectorAll("div.cell");
    cells.forEach(cell => {
    cell.addEventListener('mouseenter', () => {
        pen(cell);
    })
    });
    //Desplay Resolution
    var resolutionButton = document.getElementById("resolution");
    resolutionButton.textContent = gridWidth + " X " + gridWidth;
}        
//Pen
function pen(cell){
    let mode = penMode
    let ink = colour
    switch (mode){
        case "normal": 
            cell.style.backgroundColor = ink;
            cell.style.opacity = "1.0";
            break;
        case "shade":
            if ((cell.style.opacity == 1.0) && (cell.style.backgroundColor != ink)){
                cell.style.backgroundColor = ink;
                cell.style.opacity = 0.1;
            } else {
                cell.style.opacity = parseFloat(cell.style.opacity) + 0.1; 
                cell.style.backgroundColor = ink;
            }
            break;
        case "colourful":
            cell.style.backgroundColor = getRandomRgb();
            cell.style.opacity =  "1.0";
            break;
        case "erase":
            cell.style.backgroundColor = "rgb(255, 255, 255)";
            cell.style.opacity =  "0.0";
            break;
    } 
}
//Random RGB Color
function getRandomRgb() {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }
//Reset canvas
function reset() {
    let cells = document.querySelectorAll(".cell");
    let count = cells.length;
    for (let i = 0; i < count; i++) {
        cells[i].style.backgroundColor = "rgb(255, 255, 255)"
        cells[i].style.opacity =  0.0;
    }   
}     
//Change resolution
function resize() {
    var e = document.querySelector('#canvas');
    e.parentNode.removeChild(e)
    let x = prompt("How many squares across?");
    createGrid(x);
}        
createGrid(16); 
choosePen("normal");