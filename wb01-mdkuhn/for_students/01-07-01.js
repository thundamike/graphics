/** @type{HTMLInputElement} */ let text = (/** @type{HTMLInputElement} */ document.getElementById("ex3-span"));

let lasttime;  // time
let red_val = 0;
let green_val = 255;
let toYellow = true;
let toRed = false;
let toGreen = false;

function advanceColor(timestamp) {
    
    if ( !(lasttime === undefined) ) {
    const delta = ((timestamp - lasttime) / 1000) * 255;
    
    /* case: movement towards yellow */
    if (toYellow) {
        // we are coming from green, add red to get yellow
        if (red_val + delta < 255) red_val += delta;

        // go to red
        else {
            toRed = true;
            toYellow = false;
        }
    }

    /* case: movement towards red */
    else if (toRed) { 
        // we are coming from yellow, remove green
        if (green_val - delta > 0) green_val -= delta;
        
        // go to green
        else {
            toGreen = true;
            toRed = false;
        }
    }

    /* case: movement towards green */
    else {
        // we are coming from red
        if (green_val + delta < 255) {
            green_val += delta;
            red_val -= delta;
        }
        // go to yellow
        else {
            toYellow = true;
            toGreen = false;
        }
    }

    let red = red_val.toString(16).split('.')[0].padStart(2, '0');
    let green = green_val.toString(16).split('.')[0].padStart(2, '0');
    text.style.backgroundColor = "#" + red + green + "00";
    }
    lasttime = timestamp;      // remember the last update
    window.requestAnimationFrame(advanceColor);
}
advanceColor();

