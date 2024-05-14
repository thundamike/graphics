/** @type{HTMLInputElement} */ let startbut = (/** @type{HTMLInputElement} */ document.getElementById("bstart"));
/** @type{HTMLInputElement} */ let stopbut = (/** @type{HTMLInputElement} */ document.getElementById("bstop"));
/** @type{HTMLInputElement} */ let slr = (/** @type{HTMLInputElement} */ document.getElementById("slr"));

let advance = 0;
startbut.onclick = function() {  advance = 1; }
stopbut.onclick = function() { advance = 0; }

function advanceSLR() {
    if ( !advance == 0 ) {
        let newValue = (Number(slr.value)+1) % 100;
        slr.value = newValue.toString();
    }
    window.requestAnimationFrame(advanceSLR);
}
advanceSLR();
