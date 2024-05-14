/** @type{HTMLInputElement} */ let slider1 = (/** @type{HTMLInputElement} */ document.getElementById("slider1"));
/** @type{HTMLInputElement} */ let slider2 = (/** @type{HTMLInputElement} */ document.getElementById("slider2"));
/** @type{HTMLInputElement} */ let slider3 = (/** @type{HTMLInputElement} */ document.getElementById("slider3"));

slider1.onchange = function() {
    slider3.value = Math.abs(slider2.value-slider1.value);
};
slider2.onchange = function() {
    slider3.value = Math.abs(slider2.value-slider1.value);
};
slider3.onchange = function() {
    if (slider3.value > slider1.value || slider3.value > slider2.value) {
        // just reset sliders if impossible difference is requested
        slider1.value = slider3.value;
        slider2.value = 0;
    }
    else {
    slider1.value = Math.abs(slider2.value-slider3.value);
    }
};