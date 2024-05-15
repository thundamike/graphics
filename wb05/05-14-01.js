/*jshint esversion: 6 */
// you might want to turn this on: // @ts-check

// these two things are the main UI code for the train
// students learned about them in last week's workbook

import { draggablePoints } from "../libs/CS559/dragPoints.js";
import { RunCanvas } from "../libs/CS559/runCanvas.js";

// this is a utility that adds a checkbox to the page 
// useful for turning features on and off
import { makeCheckbox } from "../libs/CS559/inputHelpers.js";

/**
 * Have the array of control points for the track be a
 * "global" (to the module) variable
 *
 * Note: the control points are stored as Arrays of 2 numbers, rather than
 * as "objects" with an x,y. Because we require a Cardinal Spline (interpolating)
 * the track is defined by a list of points.
 *
 * things are set up with an initial track
 */
/** @type Array<number[]> */
let thePoints = [
  [150, 150],
  [150, 450],
  [450, 450],
  [450, 150]
];

/**
 *  create an array containing all of the bezier control points for each segment
 *  e.g. bezierControls[0] = [p0,p1,p2,p3] contains the control points needed
 *  to draw the bezier segment from thePoints[0] to thePoints[1]
 */
/** @type Array<number[]> */
let bezierControls = [];


/**
 *  create an array containing all of the parallel control points for each segment
 *  e.g. bezierControls[0] = [p0,p1,p2,p3] contains the control points needed
 *  to draw the bezier segment from thePoints[0] to thePoints[1]
 */
/** @type Array<number[]> */
let parallelPoints = [];

/**
 *  create an array for the colors/pieces of the exhaust flames
 */
/** @type Array<number[]> */
let colors = ["#FF5349", "#C73912", "#E35809"];
let flames = [];

/**
 *  function to calculate total arc length of the curve
 */
function getArcLength() {
  let lens = []
  for (let i = 0; i < thePoints.length; i++) {
    lens[i] = 0;
  }
  let len = 0;
  let ratios = [];
  let step = 1/500;
  let index = 0;
  for (let i = 0; i < thePoints.length-step; i+=step) {
    index = Math.floor(i)%thePoints.length;
    let start = getBezierPos(i-index, 
      bezierControls[index][0], 
      bezierControls[index][1], 
      bezierControls[index][2], 
      bezierControls[index][3]);
    let end = getBezierPos((i+step)-index, 
      bezierControls[index][0], 
      bezierControls[index][1], 
      bezierControls[index][2], 
      bezierControls[index][3]);
    lens[index] += Math.sqrt(Math.pow(end[0]-start[0],2)+Math.pow(end[1]-start[1],2));
    len +=  Math.sqrt(Math.pow(end[0]-start[0],2)+Math.pow(end[1]-start[1],2));
  }

  // get the time intervals for each curve segment
  let intervals = [];
  for (let i = 0; i < thePoints.length; i++) {
    intervals[i] = 0;
    ratios[i] = lens[i]/len;
  }
  for (let i = 0; i < ratios.length; i++) {
    if (i == 0) intervals[i] = 0;
    else intervals[i] = intervals[i-1]+ratios[i]/(1/thePoints.length);
  }
  return [ratios, intervals];
  }

/**
 *  helper function to return the parameterized position along a bezier segment
 */
function getBSplinePos(u,p0,p1,p2,p3) {
  let x = 1/6*((-Math.pow(u,3)+3*Math.pow(u,2)-3*u+1)*p0[0] + 
              (3*Math.pow(u,3)-6*Math.pow(u,2)+4)*p1[0] +
              (-3*Math.pow(u,3)+3*Math.pow(u,2)+3*u+1)*p2[0] +
               Math.pow(u,3)*p3[0]);

  let y = 1/6*((-Math.pow(u,3)+3*Math.pow(u,2)-3*u+1)*p0[1] + 
              (3*Math.pow(u,3)-6*Math.pow(u,2)+4)*p1[1] +
              (-3*Math.pow(u,3)+3*Math.pow(u,2)+3*u+1)*p2[1] +
              Math.pow(u,3)*p3[1]);

  return [x,y];
}

/**
 *  helper function to return the parameterized position along a bezier segment
 */
function getBezierPos(u,p0,p1,p2,p3) {
  let x = Math.pow(1-u,3)*p0[0] + 3*u*Math.pow(1-u,2)*p1[0] + 
          3*Math.pow(u,2)*(1-u)*p2[0] + Math.pow(u,3)*p3[0];

  let y = Math.pow(1-u,3)*p0[1] + 3*u*Math.pow(1-u,2)*p1[1] + 
          3*Math.pow(u,2)*(1-u)*p2[1] + Math.pow(u,3)*p3[1];

  return [x,y];
}

