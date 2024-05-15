/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";

/**
 * source: 
 * https://stackoverflow.com/questions/20789627/
 * understanding-the-geometry-of-a-truncated-icosahedron-for-rendering
 * @returns icosahedron geometry made from triangles
 */
function makeIcosahedron() {
  let geometry = new T.BufferGeometry();

  let t = ( 1 + Math.sqrt( 5 ) ) / 2;
  let vertices = new Float32Array([
      -1,  t,  0,  
      1, t, 0, 
      -1, -t,  0,
      1, -t,  0,
      0, -1,  t,
      0, 1, t,
      0, -1, -t,
      0,  1, -t,
      t,  0, -1,
      t, 0, 1,
      -t,  0, -1,
      -t,  0,  1 ]);
  
  geometry.setAttribute('position',new T.BufferAttribute(vertices,3));
  geometry.computeVertexNormals();
  
  geometry.setIndex([
    0, 11,  5, 
    0,  5,  1, 
    0,  1,  7,
    0,  7, 10,
    0, 10, 11,
    1,  5,  9, 
    5, 11,  4,
    11, 10,  2,
    10,  7,  6, 
    7,  1,  8 ,
    3,  9,  4,
    3,  4,  2, 
    3,  2,  6, 
    3,  6,  8, 
    3,  8,  9,
    4,  9,  5, 
    2,  4, 11,
    6,  2, 10, 
    8,  6,  7,
    9,  8,  1
]);

let colors = new Float32Array( [
  1,0,0,   
  1,1,0,
  1,1,0,
  0,1,0,  
  1,1,0,
  1,0,0,   
  1,1,0,
  0,1,0,
  1,1,0,  
  0,1,0,  
  1,0,0,   
  1,1,0,
  1,1,0,
  0,1,0,  
  1,1,0,
  1,0,0,   
  1,1,0,
  1,1,0,
  0,1,0,  
  1,1,0
]);

  geometry.setAttribute("color", new T.BufferAttribute(colors,3));

  geometry.scale(0.75,0.75,0.75);
  return geometry;
}


/*
 * Define y
our 3 objects here. If the objects fit inside +/- 1,
 * the world code below will place them nicely.
 * Otherwise, you need to modify the world code below to make the
 * world bigger and space the objects out differently.
 */

class Object1 extends GrObject {
  constructor(doTwoSided=false) {
    let geometry = makeIcosahedron();

    let material = new T.MeshStandardMaterial({
        vertexColors: true,
        roughness: 0.75,
        side: doTwoSided ? T.DoubleSide : T.FrontSide
    });

    let mesh = new T.Mesh(geometry, material);

    //
    super("SimpleIcosahedron", mesh);
  }
}

class Object2 extends GrObject {
  constructor() {
      let geometry = new T.BufferGeometry();

      const vertices = new Float32Array( [
          -0.5, 0, 0,   // t1
          0.5, 0, 0,       
          0.5, 1, 0,   
          
          -0.5, 1, 0,     // t2
          -0.5, 0, 0,
          0.5, 1, 0, 

          -0.5, 1, 0, 
          -0.5, 0, -1, 
          -0.5, 0, 0
         
      ]);

      geometry.setAttribute('position',new T.BufferAttribute(vertices,3));

      // set the indecies - our triangles are 0 1 2 and 3,2,1
      geometry.setIndex(
        [0,1,2,
         3,4,5,
        6,7,8]);

      let colors = new Float32Array( [
        0,1,0,
        0,1,0,
        0,1,0,
        0,0,1,
        0,0,1,
        0,0,1, 
        1,0,0,
        1,0,0,
        1,0,0
      ]);
      geometry.setAttribute("color", new T.BufferAttribute(colors,3));

      // Let THREE do this for us
      geometry.computeVertexNormals();
      

      let material = new T.MeshStandardMaterial({
      vertexColors:true,
      roughness: 0.75
      });

      let mesh = new T.Mesh(geometry, material);

      
      super("TwoTriangle", mesh);
  }
}

class Object3 extends GrObject {
  constructor() {
    let geometry = makeIcosahedron();
    let colors = new Float32Array( [
      0.7,0.2,0.2,
      0.7,0.2,0.2,
      0.7,0.2,0.2,
      0.7,0.2,0.2,
      0.7,0.2,0.2,
      0.7,0.2,0.2,
      0.7,0.2,0.2,
      0.7,0.2,0.2,
      0.7,0.2,0.2,
      0.7,0.2,0.2,
      0.7,0.2,0.2,
      0.7,0.2,0.2,
      0.7,0.2,0.2,
      0.7,0.2,0.2,
      0.7,0.2,0.2,
      0.7,0.2,0.2,
      0.7,0.2,0.2,
      0.7,0.2,0.2,
      0.7,0.2,0.2,
      0.7,0.2,0.2,
      0.7, 0.2, 0.2
    ]);
    geometry.setAttribute("color", new T.BufferAttribute(colors,3));
    let material = new T.MeshStandardMaterial({
        vertexColors: true,
        roughness: 0.75,
    });
  
    let mesh = new T.Mesh(geometry, material);
  
    //
    super("SimpleIcosahedronOneColor", mesh);
  }
}




// translate an object in the X/Y direction
function shift(grobj, x) {
    grobj.objects.forEach(element => {
        element.translateX(x);
        element.translateY(1.1);
    });
  return grobj;
}

// Set the Object's Y rotate
function roty(grobj, ry) {
    grobj.objects.forEach(element => {
        element.rotation.y = ry;
    });
  return grobj;
}

/*
 * The world making code here assumes the objects are +/- 1
 * and have a single mesh as their THREE objects.
 * If you don't follow this convention, you will need to modify
 * the code below.
 * The code is a little funky because it is designed to work for
 * a variety of demos.
 */
let mydiv = document.getElementById("div1");

let box = InputHelpers.makeBoxDiv({ width: mydiv ? 640 : 820 }, mydiv);
if (!mydiv) {
    InputHelpers.makeBreak(); // sticks a break after the box
}
InputHelpers.makeHead("Three Different Objects", box);

let world = new GrWorld({ width: mydiv ? 600 : 800, where: box });
let tt = shift(new Object1(), -3);
world.add(tt);

let t2 = new Object2();
t2.objects.forEach(element => { element.translateX(0.2); });
world.add(t2);

let t3 = shift(new Object3(), 3);

world.add(t3);

let div = InputHelpers.makeBoxDiv({}, box);

let sl = new InputHelpers.LabelSlider("ry", { min: -2, max: 2, where: div });

InputHelpers.makeBreak(box);

sl.oninput = function(evt) {
    let v = sl.value();
    roty(tt,v);
    roty(t2,v);
    roty(t3,v);
};

world.go();
