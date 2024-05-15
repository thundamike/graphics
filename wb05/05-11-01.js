// @ts-check
export {};  // null statement to tell VSCode we're doing a module

// draw the spiral - account for the checkbox and slider

let canvas = (document.getElementById("canvas1"));
if (!(canvas instanceof HTMLCanvasElement))
    throw new Error("Canvas is not HTML Element");
let context = canvas.getContext("2d");
context.fillStyle = "#64bbf0";

let radius = 5;

let checkbox = /** @type {HTMLInputElement} */ (document.getElementById("check"));
checkbox.onclick = function() { 
    bezier.checked=false;
    draw();
 }

let bezier = /** @type {HTMLInputElement} */ (document.getElementById("bezier"));
bezier.onclick = function() { 
    checkbox.checked=false;
    if (!bezier.checked) context?.clearRect(0,0,canvas?.clientWidth, canvas?.clientHeight);
    else drawBezier();
 } 

let slider = /** @type {HTMLInputElement} */ (document.getElementById("slr"));
let val = 0;
slider.oninput = function() {
    val = parseInt(slider.value);
    if (bezier.checked) drawBezier();
    else draw()
}

function spiral(u) {
    return [200 + u*180*Math.cos(8*Math.PI*u), 
            200 + u*180*Math.sin(8*Math.PI*u)];
}

function draw() {
    context?.clearRect(0,0, canvas?.clientWidth, canvas?.clientHeight)
    let step = 1/val;
    context.lineWidth = 3;
    context.strokeStyle = "#FFAACC";
    for (let i = 0; i < 1; i+=step) {
        let points = spiral(i);
        let dot = new Path2D();
        dot.arc(points[0], points[1], radius, 0, 2*Math.PI);
        context.fill(dot);
        if (checkbox.checked && i < 1-step) {
            context?.beginPath();
            context.moveTo(points[0], points[1]);
            let nextPoint = spiral(i+step);
            context?.lineTo(nextPoint[0], nextPoint[1]);
            context?.stroke();
        }
    }
}

function drawBezier() {
    context?.clearRect(0,0,canvas?.clientWidth, canvas?.clientHeight);
    let step = 1/val;
    context?.moveTo(200,200);
    context.lineWidth = 4;
    context.strokeStyle = "#913831";
    for (let i = 0; i < 1-step; i+=step) {
        
        // draw point(s)
        let startPoints = spiral(i);
        let endPoints = spiral(i+step);
        if (i == 0) {
            let dot = new Path2D();
            dot.arc(startPoints[0], startPoints[1], radius, 0, 2*Math.PI);
            context.fill(dot);
        }
        
        let dot = new Path2D();
        dot.arc(endPoints[0], endPoints[1], radius, 0, 2*Math.PI);
        context.fill(dot);
        

        // derivative calculations
        let p0dx = 180*(Math.cos(8*i*Math.PI) - 8*i*Math.PI*Math.sin(8*i*Math.PI))*step;
        let p0dy = 180*(Math.sin(8*i*Math.PI) + 8*i*Math.PI*Math.cos(8*i*Math.PI))*step;
        let p1dx = 180*(Math.cos(8*(i+step)*Math.PI) - 8*(i+step)*Math.PI*Math.sin(8*(i+step)*Math.PI))*step;
        let p1dy = 180*(Math.sin(8*(i+step)*Math.PI) + 8*(i+step)*Math.PI*Math.cos(8*(i+step)*Math.PI))*step;

        // bezier curve
        context?.beginPath();
        context?.moveTo(startPoints[0], startPoints[1]);
        context?.bezierCurveTo(startPoints[0]+p0dx/3, startPoints[1]+p0dy/3, endPoints[0]-p1dx/3, endPoints[1]-p1dy/3, 
                                endPoints[0], endPoints[1]);
        context?.stroke();
    }
}