/**
 *  helper function to draw the train
 */
function drawTrain(x,y, index, u) {

  // get the angle to rotate the train
  let dx = -3*Math.pow(1-u,2)*bezierControls[index][0][0] + 
            (3*Math.pow(1-u,2)-6*u*(1-u))*bezierControls[index][1][0] + 
            (6*u-9*Math.pow(u,2))*bezierControls[index][2][0] + 
            3*Math.pow(u,2)*bezierControls[index][3][0];
  let dy = -3*Math.pow(1-u,2)*bezierControls[index][0][1] + 
            (3*Math.pow(1-u,2)-6*u*(1-u))*bezierControls[index][1][1] + 
            (6*u-9*Math.pow(u,2))*bezierControls[index][2][1] + 
            3*Math.pow(u,2)*bezierControls[index][3][1];
  
  let theta = Math.atan2(dy,dx);
  context.save();

  context.fillStyle="lightgray";
  context.save();
  context.translate(x,y);
  context.rotate(theta);
  context.fillRect(0,0,40,20);

  let top = new Path2D();
  top.moveTo(40,0);
  top.lineTo(55,10);
  top.lineTo(40,20);
  context.fillStyle="red";
  context.fill(top);
  let thrust = new Path2D();
  thrust.lineTo(-10,20);
  thrust.lineTo(-10,0);
  thrust.lineTo(0, 5);
  thrust.lineTo(0,15)
  context.fillStyle="gray";
  context.fill(thrust);

  // draw flaming exhaust
  if (flaming.checked) {
  flames.length = 0;
  for (let i = 0; i < 40; i++) {
    flames.push({"x":-25-20*(Math.random()-0.5), "y":8-20*(Math.random()-0.5),
                "time":0, "vx":10*Math.random(), "vy":0,
                "color":colors[Math.floor(Math.random()*3)], 
                "fade":255 });
  }

  flames.forEach(function(flame) {
    if ( flame.time >= 2) {
        let idx = flames.indexOf(flame);
        flames.splice(idx, 1);
    }
    else {
    flame.y -= flame.vy*0.016;
    flame.x += flame.vx*0.016;
    context.fillStyle = flame.color.substring(0,7) + (flame.fade-3).toString(16);
    flame.fade -= 2;
    flame.time += 0.016;
    context.fillRect(flame.x, flame.y, 4, 4);
    }
  });
}


  context.restore();
  context.fillStyle="black";

  
}

/**
 * Draw function - this is the meat of the operation
 *
 * It's the main thing that needs to be changed
 *
 * @param {HTMLCanvasElement} canvas
 * @param {number} param
 */
