// JavaScript file to be filled in by the student for Box 4-1
// we'll give you something to get started...

// you should start by getting the canvas

// then draw the 4 shapes
export{}

/** @type {HTMLCanvasElement} */
let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas1"));
let context = canvas.getContext('2d');

/** draw the circle */
const circ = new Path2D();
circ.arc(50, 50, 30, 0, 2*Math.PI);
context.fillStyle = "#F8E";
context.strokeStyle = "#846";
context.lineWidth = 5;
context.fill(circ);
context.stroke(circ);

/** draw the capsule */
const cap = new Path2D();
cap.arc(150, 50, 30, 3*Math.PI/2, Math.PI/2, true)
cap.lineTo(200,80)
cap.arc(200, 50, 30, Math.PI/2, 3*Math.PI/2, true)
cap.lineTo(150,20)
context.fillStyle = "lightpink"
context.strokeStyle = "darkred"
context.fill(cap)
context.stroke(cap)

/** draw the triangle */
const tri = new Path2D();
tri.moveTo(20, 150);
tri.lineTo(80, 150);
tri.lineTo(50, 110);
tri.closePath();
context.fillStyle = "sandybrown";
context.strokeStyle = "darkgoldenrod";
context.fill(tri);
context.stroke(tri);

/** draw the sawtooth */;
const saw = new Path2D();
saw.moveTo(120, 150);
saw.lineTo(230,150);
saw.lineTo(230,122.5);
saw.lineTo(202.5,95);
saw.lineTo(175, 122.5);
saw.lineTo(147.5, 95);
saw.lineTo(120, 122.5);
saw.closePath();
context.strokeStyle = "black";
context.fillStyle = "gray";
context.fill(saw);
context.stroke(saw);


context.translate(100,100);
context.moveTo(50,0);
for(let i=0; i<1; i++) {
    //context.rotate(Math.PI/2);
    context.fillRect(50,0,5,10);
}
context.closePath();
context.fill();