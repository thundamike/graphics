/**
 * CS559 Spring 2023 Example Solution
 * Written by CS559 course staff
 */

// @ts-check
/* jshint -W069, esversion:6 */

import { runCanvas } from "../libs/CS559/runCanvas.js";

/* no need for onload - we use defer */

/* note how the draw function takes two arguments: the canvas and the time */
/* note that this is DIFFERENT than what we need for requestAnimationFrame */

/**
 * These parameter specifications are used by the type checker to find bugs!
 * @param {HTMLCanvasElement} canvas 
 * @param {Number} time 
 */
function myDraw(canvas, time) {
    let context = canvas.getContext('2d');
    context.clearRect(0,0,canvas.width,canvas.height);
    context.save();
    context.translate(100,100);
    context.rotate((time-1)*2*Math.PI);
    context.fillRect(0,0,30,30);
    context.restore();
}

// note - we can pass "runCanvas" either the name of the canvas, or the canvas element
runCanvas("canvas1",
myDraw, 
1,
false,
0, 
2,
0.04);

