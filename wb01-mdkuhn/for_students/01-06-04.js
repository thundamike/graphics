/** @type{HTMLInputElement} */ let text = (/** @type{HTMLInputElement} */ document.getElementById("ex3-span"));

let lasttime;  // time
let value = 0;
let color_val = 0;
let forwards = 1; // control for movement towards red and back towards white
function advanceColor(timestamp) {
    
    if ( !(lasttime === undefined) ) {
    const delta = ((timestamp - lasttime) / 1000) * 255;
    
    // case: movement towards red
    if (forwards == 1) {
        if (color_val + delta < 255) color_val = color_val + delta;
        else {
        forwards = 0;
        color_val = color_val - delta;
        }
    }

    // case: movement towards white
    else {
        if (color_val - delta > 0) color_val = color_val - delta;
        else {
        forwards = 1;
        color_val = color_val + delta % 255;
        }
    }

    let fade_val = color_val.toString(16).split('.')[0].padStart(2, '0');
    text.style.backgroundColor = "#FF" + fade_val.repeat(2);
    }
    lasttime = timestamp;      // remember the last update
    window.requestAnimationFrame(advanceColor);
}
advanceColor();

