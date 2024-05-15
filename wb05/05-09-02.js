// @ts-check
export {};  // null statement to tell VSCode we're doing a module

// draw a picture using curves!

let canvas = document.getElementById("canvas1");
if (!(canvas instanceof HTMLCanvasElement))
    throw new Error("Canvas is not HTML Element");

let context = canvas.getContext('2d');
context?.moveTo(100,200);
context?.bezierCurveTo(100,100, 300,100, 300,200);
context?.bezierCurveTo(300,300, 250,300, 250,250);
context?.bezierCurveTo(250,290, 220,300, 220,250);
context?.bezierCurveTo(220,290, 190,300, 190,250);
context?.bezierCurveTo(190,290, 160,300, 160,250);
context?.bezierCurveTo(160,290, 130,300, 130,250);
context?.bezierCurveTo(130,300, 90,300, 100,200);

context.fillStyle = "pink"
context?.stroke();
context?.fill();
