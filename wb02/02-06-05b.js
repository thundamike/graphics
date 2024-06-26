// @ts-check
export {};

/**
 * The more fun example
 */
let canvasf = /** @type {HTMLCanvasElement} */ (document.getElementById("funbox"));
let contextf = canvasf.getContext('2d');

// keep a list of squares, each with a position (x,y), a size (radius)
// and a velocity (vx,vy)
let boxfdots = [];

// we want to know where the mouse is, but we only find out on movement events!
// so we'll keep some state
let mouseXf = -10;
let mouseYf = -10;
let mouseDf = 0;

// when the mouse moves in the canvas, remember where it moves to
canvasf.onmousemove = function(event) {
    mouseXf = event.clientX;
    mouseYf = event.clientY;
    // unfortunately, X,Y is relative to the overall window -
    // we need the X,Y inside the canvas!
    // we know that event.target is a HTMLCanvasElement, so tell typescript
    let box = /** @type {HTMLCanvasElement} */ (event.target).getBoundingClientRect();
    mouseXf -= box.left;
    mouseYf -= box.top;
};
// if the mouse moves outside the canvas, give an outside value
canvasf.onmouseleave = function() {
    mouseXf = -10;
    mouseYf = -10;
    mouseDf = 0;
};
canvasf.onmousedown = function() { mouseDf=1; };
canvasf.onmouseup = function() { mouseDf=0; };

function animate() {
    // clear the canvas
    contextf.clearRect(0,0,canvasf.width,canvasf.height);
    // figure out where the mouse is
    // that's handled outside
    // if we're inside the canvas, then we'll make a dot
    if ( (mouseXf > 0) && (mouseYf > 0) ) {
        let vx = (Math.random()-0.5)*5;
        let vy = (Math.random()-0.5)*5;
        boxfdots.push({"x":mouseXf,"y":mouseYf, "s":mouseDf?7:3,
                        "vx":vx, "vy":vy,
                        "color": mouseDf?"#FF888888":"#8888FF88"});
    }
    // move all the dots
    boxfdots.forEach(function(dot){
        dot.y -= dot.vy;
        dot.x -= dot.vx;
    });
    // remove dots that have gone off the screen
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    boxfdots = boxfdots.filter(
        // this defines a function using "arrow notation"
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
        dot => ((dot.y>0)&&(dot.x>0)&&(dot.x<canvasf.width)&&(dot.y<canvasf.height))
        );

    // draw all of the dots
    boxfdots.forEach(function(dot){
        contextf.fillStyle = dot.color;
        let w = dot.s*2;
        contextf.fillRect(dot.x-dot.s,dot.y-dot.s,w,w);
    });
    window.requestAnimationFrame(animate);
}
animate();


