import * as T from "../libs/CS559-Three/build/three.module.js";
import { ArrayCamera, SphereGeometry } from "../libs/CS559-Three/build/three.module.js";
import { OrbitControls } from "../libs/CS559-Three/examples/jsm/controls/OrbitControls.js";

let renderer = new T.WebGLRenderer();
renderer.setSize(400, 400);

let scene = new T.Scene();
let camera = new T.PerspectiveCamera();
camera.position.z = 10;
camera.position.y = 5;
camera.position.x = 5;
camera.lookAt(0, 3, 0);


// since we're animating, add OrbitControls
let controls = new OrbitControls(camera, renderer.domElement);

scene.add(new T.AmbientLight("white", 0.2));
let point = new T.PointLight("white", 1, 0, 0);
point.position.set(20, 10, 15);
scene.add(point);

// make a ground plane
let groundBox = new T.BoxGeometry(6, 0.1, 6);
let groundMesh = new T.Mesh(
    groundBox,
    new T.MeshStandardMaterial({ color: "white" })
);
// put the top of the box at the ground level (0)
groundMesh.position.y = -0.05;
scene.add(groundMesh);

let bodyMaterial = new T.MeshStandardMaterial({color:"white", metalness:0, roughness:0.8, emissive:40});
let eyeMaterial = new T.MeshStandardMaterial({color:"black", metalness:1.0, roughness:0.3, emissive:40});
let noseMaterial = new T.MeshStandardMaterial({color:"orange", metalness:0, roughness:0.3, emissive:40});

let geometry = new T.SphereGeometry(1, 20, 20);
let body = new T.Mesh(geometry, bodyMaterial);
body.position.set(0,1,0);
scene.add(body);

let geometry2 = new T.SphereGeometry(0.8, 20, 20);
let mid = new T.Mesh(geometry2, bodyMaterial);
mid.position.set(0,2.5,0);
scene.add(mid);


let geometry3 = new T.SphereGeometry(0.6, 20, 20);
let head = new T.Mesh(geometry3, bodyMaterial);
head.position.set(0,3.5,0);
scene.add(head);

let eye = new T.SphereGeometry(0.1, 20, 20);
let left = new T.Mesh(eye, eyeMaterial);
left.position.set(0.25,3.7,0.6);
scene.add(left);

let right = new T.Mesh(eye, eyeMaterial);
right.position.set(0.55,3.7,0.25);
scene.add(right);

let noseGeometry = new T.ConeGeometry(0.15, 0.8, 20, 20);
let nose = new T.Mesh(noseGeometry, noseMaterial);
nose.position.set(0.5, 3.55, 0.5);
nose.rotateZ(Math.PI/2);
nose.rotateX(3*Math.PI/4);
scene.add(nose);

let mouthGeometry = new T.TorusGeometry(0.1, 0.05, 20, 20);
let mouth = new T.Mesh(mouthGeometry, eyeMaterial);
mouth.position.set(0.45, 3.35, 0.4);
mouth.rotateX(3*Math.PI/4);
mouth.rotateY(-Math.PI/4);
mouth.rotateZ(-Math.PI)
scene.add(mouth);

let armGeometry = new T.BoxGeometry(0.1, 1.5, 0.3)
let arm = new T.Mesh(armGeometry, new T.MeshBasicMaterial({color:"brown"}));
arm.position.set(-0.3, 2.7, 0.5);
arm.rotateX(Math.PI/2);
arm.rotateZ(Math.PI/4);
arm.rotateX(-Math.PI/4)

let arm2 = new T.Mesh(armGeometry, new T.MeshBasicMaterial({color:"brown"}));
arm2.position.set(0.5, 2.7, -0.3);
arm2.rotateX(Math.PI/2);
arm2.rotateZ(Math.PI/4);
arm2.rotateX(5*Math.PI/4);

scene.add(arm);
scene.add(arm2);

document.getElementById("div1").appendChild(renderer.domElement);

let lastTimestamp; // undefined to start
let counter = 0;
  
function animate(timestamp) {
    // Convert time change from milliseconds to seconds
    let timeDelta = 0.001 * (lastTimestamp ? timestamp - lastTimestamp : 0);
    arm.rotateY(2*timeDelta);
    arm.rotateZ(timeDelta)
    arm2.rotateY(2*timeDelta);
    arm2.rotateX(timeDelta);
    lastTimestamp = timestamp;

    renderer.render(scene, camera);
    ++counter;
    window.requestAnimationFrame(animate);
}
window.requestAnimationFrame(animate);

