/**
 * 04-05-01.js - a simple JavaScript file that gets loaded with
 * page 5 of Workbook 4 (CS559).
 *
 * written by Michael Gleicher, January 2019
 * modified January 2020, February 2021
 *
 */

/**
 * If you want to read up on JavaScript classes, 
 * see the tutorial on the class website:
 * 
 * https://cs559.github.io/559Tutorials/javascript/oop-in-js-1/
 */
class Boid {
    /**
     * 
     * @param {number} x    - initial X position
     * @param {number} y    - initial Y position
     * @param {number} vx   - initial X velocity
     * @param {number} vy   - initial Y velocity
     */
    constructor(x, y, vx, vy, color, starttime,) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.starttime = starttime;
        this.color = color;
    }
    /**
     * Draw the Boid
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        context.save();
        context.translate(this.x, this.y);
        context.fillStyle = this.color;
        let body = new Path2D();
        body.lineTo(this.x, this.y+10);
        body.lineTo(this.x+20, this.y+5);
        body.lineTo(this.x, this.y)
        context.fill(body);
        context.restore();
    }
    /**
     * Perform the "steering" behavior -
     * This function should update the velocity based on the other
     * members of the flock.
     * It is passed the entire flock (an array of Boids) - that includes
     * "this"!
     * Note: dealing with the boundaries does not need to be handled here
     * (in fact it can't be, since there is no awareness of the canvas)
     * *
     * And remember, (vx,vy) should always be a unit vector!
     * @param {Array<Boid>} flock 
     */
    steer(flock, followMouse) {
        /*
		// Note - this sample behavior is just to help you understand
		// what a steering function might  do
		// all this one does is have things go in circles, rather than
		// straight lines
		// Something this simple would not count for the advanced points:
		// a "real" steering behavior must consider other boids,
		// or at least obstacles.
		
        // a simple steering behavior: 
        // create a rotation matrix that turns by a small amount
        // 2 degrees per time step
        const angle = 2 * Math.PI / 180;
        const s = Math.sin(angle);
        const c = Math.cos(angle);

        let ovx = this.vx;
        let ovy = this.vy;

        this.vx =  ovx * c + ovy * s;
        this.vy = -ovx * s + ovy * c;
		*/
        if (followMouse) {
            flock.forEach(function(boid) {
                if (mouseX > 0 && mouseY > 0) {
                    let theta = Math.atan2(mouseY-boid.y, mouseX-boid.x);
                    let vx = Math.cos(theta);
                    let vy = Math.sin(theta);

                    let xflip = (vx / (mouseX-boid.x)) > 0 ? 1 : -1;
                    let yflip = (vy / (mouseY-boid.y)) > 0 ? 1 : -1;
                    boid.vx = vx*xflip;
                    boid.vy = vy*yflip;
                }
            });
        }
    }
}


/** the actual main program
 * this used to be inside of a function definition that window.onload
 * was set to - however, now we use defer for loading
 */

 /** @type Array<Boid> */
let boids = [];

let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("flock"));
let context = canvas.getContext("2d");
let speedSlider = /** @type {HTMLInputElement} */ (document.getElementById("speed"));
let box = canvas.getBoundingClientRect();
let mouseX = 0;
let mouseY = 0;

canvas.onmousemove = function(event) {
    mouseX = event.clientX - box.left;
    mouseY = event.clientX - box.top;
    boids.forEach(boid => boid.steer(boids, true));
}

canvas.onmouseleave = function(event) {
    mouseX = 0;
    mouseY = 0;
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(250,250,50,100);
    boids.forEach(boid => boid.draw(context));
}

/**
 * Handle the buttons
 */
document.getElementById("add").onclick = function () {
    for (let i = 0; i < 10; i++) {
        // setup initial conditions of boid
        let x = Math.random()*canvas.width/2;
        let y = Math.random()*canvas.height/2;
        let vx = Math.random()*2 - 1;
        let vy = Math.sqrt(1 - Math.pow(vx,2)) * (Math.round(Math.random())*2-1);
        let color = "blue";
        boids.push(new Boid(x, y, vx, vy, color, 0, 0));
    }
}

document.getElementById("clear").onclick = function () {
    // clear boids array
    boids.length = 0;
};

let lastTime; // will be undefined by default
/**
 * The Actual Execution
 */
function loop(timestamp) {
    // time step - convert to 1/60th of a second frames
    // 1000ms / 60fps
    const delta = (lastTime ? timestamp-lastTime : 0) * 1000.0/60.0;

    // change directions
    boids.forEach(boid => boid.steer(boids, false));
    // move forward
    let speed = Number(speedSlider.value);
    // handle collisions
    boids.forEach(function(boid) {
        // handle collision with other boids
        // for (let i = 0; i < boids.length; i++) {
        //     if (!(i = boids.indexOf(boid))) {
        //         if (Math.abs(boid.x - boids[i].x) < 20) {
        //             boid.vx *= -1;
        //             //boid.color = "green"
        //             //boid.starttime = timestamp;
        //             boids[i].vx *= -1;
        //             //boids[i].color = "green";
        //             //boids[i].starttime = timestamp;
        //         }
        //         else if (Math.abs(boid.y - boids[i].y) < 10) {
        //             boid.vy *= -1;
        //             //boid.color = "green"
        //             //boid.starttime = timestamp;
        //             boids[i].vx *= -1;
        //             //boids[i].color = "green";
        //             //boids[i].starttime = timestamp;
        //         }
        //     }   
        // }

        // change boid back to original color after collision
        if (boid.starttime != 0 && timestamp-boid.starttime > 200) {
            boid.starttime = 0;
            boid.color = "blue";
        }

        let futureX = boid.x + boid.vx * speed;
        let futureY = boid.y + boid.vy * speed;
        if ( futureX > canvas.width/2 || futureX < 0 ) {
            boid.starttime = timestamp;
            boid.color = "red"
            boid.vx *= -1;
        }
        if ( futureY > canvas.height/2 || futureY < 0 ) {
            boid.starttime = timestamp;
            boid.color = "red";
            boid.vy *= -1;
        }

        // check for collision with center obstacle
        if ( futureX > 125 && futureX < 150 && futureY > 125 && futureY < 175) {
            boid.starttime = timestamp;
            boid.color = "green"
            boid.vx *= -1;
            boid.vy *= -1;
        }
        
        boid.x += boid.vx * speed;
        boid.y += boid.vy * speed;
    });
    
    // now we can draw
    draw();
    // and loop
    window.requestAnimationFrame(loop);

}
// start the loop with the first iteration
window.requestAnimationFrame(loop);