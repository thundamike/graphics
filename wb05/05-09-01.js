// @ts-check
export {};  // null statement to tell VSCode we're doing a module

// recreate the picture from SVG - but don't use quadratics

let canvas = document.getElementById("canvas1");
if (!(canvas instanceof HTMLCanvasElement))
    throw new Error("Canvas is not HTML Element");
let context = canvas.getContext('2d');

// segment 1
context.moveTo(150,100);
context.bezierCurveTo(150,133.33, 133.33,150, 100,150);

// segment 2
context.bezierCurveTo(66.66,150, 50,133.33, 50,100);

// segment 3
context.bezierCurveTo(50,66.66, 66.66,50, 100,50);

// segment 4
context.bezierCurveTo(100,83.33, 116.66,100, 150,100);
context.closePath();

// fill shape
context.fillStyle = "#CCC";
context.strokeStyle = "black";
context.lineWidth = 10;
context.stroke();
context.fill();


