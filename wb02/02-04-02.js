// JavaScript file to be filled in by the student for Box 4-2
// we'll give you something to get started...

// you should start by getting the canvas, then draw whatever you want!
// Be sure to use the Canvas drawing API, not SVG!
export{}

/** @type {HTMLCanvasElement} */
let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas1"));
let context = canvas.getContext('2d');

/** inner/outer circle of banjo body */
const outer = new Path2D()
outer.arc(280, 400, 90, 0, 2*Math.PI)
context.fillStyle = "#444"
context.strokeStyle = "black"
context.lineWidth = 3
context.fill(outer)
context.stroke(outer)

const inner = new Path2D()
inner.arc(280, 400, 60, 0, 2*Math.PI)
context.fillStyle = "white"
context.strokeStyle = "black"
context.lineWidth = 3
context.fill(inner)
context.stroke(inner)

/** string bridge parts */
const bridge = new Path2D()
bridge.moveTo(260, 440)
bridge.lineTo(300, 440)
bridge.arc(300, 435, 5, Math.PI/2, 3*Math.PI/2, true)
bridge.lineTo(260, 430)
bridge.arc(260, 435, 5, 3*Math.PI/2, Math.PI/2, true)
context.fillStyle = 'rgba(218, 165, 32, 1)'
context.strokeStyle = 'rgba(234, 221, 202, 1)'
context.lineWidth = 3
context.fill(bridge)
context.stroke(bridge)

const b2 = new Path2D()
b2.moveTo(255, 465)
b2.lineTo(270, 480)
b2.lineTo(290, 480)
b2.lineTo(305,465)
context.fillStyle = 'rgba(218, 165, 32, 1)'
context.strokeStyle = 'rgba(211, 211, 211, 1)'
context.lineWidth = 3
context.fill(b2)
context.stroke(b2)

/** create neck */
const neck = new Path2D()
neck.moveTo(268, 340)
neck.lineTo(268, 90)
neck.lineTo(298, 90)
neck.lineTo(298, 340)
neck.closePath()
context.strokeStyle = 'rgba(181, 101, 29, 1)'
context.fillStyle = 'rbga(181, 101, 29, 1)'
context.fill(neck)
context.stroke(neck)

/** create frets */
const frets = new Path2D()
let ypos = 0;
for (let x=0; x<10; x++) {
    ypos = 90+25*(x+1)
    frets.moveTo(268, ypos)
    frets.lineTo(298, ypos)
}
context.stroke(frets)

/** create head */
const head = new Path2D()
head.moveTo(266,90)
head.lineTo(266, 75)
head.lineTo(256, 65)
head.lineTo(256, 20)
head.lineTo(308, 20)
head.lineTo(308, 65)
head.lineTo(298, 75)
head.lineTo(298, 90)
context.fillStyle = 'rgba(205, 127, 50, 1)'
context.fill(head)
context.stroke(head)


/** make the strings */
const s1 = new Path2D()
const s2 = new Path2D()
const s3 = new Path2D()
const s4 = new Path2D()
s1.moveTo(277, 480)
s2.moveTo(279.5, 480)
s3.moveTo(282, 480)
s4.moveTo(284.5, 480)
s1.lineTo(267.5, 440)
s2.lineTo(273.5, 440)
s3.lineTo(287.5, 440)
s4.lineTo(293.5, 440)
s1.lineTo(272.5, 30)
s2.lineTo(275.5, 50)
s3.lineTo(289.5, 50)
s4.lineTo(293.5, 30)


context.lineWidth = 3
context.fillStyle = 'rgba(99, 102, 106, 1)'
context.strokeStyle = 'rgba(211, 211, 211, 0.5)'
context.stroke(s1)
context.stroke(s2)
context.stroke(s3)
context.stroke(s4)

/** create tuning keys */
const key1 = new Path2D()
const key2 = new Path2D()
const key3 = new Path2D()
const key4 = new Path2D()
key1.arc(272.5, 30, 5, 0, 2*Math.PI)
key2.arc(275.5, 50, 5, 0, 2*Math.PI)
key3.arc(289.5, 50, 5, 0, 2*Math.PI)
key4.arc(293.5, 30, 5, 0, 2*Math.PI)
context.fillStyle = 'rgba(78, 53, 36, 1)'
context.fill(key1)
context.fill(key2)
context.fill(key3)
context.fill(key4)

/** create knobs */
const knob1 = new Path2D()
const knob2 = new Path2D()
const knob3 = new Path2D()
const knob4 = new Path2D()
knob1.moveTo(308,30)
knob1.lineTo(314, 30)
knob1.lineTo(314, 27.5)
knob1.arc(314, 30, 9, 3*Math.PI/2, Math.PI/2)
knob1.lineTo(314, 30)

knob2.moveTo(308, 50)
knob2.lineTo(314, 50)
knob2.lineTo(314, 47.5)
knob2.arc(314, 50, 9, 3*Math.PI/2, Math.PI/2)
knob2.lineTo(314, 50)

knob3.moveTo(256,30)
knob3.lineTo(250, 30)
knob3.lineTo(250, 27.5)
knob3.arc(250, 30, 9, Math.PI/2, 3*Math.PI/2)
knob3.lineTo(250, 30)

knob4.moveTo(256, 50)
knob4.lineTo(250, 50)
knob4.lineTo(250, 47.5)
knob4.arc(250, 50, 9, Math.PI/2, 3*Math.PI/2)
knob4.lineTo(250, 50)

context.fillStyle = 'rgba(190, 194, 203, 1)'
context.stroke(knob1)
context.fill(knob1)
context.stroke(knob2)
context.fill(knob2)
context.stroke(knob3)
context.fill(knob3)
context.stroke(knob4)
context.fill(knob4)















