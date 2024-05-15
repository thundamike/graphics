// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";

const CubeMap = new T.CubeTextureLoader().load([
    "../mtn.png","../mtn2.png", 
    "../mtn3.png", "../mtn4.png", 
    "../mtn.png", "../mtn.png"
]);

class EnvTorus extends GrObject {
    constructor() {
        let torusGeo = new T.TorusGeometry(1);
        let torusMat = new T.MeshBasicMaterial({
        envMap: CubeMap
        });
        let torus = new T.Mesh(torusGeo, torusMat);
        torus.rotateX(Math.PI/2);
        torus.position.y = 0.5;
        super("EnvTorus", torus);
    }
    
}
let parentOfCanvas = document.getElementById("div1");
let world = new GrWorld({ where: parentOfCanvas });
world.scene.background = CubeMap;
world.add(new EnvTorus());
world.go();

