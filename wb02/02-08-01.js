/**
 * Starter file for 02-08-01.js - the only exercise of page 8 of Workbook 2
 */

// @ts-check

// Find the canvas and start!
export{}
let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("box2canvas"))
let box = /** @type {HTMLCanvasElement} */ canvas.getBoundingClientRect()
let context = canvas.getContext('2d')
let mouseX = -10
let mouseY = -10
let colors = ["fuchsia","lightgreen", "navy", "crimson", "indigo", "ivory", "darkcyan", "#8B8000", "steelblue"]
let t = 1.5 // # s to reach target
let accel = 750 // acceleration in units/second
let fireworks = []
let boxes = []  // list for explosion object
let lasttime = 0
let rad = 6
let side = 4  // side length of explosion object

canvas.onmousemove = function(event) {
    mouseX = event.clientX - box.left
    mouseY = event.clientY - box.top
}

canvas.onclick = function(event) {
    let startX = Math.random()*box.width
    let startY = box.height
    const vx = (mouseX - startX)/t
    let vy = ( (mouseY - startY) - 0.5*accel*(t**2) ) / t
    let color_idx = Math.floor(Math.random() * colors.length)
    fireworks.push({"startX": startX, "x": startX, "y": startY, 
                    "targetX": mouseX, "targetY": mouseY, vx, "vy": vy,
                    "color": colors[color_idx]
                })
}

function animate(timestamp) {
    let delta = (timestamp - lasttime) / 1000
    // random firework generation
    let rand = Math.random()
    if (0.8 < rand && rand < 0.812) {
        let startX = Math.random()*600
        let startY = box.height
        let targetX = startX + Math.random()*(400-startX)
        let targetY = Math.random()*startY
        const vx = (targetX - startX)/t
        let vy = ( (targetY - startY) - 0.5*accel*(t**2) ) / t
        let color_idx = Math.floor(Math.random() * colors.length)
        fireworks.push({"startX": startX, "x": startX, "y": startY, 
                    "targetX": mouseX, "targetY": targetY, "vx": vx, "vy": vy,
                    "color": colors[color_idx]
                })
    }
    context.clearRect(0,0,canvas.width,canvas.height)
    if (!(lasttime === 0) ) {
        fireworks.forEach(function(firework) {
            if ( firework.vy > 0 && firework.y > firework.targetY) {
                // time for firework to blow up
                let new_col_idx = Math.floor(Math.random() * colors.length)
                for (let i = 0; i < 5; i++) {
                    // get the starting color
                    let c1 = Math.floor(Math.random()*255).toString(16)
                    let c2 = Math.floor(Math.random()*255).toString(16)
                    let c3 = Math.floor(Math.random()*255).toString(16)
                    let color = "#" + c1 + c2 + c3 + "FF"
                    boxes.push({"x": firework.x, "y": firework.y,
                    "vx": (Math.random()-0.5)*600, "vy": (Math.random()-0.5)*400,
                    "color": color, "fade":255})
                }
                let idx = fireworks.indexOf(firework)  
                fireworks.splice(idx, 1)
            }
            else {
                firework.y += firework.vy*delta
                firework.x += firework.vx*delta
                firework.vy += accel*delta
                let fire = new Path2D()
                fire.arc(firework.x, firework.y, rad, 0, 2*Math.PI)
                context.fillStyle = firework.color
                context.fill(fire)    
            }
        })
        boxes.forEach(function(dot) {
            if ( (dot.y < 0 || dot.y > box.height) || (dot.x < 0 || dot.x > box.width) || dot.fade < 0) {
                let idx = boxes.indexOf(dot)  
                boxes.splice(idx, 1)
            }
            else {
            dot.y += dot.vy*delta
            dot.x += dot.vx*delta
            context.fillStyle = dot.color.substring(0,7) + (dot.fade-3).toString(16)
            dot.fade -= 2
            context.fillRect(dot.x, dot.y, side, side)
            }
        })
    }
    lasttime = timestamp
    window.requestAnimationFrame(animate)
}
animate()

