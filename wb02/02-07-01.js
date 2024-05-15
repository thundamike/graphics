/**
 * Starter file for 02-07-01.js - the only exercise of page 7 of Workbook 2
 */

// @ts-check

// Find the canvas and start!
export{}
let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("box1canvas"))
let context = canvas.getContext('2d')
let mouseX = -10
let mouseY = -10
let rad = 7
let circs = []

canvas.onmousemove = function(event) {
    let box = /** @type {HTMLCanvasElement} */ (event.target).getBoundingClientRect()
    mouseX = event.clientX - box.left
    mouseY = event.clientY - box.top
}

canvas.onmouseleave = function() {
    mouseX = -10
    mouseY = -10
}

canvas.onclick = function(event) {
    // do a check to see if the click is over a dot
    let over_dot = false
    circs.forEach(function(circ) {
        if ( ((mouseX-circ.x)**2 + (mouseY-circ.y)**2)**0.5 < rad ) {
            over_dot = true
            circ.clicked = true
        } 
    })
    const mx = mouseX
    const my = mouseY
    if (!over_dot) circs.push({"x": mx, "y": my, "clicked": false})
}

function animate() {
    context.clearRect(0,0,canvas.width,canvas.height)
    circs.forEach(function(circ) {
        let mouse_over = false
        if ( ((mouseX-circ.x)**2 + (mouseY-circ.y)**2)**0.5 < rad ) {
            mouse_over = true
        } 
        let dot = new Path2D() 
        dot.arc(circ.x, circ.y, rad, 0, 2*Math.PI)
        if (circ.clicked) {
            context.fillStyle = mouse_over? "#953553FF": "#FF00FFFF"
        }
        else {
            context.fillStyle = mouse_over? "#FF0000FF": "#00000044"
        }
        context.fill(dot)
    })
    window.requestAnimationFrame(animate)
}
animate()