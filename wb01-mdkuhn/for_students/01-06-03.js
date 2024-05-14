/** @type{HTMLInputElement} */ let slider = (/** @type{HTMLInputElement} */ document.getElementById("slider"));

let lasttime;  // time
let value = 0;
let forwards = 1; // control for forward/backwards movement
function advanceSLR(timestamp) {
    if ( !(lasttime === undefined) ) {
    const delta = (timestamp - lasttime) / 20.0;

    // case: forwards movement
    if (forwards == 1) {
        if (value + delta < 100) value = (value + delta) % 100;
        else {
        forwards = 0;
        value = (value - delta) % 100;
        }
    }

    // case: backwards movement
    else {
        if (value - delta > 0) value = (value - delta) % 100;
        else {
        forwards = 1;
        value = (value + delta) % 100;
        }
    }

    slider.value = value.toString();
    }
    lasttime = timestamp;      // remember the last update
    window.requestAnimationFrame(advanceSLR);
}
advanceSLR();