function draw(canvas, param) {
  let context = canvas.getContext("2d");
  // clear the screen
  context.clearRect(0, 0, canvas.width, canvas.height);

  // draw the control points
  thePoints.forEach(function(pt) {
    context.beginPath();
    context.arc(pt[0], pt[1], 5, 0, Math.PI * 2);
    context.closePath();
    context.fill();
  });

  // now, the student should add code to draw the track and train

  /**
   *  draw the simple track
   */
  if (simpleTrack.checked || parallel.checked) {
    let numPoints = thePoints.length;
    for (let i = 0; i < numPoints; i++) {
      let dx0, dy0, dx1, dy1 = 0;
      if (i == 0) {
        dx0 = 1/3*(thePoints[1][0]-thePoints[numPoints-1][0]);
        dy0 = 1/3*(thePoints[1][1]-thePoints[numPoints-1][1]);
        dx1 = -1/3*(thePoints[numPoints-2][0]-thePoints[0][0]);
        dy1 = -1/3*(thePoints[numPoints-2][1]-thePoints[0][1]);
      }
      else if (i == thePoints.length-1) {
        dx0 = 1/3*(thePoints[0][0]-thePoints[numPoints-2][0]);
        dy0 = 1/3*(thePoints[0][1]-thePoints[numPoints-2][1]);
        dx1 = -1/3*(thePoints[1][0]-thePoints[numPoints-1][0]);
        dy1 = -1/3*(thePoints[1][1]-thePoints[numPoints-1][1]);
      }
      else {
        dx0 = 1/3*(thePoints[i+1][0]-thePoints[i-1][0]);
        dy0 = 1/3*(thePoints[i+1][1]-thePoints[i-1][1]);
        dx1 = -1/3*(thePoints[(i+2)%numPoints][0]-thePoints[i][0]);
        dy1 = -1/3*(thePoints[(i+2)%numPoints][1]-thePoints[i][1]);
      }

      let startX = thePoints[i][0];
      let startY = thePoints[i][1];
      let endX = thePoints[(i+1)%numPoints][0];
      let endY = thePoints[(i+1)%numPoints][1];

      context.beginPath();
      context.moveTo(startX,startY);
      context.bezierCurveTo(startX+dx0,startY+dy0, endX+dx1,endY+dy1, endX,endY);
      context.stroke();

      if (parallel.checked) {
        /* find the normal vector at each of the endpoints
         * shift control points by (x,y)+20*normal
         * redraw the curve
         **/
        let pdx0 = dx0 / Math.sqrt(dx0**2+dy0**2);
        let pdy0 = dy0 / Math.sqrt(dx0**2+dy0**2);
        let pdx1 = dx1 / Math.sqrt(dx1**2+dy1**2);
        let pdy1 = dy1 / Math.sqrt(dx1**2+dy1**2);
        // rotate 90 deg CW, scale by 20
        let ndx0 = -20*pdy0;
        let ndy0 = 20*pdx0
        let ndx1 = -20*pdy1;
        let ndy1 = 20*pdx1

        // draw the curve
        parallelPoints[i] = [startX+ndx0,startY+ndy0];
        parallelPoints[(i+1)%numPoints] = [endX-ndx1,endY-ndy1];
      }

      bezierControls[i] = [
        [startX,startY], 
        [startX+dx0,startY+dy0],
        [endX+dx1,endY+dy1], 
        [endX,endY]
      ];
    }

    // separate loop to draw bezier curve for the parallel points
    if (parallel.checked) {
      for (let i = 0; i < numPoints; i++) {
        let dx0, dy0, dx1, dy1 = 0;
        if (i == 0) {
          dx0 = 1/3*(parallelPoints[1][0]-parallelPoints[numPoints-1][0]);
          dy0 = 1/3*(parallelPoints[1][1]-parallelPoints[numPoints-1][1]);
          dx1 = -1/3*(parallelPoints[numPoints-2][0]-parallelPoints[0][0]);
          dy1 = -1/3*(parallelPoints[numPoints-2][1]-parallelPoints[0][1]);
        }
        else if (i == numPoints-1) {
          dx0 = 1/3*(parallelPoints[0][0]-parallelPoints[numPoints-2][0]);
          dy0 = 1/3*(parallelPoints[0][1]-parallelPoints[numPoints-2][1]);
          dx1 = -1/3*(parallelPoints[1][0]-parallelPoints[numPoints-1][0]);
          dy1 = -1/3*(parallelPoints[1][1]-parallelPoints[numPoints-1][1]);
        }
        else {
          dx0 = 1/3*(parallelPoints[i+1][0]-parallelPoints[i-1][0]);
          dy0 = 1/3*(parallelPoints[i+1][1]-parallelPoints[i-1][1]);
          dx1 = -1/3*(parallelPoints[(i+2)%numPoints][0]-parallelPoints[i][0]);
          dy1 = -1/3*(parallelPoints[(i+2)%numPoints][1]-parallelPoints[i][1]);
        }

        let startX = parallelPoints[i][0];
        let startY = parallelPoints[i][1];
        let endX = parallelPoints[(i+1)%numPoints][0];
        let endY = parallelPoints[(i+1)%numPoints][1];

        context.beginPath();
        context.moveTo(startX,startY);
        context.bezierCurveTo(startX+dx0,startY+dy0, endX+dx1,endY+dy1, endX,endY);
        context.stroke();
      }
    }
  }

  
  /**
   *  draw the b-spline track
   */
   
  if (bSpline.checked) {
    // draw the spline in "steps" using sample points
    // the curve between pi and pi+1 uses the points pi-3 pi-2 pi-1 pi
    // iterate through all control points (thePoints)
    let len = thePoints.length;
    let u = 0.0;
    let step = 0.01;
    let start = getBSplinePos(0, thePoints[len-3], thePoints[len-2], thePoints[len-1], thePoints[0]);
    context.moveTo(start[0], start[1]);
    context.beginPath();
    for (let i = 0; i < len; i+=step) {
      u += step;
      let j = Math.floor(i)%len;
      let newPoint = [];
      // special cases for indexing
      if (j == 0) {
        newPoint = getBSplinePos(u, thePoints[len-1], thePoints[0], thePoints[1], thePoints[2]);
      }
      else if (j == 1) {
        newPoint = getBSplinePos(u, thePoints[0], thePoints[1], thePoints[2], thePoints[3]);
      }
      else if (j == 2) {
        newPoint = getBSplinePos(u, thePoints[1], thePoints[2], thePoints[3], thePoints[(3+1)%len])
      }
      else newPoint = getBSplinePos(u, thePoints[j-1], thePoints[j], thePoints[(j+1)%len], thePoints[(j+2)%len]);
      context.lineTo(newPoint[0], newPoint[1]);
      context.stroke();    
      u = (u-Math.floor(u)<0.001) ? 0.0 : u;
      if (u == 0) {
        context.closePath();
        context.beginPath();
    }
    
   }
  }
  
  

  /**
   *  simple parameterized movement
   */
  if (simpleTrack.checked || parallel.checked) {
    let val = slider.value;
    let index = (val == thePoints.length)? 0 : Math.floor(val);
    let u = (val == thePoints.length)? 0 : val-index;
    let center = /** @type {Array[Array<Number>]} */ getBezierPos(u, 
      bezierControls[index][0], 
      bezierControls[index][1], 
      bezierControls[index][2], 
      bezierControls[index][3]);
    drawTrain(center[0], center[1], index, u);
  }

  /**
   *  motion of train along bspline track
   */
  if (bSpline.checked) {

  }


  /**
   *  arc-length parameterized movement
   */
  /** 
   * if (arcLength.checked) {
    let lengths = getArcLength();  // [ratios, intervals]
    let val = (slider.value == 4)? 0 : slider.value;
    let index = 0;
    
    // find the segment we are currently in
    for (let i = 0; i < thePoints.length; i++) {
      if (val >= thePoints.length-1) {
        index = thePoints.length-1;
        break;
      }
      else {
        if (val >= lengths[1][i] && (val < lengths[1][i+1])) {
          index = i;
          break;
        }
      }
    }
    let u = (val-lengths[1][index])/(lengths[0][index]*thePoints.length);
    let center =  @type {Array[Array<Number>]} getBezierPos(u, 
      bezierControls[index][0], 
      bezierControls[index][1], 
      bezierControls[index][2], 
      bezierControls[index][3]);
    drawTrain(center[0], center[1], index, u);
  }
  */
 

}

