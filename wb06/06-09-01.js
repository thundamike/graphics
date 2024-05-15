// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { OrbitControls } from "../libs/CS559-Three/examples/jsm/controls/OrbitControls.js";
import { setupBasicScene } from "./06-09-01-helpers.js";
import { OBJLoader } from "../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";

// students can use the object loader
// uncomment this if necessary
// import { OBJLoader } from "../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";

/** Setup the window */
/** @type{number} */
let wid = 670; // window.innerWidth;
/** @type{number} */
let ht = 500; // window.innerHeight;
/** @type{T.WebGLRenderer} */
let renderer = new T.WebGLRenderer();
renderer.setSize(wid, ht);
renderer.shadowMap.enabled = true;

document.getElementById("museum_area").appendChild(renderer.domElement);

/* setupBasicScene creates a scene and puts the pedestals in place */
/** @type{T.Scene} */
let scene = setupBasicScene();

// Here, we add a basic, simple first object to the museum.
/**@type{T.Material} */
let material = new T.MeshPhongMaterial({
  color: "#00aa00",
  shininess: 15,
  specular: "#00ff00",
});
/**@type{T.BufferGeometry} */
let geometry = new T.BoxGeometry(0.5, 0.5, 0.5);
/**@type{T.Mesh} */
let cube = new T.Mesh(geometry, material);
cube.position.set(2, 1.35, 2);
cube.rotation.set(Math.PI / 4, 0, Math.PI / 4);
cube.castShadow = true;

let coneMaterial = new T.MeshStandardMaterial({color:"magenta", metalness:1.0, roughness:0.6, emissive:100});
let coneGeometry = new T.ConeGeometry(0.3, 1, 20);
let cone = new T.Mesh(coneGeometry, coneMaterial);
cone.position.set(-2,1.75,2);
cone.castShadow = true;
scene.add(cone);

/** create a "main camera" */
/** @type{T.PerspectiveCamera} */
let main_camera = new T.PerspectiveCamera(60, wid / ht, 1, 100);
main_camera.position.set(0, 4, 6);
main_camera.rotation.set(-0.5, 0, 0);

// TODO: You need to place these cameras.
let camera_1 = new T.PerspectiveCamera(35, wid / ht, 1, 80);
camera_1.position.set(2, 4, 7);
camera_1.rotation.set(-0.6, 0, 0);

let camera_2 = new T.PerspectiveCamera(35, wid / ht, 1, 80);
camera_2.position.set(-2, 4, 7);
camera_2.rotation.set(-0.6, 0, 0);

let camera_3 = new T.PerspectiveCamera(35, wid / ht, 1, 80);
camera_3.position.set(-2, 4, -7);
camera_3.rotation.set(0.6, Math.PI, 0);

let camera_4 = new T.PerspectiveCamera(35, wid / ht, 1, 80);
camera_4.position.set(2, 4, -7);
camera_4.rotation.set(0.6, Math.PI, 0);

scene.add(cube);

/** this will be the "current camera" - we will switch when a button is pressed */
let active_camera = main_camera;

let loader = new OBJLoader();
let asyncLoad = loader.loadAsync("./objects/07-teapot.obj");
asyncLoad.then(function(teapot) {
        teapot.position.set(-2, 1.5, -2);
        teapot.scale.set(0.015, 0.015, 0.015);
        scene.add(teapot);
        // note that we have to render
        renderer.render(scene, active_camera);
    });
let teapot = await asyncLoad;
teapot.children.forEach(obj => obj.material = new T.MeshStandardMaterial({color:"salmon"}));

let asyncLoad2 = loader.loadAsync("./objects/07-suzanne.obj");
asyncLoad2.then(function(suzanne) {
        suzanne.position.set(2, 1.5, -2);
        suzanne.scale.set(0.02, 0.02, 0.02);
        scene.add(suzanne);
        // note that we have to render
        renderer.render(scene, active_camera);
    });
let suzanne = await asyncLoad2;
suzanne.children.forEach(obj => obj.material = new T.MeshStandardMaterial({color:"lightgreen"}));

/* put a spotlight on the first object */
/**@type{T.SpotLight} */
let spotlight_1 = new T.SpotLight(0xaaaaff, 0.5);
spotlight_1.angle = Math.PI / 16;
spotlight_1.position.set(2, 5, 2);
spotlight_1.target = cube;
spotlight_1.castShadow = true;
scene.add(spotlight_1);

// TODO: You need to place the lights.
let spotlight_2 = new T.SpotLight(0xaaaaff, 0.5);
spotlight_2.angle = Math.PI / 16;
spotlight_2.castShadow = true;
spotlight_2.position.set(-2, 5, 2);
spotlight_2.target = cone;
scene.add(spotlight_2);

let spotlight_3 = new T.SpotLight(0xaaaaff, 0.5);
spotlight_3.angle = Math.PI / 16;
spotlight_3.castShadow = true;
spotlight_3.position.set(-2, 5, -2);
spotlight_3.target = teapot;
scene.add(spotlight_3);

let spotlight_4 = new T.SpotLight(0xaaaaff, 0.5);
spotlight_4.angle = Math.PI / 16;
spotlight_4.castShadow = true;
spotlight_4.position.set(2,5,-2);
spotlight_4.target = suzanne;
scene.add(spotlight_4);


// add orbit controls - but only to the main camera
let controls = new OrbitControls(main_camera, renderer.domElement);

/** Tie the buttons to the cameras */
function setupCamButton(name, camera) {
  const button = document.getElementById(name);
  if (!(button instanceof HTMLButtonElement))
    throw new Error(`Button ${name} doesn't exist`);
  button.onclick = function () {
    active_camera = camera;
    renderer.render(scene, active_camera);
  };
}
setupCamButton("main_cam", main_camera);
setupCamButton("cam_1", camera_1);
setupCamButton("cam_2", camera_2);
setupCamButton("cam_3", camera_3);
setupCamButton("cam_4", camera_4);

// finally, draw the scene. Also, add animation.
renderer.render(scene, active_camera);

let lastTimestamp; // undefined to start
let counter = 0;

function animate(timestamp) {
  // Convert time change from milliseconds to seconds
  let timeDelta = 0.001 * (lastTimestamp ? timestamp - lastTimestamp : 0);
  lastTimestamp = timestamp;

  // Animate the cube (basic object)
  cube.rotateOnWorldAxis(new T.Vector3(0, 1, 0), timeDelta);
  cone.rotateOnWorldAxis(new T.Vector3(1,0,0), timeDelta);
  
  // rotate teapot in x direction, then y, then z
  if (timeDelta != 0) {
    ++counter;
    // animate teapot
    if (counter%360 < 120) {
      teapot.rotateX(timeDelta*Math.PI);
    }
    else if (counter%360 < 240) {
      teapot.rotateY(timeDelta*Math.PI);
    }
    else {
      teapot.rotateZ(timeDelta*Math.PI);
    }
    // animate suzanne
    suzanne.position.x = 2 + 0.3*Math.cos(counter/100*Math.PI);
    suzanne.position.y = 1.5 + 0.3*Math.sin(counter/100*Math.PI);
    suzanne.position.z = -2 + 0.3*Math.cos(counter/100*Math.PI);
  }



  // draw and loop
  renderer.render(scene, active_camera);
  window.requestAnimationFrame(animate);
}
window.requestAnimationFrame(animate);
