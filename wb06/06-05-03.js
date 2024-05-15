// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { AmbientLight } from "../libs/CS559-Three/build/three.module.js";
import { OrbitControls } from "../libs/CS559-Three/examples/jsm/controls/OrbitControls.js";

let renderer = new T.WebGLRenderer();
renderer.setSize(400, 400);
document.getElementById("div1").appendChild(renderer.domElement);

let scene = new T.Scene();
let camera = new T.PerspectiveCamera();
camera.position.z = 10;
camera.position.y = 5;
camera.position.x = 5;
camera.lookAt(0, 3, 0);

// since we're animating, add OrbitControls
let controls = new OrbitControls(camera, renderer.domElement);

// Ambient light doesn't work since we're using physical materials
// scene.add(new T.AmbientLight("white",0.2));

//** STUDENT: Add some lights here */

// make a ground plane
let groundBox = new T.BoxGeometry(6, 0.1, 6);
let groundMesh = new T.Mesh(
groundBox,
new T.MeshStandardMaterial({ color: 0x888888 })
);
// put the top of the box at the ground level (0)
groundMesh.position.y = -0.05;
scene.add(groundMesh);

/**
 * Make some cubes in various places and orientations
 */

let box = new T.BoxGeometry(1, 1, 1);
let cube1 = new T.Mesh(box, new T.MeshStandardMaterial({ color: "white" }));
cube1.position.set(2, 0.5, 2);
scene.add(cube1);

let cube2 = new T.Mesh(box, new T.MeshStandardMaterial({ color: "white" }));
cube2.position.set(-2, 0.5, 2);
cube2.rotateY(45);
scene.add(cube2);

let cube3 = new T.Mesh(box, new T.MeshStandardMaterial({ color: "white" }));
cube3.position.y = 0.5;
scene.add(cube3);

let cube4 = new T.Mesh(box, new T.MeshStandardMaterial({ color: "white" }));
cube4.position.set(2, Math.sqrt(2) / 2, -2);
cube4.rotateX(45);
scene.add(cube4);

let cube5 = new T.Mesh(box, new T.MeshStandardMaterial({ color: "white" }));
cube5.position.set(-2, 1, -2);
scene.add(cube5);


scene.add(new AmbientLight("white", 0.2))

let posy = new T.SpotLight("red");
posy.angle = Math.PI / 2; // narrow (5 degrees)
posy.position.set(0, 5, 0);
scene.add(posy);

let negx = new T.SpotLight("purple");
negx.angle = Math.PI / 2; // narrow (5 degrees)
negx.position.set(-5, 0, 0);
scene.add(negx);

let posx = new T.SpotLight("green");
posx.angle = Math.PI / 2; // narrow (5 degrees)
posx.position.set(5, 0, 0);
scene.add(posx);

let posz = new T.SpotLight("blue");
posz.angle = Math.PI / 2; // narrow (5 degrees)
posz.position.set(0, 0, 5);
scene.add(posz);

let negz = new T.SpotLight("yellow");
negz.angle = Math.PI / 2; // narrow (5 degrees)
negz.position.set(0, 0, -5);
scene.add(negz);

let lastTimestamp; // undefined to start
  
function animate(timestamp) {
    // Convert time change from milliseconds to seconds
    let timeDelta = 0.001 * (lastTimestamp ? timestamp - lastTimestamp : 0);
    lastTimestamp = timestamp;

    cube5.rotateX(0.5 * timeDelta);
    cube5.rotateY(0.5 * timeDelta);
    renderer.render(scene, camera);

    window.requestAnimationFrame(animate);
}
window.requestAnimationFrame(animate);