/**
 * Initialization code - sets up the UI and start the train
 */
let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas1"));
let context = canvas.getContext("2d");

// we need the slider for the draw function, but we need the draw function
// to create the slider - so create a variable and we'll change it later
let slider; // = undefined;

// note: we wrap the draw call so we can pass the right arguments
function wrapDraw() {
    // do modular arithmetic since the end of the track should be the beginning
    draw(canvas, Number(slider.value) % thePoints.length);
}
// create a UI
let runcanvas = new RunCanvas(canvas, wrapDraw);
// now we can connect the draw function correctly
slider = runcanvas.range;

// note: if you add these features, uncomment the lines for the checkboxes
// in your code, you can test if the checkbox is checked by something like:
// document.getElementById("check-simple-track").checked
// in your drawing code
// WARNING: makeCheckbox adds a "check-" to the id of the checkboxes
//
// lines to uncomment to make checkboxes
makeCheckbox("simple-track").checked=true;
let simpleTrack = /** @type {HTMLInputElement} */ document.getElementById("check-simple-track");
simpleTrack.onclick = function() { 
  parallel.checked = false;
  bSpline.checked = false;
  draw(canvas);
 }

makeCheckbox("parallel-track");
let parallel = /** @type {HTMLInputElement} */ document.getElementById("check-parallel-track");
parallel.onclick = function() { 
  simpleTrack.checked = false;
  draw(canvas); 
}

makeCheckbox("arc-length")
let arcLength = /** @type {HTMLInputElement} */ document.getElementById("check-arc-length");
arcLength.onclick = function() { draw(canvas); }

makeCheckbox("bspline");
let bSpline = /** @type {HTMLInputElement} */ document.getElementById("check-bspline");
bSpline.onclick = function() { 
  draw(canvas);
  simpleTrack.checked=false;
}


makeCheckbox("flames");
let flaming = /** @type {HTMLInputElement} */ document.getElementById("check-flames");
flaming.onclick = function() { draw(canvas); }


// helper function - set the slider to have max = # of control points
function setNumPoints() {
    runcanvas.setupSlider(0, thePoints.length, 0.05);
}

setNumPoints();
runcanvas.setValue(0);

// add the point dragging UI
draggablePoints(canvas, thePoints, wrapDraw, 10, setNumPoints);

