/*jshint esversion: 6 */
// @ts-check

/**
 * Minimal Starter Code for the QuadCopter assignment
 */

import * as T from "../libs/CS559-Three/build/three.module.js";
import { OrbitControls } from "../libs/CS559-Three/examples/jsm/controls/OrbitControls.js";


let renderer = new T.WebGLRenderer();
renderer.setSize(600, 400);
document.body.appendChild(renderer.domElement);

let scene = new T.Scene();
let camera = new T.PerspectiveCamera(
        40,
        renderer.domElement.width / renderer.domElement.height,
        1,
        1000
    );

camera.position.z = -13;
camera.position.y = 10;
camera.position.x = 5;
camera.lookAt(0, 0, 0);

// since we're animating, add OrbitControls
let controls = new OrbitControls(camera, renderer.domElement);

scene.add(new T.AmbientLight("white", 0.2));

// two lights - both a little off white to give some contrast
let dirLight1 = new T.DirectionalLight(0xf0e0d0, 1);
dirLight1.position.set(1, 1, 0);
scene.add(dirLight1);

let dirLight2 = new T.DirectionalLight(0xd0e0f0, 1);
dirLight2.position.set(-1, 1, -0.2);
scene.add(dirLight2);

// make a ground plane
let groundBox = new T.BoxGeometry(10, 0.1, 10);
let groundMesh = new T.Mesh(
        groundBox,
        new T.MeshStandardMaterial({ color: 0x88b888, roughness: 0.9 })
    );
// put the top of the box at the ground level (0)
groundMesh.position.y = -0.05;
scene.add(groundMesh);

let plane = new T.Group();

let fuselage = new T.ConeGeometry(0.3, 1.5, 200);
let fusMaterial = new T.MeshStandardMaterial({color:"white"})
let fusMesh = new T.Mesh(fuselage, fusMaterial);
fusMesh.position.y = 3;
fusMesh.rotateY(Math.PI);
fusMesh.rotateZ(Math.PI/2);
plane.add(fusMesh);

let fus2 = new T.CylinderGeometry(0.05, 0.3, 2.3, 200);
let body = new T.Mesh(fus2, fusMaterial);
body.position.y = 3;
body.position.x = -1.9;
body.rotateZ(Math.PI/2)
plane.add(body)

let w = new T.BoxGeometry(0.1, 4, 0.5);
let wing = new T.Mesh(w, fusMaterial);
wing.position.y = 3;
wing.position.x = -1;
wing.rotateZ(Math.PI/2);
wing.rotateX(Math.PI/2);
plane.add(wing);
scene.add(plane);


let propellers = []
let p = new T.CapsuleGeometry(0.1, 0.8);
let propeller1 = new T.Mesh(p, new T.MeshStandardMaterial(
    {color: "yellow", 
     metalness:0.8, 
     roughness: 0.3}));
propeller1.position.x = -0.6;
propeller1.position.y = 3.1;
propeller1.position.z = 1.5;


let propeller2 = new T.Mesh(p, new T.MeshStandardMaterial(
    {color: "yellow", 
     metalness:0.8, 
     roughness: 0.3}));
propeller2.position.x = -0.6;
propeller2.position.y = 3.1;
propeller2.position.z = -1.5;

propellers.push(propeller1);
propellers.push(propeller2);

propellers.forEach(function(prop) {
    scene.add(prop);
    plane.add(prop);
});

// second plane
let plane2 = new T.Group();

let fusMesh2 = new T.Mesh(fuselage, new T.MeshStandardMaterial({color:"indigo"})
);
fusMesh2.position.y = 3;
fusMesh2.rotateY(Math.PI);
fusMesh2.rotateZ(Math.PI/2);
plane2.add(fusMesh2);

let fus = new T.CylinderGeometry(0.05, 0.3, 2.3, 200);
let body2 = new T.Mesh(fus, new T.MeshStandardMaterial({color:"indigo"}));
body2.position.y = 3;
body2.position.x = -1.9;
body2.rotateZ(Math.PI/2)
plane2.add(body2)

let wing2 = new T.Mesh(w, new T.MeshStandardMaterial({color:"indigo"}));
wing2.position.y = 3;
wing2.position.x = -1;
wing2.rotateZ(Math.PI/2);
wing2.rotateX(Math.PI/2);
plane2.add(wing2);
scene.add(plane2);

let propellers2 = []
let propeller3 = new T.Mesh(p, new T.MeshStandardMaterial(
    {color: "yellow", 
     metalness:0.8, 
     roughness: 0.3}));
propeller3.position.x = -0.6;
propeller3.position.y = 3.1;
propeller3.position.z = 1.5;


let propeller4 = new T.Mesh(p, new T.MeshStandardMaterial(
    {color: "yellow", 
     metalness:0.8, 
     roughness: 0.3}));
propeller4.position.x = -0.6;
propeller4.position.y = 3.1;
propeller4.position.z = -1.5;

propellers2.push(propeller3);
propellers2.push(propeller4);

propellers2.forEach(function(prop) {
    scene.add(prop);
    plane2.add(prop);
});
plane2.scale.set(0.5,0.5,0.5);

// SOURCE: https://threejs.org/docs/#api/en/geometries/LatheGeometry
let points = [];
for ( let i = 0; i < 10; i ++ ) {
	points.push( new T.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
}
for ( let i = 0; i < 10; i ++ ) {
	points.push( new T.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
}
let geometry = new T.LatheGeometry( points, 200 );
let material = new T.MeshBasicMaterial( { color: "silver" } );
let lathe = new T.Mesh( geometry, material );
lathe.scale.set(0.1,0.1,0.1)
lathe.position.y = 2.3;
lathe.position.x = 3;
lathe.position.z = -3;
scene.add( lathe );

let stand = new T.BoxGeometry(3,1,3);
let standMesh = new T.Mesh(stand, new T.MeshBasicMaterial({color:"maroon"}));
standMesh.position.x = 3;
standMesh.position.y = 0.5;
standMesh.position.z = -3;
scene.add(standMesh);


// animation loop
let lastTimestamp;
let worldAxis = new T.Vector3(0,1,0)
let worldAxis2 = new T.Vector3(0,0,1)

function animateLoop(timestamp) {
    //** EXAMPLE CODE - STUDENT SHOULD REPLACE */
    // move in a circle
    let timeDelta = 0.001 * (lastTimestamp ? timestamp - lastTimestamp : 0);
    let theta = timestamp / 1000;
    let x = 0.05 * Math.cos(theta);
    let y = 0.03 * Math.sin(theta);
    let z = 0.05 * Math.sin(theta);
   
    plane.rotateOnAxis(worldAxis, -timeDelta);
    plane.position.x += x;
    plane.position.z += z;

    plane2.position.x = x;
    plane2.position.y = y;
    plane2.rotateOnAxis(worldAxis2, timeDelta);
    plane2.translateY(5);

    propeller1.rotateX(-25*timeDelta);
    propeller2.rotateX(25*timeDelta);

    propeller3.rotateX(-25*timeDelta);
    propeller4.rotateX(25*timeDelta);

    lathe.lookAt(new T.Vector3(
        plane.position.x,
        plane.position.y,
        plane.position.z,
    ))
    lathe.rotateX(Math.PI/4);
   
    lastTimestamp = timestamp;
    renderer.render(scene, camera);
    window.requestAnimationFrame(animateLoop);
  }
window.requestAnimationFrame(animateLoop);