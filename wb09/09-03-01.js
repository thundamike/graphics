// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";

let earthbump = new T.TextureLoader().load("../earthBump.jpg");
let earth = new T.TextureLoader().load("../earth.jpg");


export class BumpSphere extends GrObject {
    constructor(map) {
        let sphere = new T.SphereGeometry(1);
        let mat;

        if (map == "bump") {
            mat = new T.MeshPhongMaterial({
                color:"lightblue",
                bumpMap:earthbump
            });
        }

        if (map == "normal") {
            mat = new T.MeshPhongMaterial({
                color:"lightblue",
                normalMap:earth
            });
        }
     
        let bumpSphere = new T.Mesh(sphere, mat);
        if (map == "normal") bumpSphere.rotateY(3*Math.PI/2);
        super("BumpSphere", bumpSphere)
    }
}


let parentOfCanvas = document.getElementById("div1");
let world = new GrWorld({ where: parentOfCanvas });

let bumpSphere = new BumpSphere("bump");
let normalSphere = new BumpSphere("normal");

bumpSphere.setPos(-1.5,1,0);
normalSphere.setPos(1.5,1,0);

world.add(bumpSphere);
world.add(normalSphere);
world.go();

