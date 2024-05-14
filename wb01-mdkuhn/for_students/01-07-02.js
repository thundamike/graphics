/** @type{HTMLInputElement} */ let text = (/** @type{HTMLInputElement} */ document.getElementById("ex3-span"));
/** @type{HTMLInputElement} */ let red = (/** @type{HTMLInputElement} */ document.getElementById("red"));
/** @type{HTMLInputElement} */ let yellow = (/** @type{HTMLInputElement} */ document.getElementById("yellow"));
/** @type{HTMLInputElement} */ let green = (/** @type{HTMLInputElement} */ document.getElementById("green"));

red.onclick = function() {
    text.innerHTML = "some text that will become Red";
    text.style.backgroundColor = "#FFFFFF";
    let lasttime;
    let fade_val = 255;
    function fadeRed(timestamp) {
        if ( !(lasttime === undefined) ) {
            const delta = ((timestamp-lasttime)/2000) * 255;
            fade_val -= delta;
            let fade = fade_val.toString(16).split('.')[0].padStart(2, '0');
            text.style.backgroundColor = "#FF" + fade.repeat(2);
        }
        lasttime = timestamp;
        if (fade_val > 0) window.requestAnimationFrame(fadeRed);
    }
    fadeRed();
}

yellow.onclick = function() {
    text.innerHTML = "some text that will become Yellow";
    text.style.backgroundColor = "#FFFFFF";
    let lasttime;
    let fade_val = 255;
    function fadeYellow(timestamp) {
        if ( !(lasttime === undefined) ) {
            const delta = ((timestamp-lasttime)/2000) * 255;
            fade_val -= delta;
            let fade = fade_val.toString(16).split('.')[0].padStart(2, '0');
            text.style.backgroundColor = "#FFFF" + fade;
        }
        lasttime = timestamp;
        if (fade_val > 0) window.requestAnimationFrame(fadeYellow);
    }
    fadeYellow();
}

green.onclick = function() {
    text.innerHTML = "some text that will become Green";
    text.style.backgroundColor = "#FFFFFF";
    let lasttime;
    let fade_val = 255;
    function fadeGreen(timestamp) {
        if ( !(lasttime === undefined) ) {
            const delta = ((timestamp-lasttime)/2000) * 255;
            fade_val -= delta;
            let fade = fade_val.toString(16).split('.')[0].padStart(2, '0');
            text.style.backgroundColor = "#" + fade + "FF" + fade;
        }
        lasttime = timestamp;
        if (fade_val > 0) window.requestAnimationFrame(fadeGreen);
    }
    fadeGreen();
}
