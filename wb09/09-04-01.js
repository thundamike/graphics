// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";

let earth = new T.TextureLoader().load("../earth.jpg");
let earthbump = new T.TextureLoader().load("../earthBump.jpg");

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

class FakeSkybox extends GrObject {
    constructor() {
        let sphere = new T.SphereGeometry(100);
        let mat = new T.MeshBasicMaterial({
                side: T.DoubleSide,
                map: new T.TextureLoader().load("../sky_sphere.jpg")       
        });

        let fakeSkybox = new T.Mesh(sphere, mat);
        super("FakeSkybox", fakeSkybox)
    }
}

let bumpSphere = new BumpSphere("bump");
bumpSphere.setPos(0,1,0);

let parentOfCanvas = document.getElementById("div1");
let world = new GrWorld({ where: parentOfCanvas });
world.add(new FakeSkybox());
world.add(bumpSphere);

world.go();

