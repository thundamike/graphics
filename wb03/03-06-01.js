// @ts-check
export {};

// somewhere in your program you'll want a line
// that looks like:
const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas1"));
document.addEventListener('keydown', KeyPressed);
document.addEventListener('keyup', KeyUp);
let box = canvas.getBoundingClientRect();
const context = canvas.getContext('2d');
context.translate(box.left, box.top);
let width = 50;
let height = 70;
let bladeLength = 60;
let bladeWidth = 10;
let r = bladeWidth/2+3*height/16;
let x = 100;
let y = 70;
let vx = 0;
let vy = 0;
let accel = 1/4000;  // want acceleration to be ~1 units/s^2

function drawPropeller(context, xtrans, ytrans, rot) {
    context.translate(xtrans, ytrans);
        let holder1 = new Path2D();
        holder1.arc(0, 0, r, 0, 2*Math.PI);
        context.stroke(holder1);
        context.rotate(rot)
        let p1 = new Path2D();
        p1.moveTo(-r/3,-bladeWidth/2)
        p1.lineTo(0, -r)
        p1.lineTo(r/3, -bladeWidth/2);
        p1.lineTo(r/3, bladeWidth/2);
        p1.lineTo(0,r);
        p1.lineTo(-r/3, bladeWidth/2);
        p1.lineTo(-r/3, -bladeWidth/2);
        context.fill(p1);
    context.restore();
}

function drawQuad(context, rot) {
    // define propeller speeds
    let a1 = rot*7;
    let a2 = rot*14;
    let a3 = rot*8;
    let a4 = rot*16;

    // draw the body
    context.fillStyle = "lightgrey"
    context.fillRect(0,0,width, height);
    context.moveTo(-width/2, -height/2);
    let topArc = new Path2D();
    topArc.arc(width/2, 0, width/2, 0, Math.PI, true);
    context.fillStyle = "lightblue";
    context.fill(topArc);
    context.moveTo(-width/2, height/2);
    let botArc = new Path2D();
    botArc.arc(width/2, height, width/2, 0, Math.PI, false);
    context.fill(botArc);
    context.moveTo(0, 0);
    context.fillStyle = "lightgrey";

    // draw wings
    context.fillRect(width, height/8, bladeLength, bladeWidth);
    context.fillRect(width, 3*height/4, bladeLength, bladeWidth);
    context.fillRect(0, height/8, -bladeLength, bladeWidth)
    context.fillRect(0, 3*height/4, -bladeLength, bladeWidth)
    context.fillStyle = "goldenrod";
    context.save();

    // draw propellers
    drawPropeller(context, width+3*bladeLength/4, height/8+bladeWidth/2, a1);
    context.save();
    drawPropeller(context, width+3*bladeLength/4, 3*height/4+bladeWidth/2, a2);
    context.save();
    drawPropeller(context, -3*bladeLength/4, 3*height/4+bladeWidth/2, a3);
    context.save();
    drawPropeller(context, -3*bladeLength/4, height/8+bladeWidth/2, a4);

}

function drawWing(context, startX, startY, dir) {
    
    let wing = new Path2D();
    wing.moveTo(startX, startY);
    if (dir == 0) {
        // draw upwards wing
        wing.lineTo(startX-25, startY-40);
        wing.lineTo(startX-10, startY-40);
        wing.lineTo(startX+15, startY);
        wing.lineTo(startX, startY);
        context.fill(wing);
        context.stroke(wing);
    }

    if (dir == 1) {
        // draw downwards wing
        wing.lineTo(startX-25, startY+40);
        wing.lineTo(startX-10, startY+40);
        wing.lineTo(startX+15, startY);
        wing.lineTo(startX, startY);
        context.fill(wing);
        context.stroke(wing);
    }
}

function KeyPressed(KeyboardEvent) {
    if (KeyboardEvent.key == "d") {
        vx += accel;
    }
    if (KeyboardEvent.key == "a") {
        vx -= accel;
    }
    if (KeyboardEvent.key == "w") {
        vy -= accel;
    }
    if (KeyboardEvent.key == "s") {
        vy += accel;
    }
}

function KeyUp(KeyboardEvent) {
    if (KeyboardEvent.key == "d") {
        vx = 0;
    }
    if (KeyboardEvent.key == "a") {
        vx = 0;
    }
    if (KeyboardEvent.key == "w") {
        vy = 0;
    }
    if (KeyboardEvent.key == "s") {
        vy = 0;
    }
}


/**
* @param {DOMHighResTimeStamp} delta 
*/
function drawQuad2(context, rot, delta) {
    // define propeller speed
    let a = rot*7;
    x = Math.abs((x + vx*delta)) % 600;
    y = Math.abs((y + vy*delta)) % 600;

    // draw the body
    context.fillStyle = "lightgreen";
    context.save();

    context.translate(x, y);
    let theta = Math.atan((y-70)/(x-100));
    context.rotate(theta);

    let plane = new Path2D();
    plane.moveTo(0,-r);
    plane.lineTo(50, -r);
    plane.lineTo(60, 0);
    plane.lineTo(50, r);
    plane.lineTo(-50, r);
    plane.lineTo(-60, 0);
    plane.lineTo(-50, -r);
    plane.closePath();
    drawWing(context, 10, -r, 0);
    drawWing(context, -30, -r, 0);
    drawWing(context, 10, r, 1);
    drawWing(context, -30, r, 1);

    context.fill(plane);
    context.stroke(plane);
    context.save();
    context.fillStyle = "blue"
    // draw propeller
    drawPropeller(context, 0, 0, a);
    context.restore();
   
}

// and you will want to make an animation loop with something like:
/**
 * the animation loop gets a timestamp from requestAnimationFrame
 * 
 * @param {DOMHighResTimeStamp} timestamp 
 */
function loop(timestamp) {
    let lasttime = 0;
    let delta = timestamp-lasttime;

    context.clearRect(0, 0, canvas.width, canvas.height);
    let a = timestamp/(300*2*Math.PI)
    // set the center of the entire moving coordinate system each time, so that it
    // follows a loop about the center of the canvas 
    context.save()
    context.translate(canvas.width/2 + canvas.width/4*Math.cos(a), 
                      canvas.height/2 + canvas.height/4*Math.sin(a));
    context.rotate(a);
    drawQuad(context, a);
    context.restore()
    drawQuad2(context, a, delta);

    lasttime = timestamp;
    window.requestAnimationFrame(loop);
}


// and then you would start the loop with:
window.requestAnimationFrame(loop);