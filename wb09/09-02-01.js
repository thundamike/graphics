// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";

let brick = new T.TextureLoader().load("../brick.jpg");
let brickD = new T.TextureLoader().load("../brick_diffuse.jpg");



export class Cube extends GrObject {
    constructor() {
        let meshes = [];
        let geo = new T.BufferGeometry();
        const vertices = new Float32Array([ 

            0,1,0,
            0,1,1,
            1,1,0,
            1,1,0,
            0,1,1,
            1,1,1,

            1,0,1,
            1,1,1,
            0,1,1,
            1,0,1,
            0,1,1,
            0,0,1,
            1,1,1,
            1,1,1,
            0,1,1,
            1,1,1,
            0,1,1,
            0,1,1,
            1,0,0, 
            0,1,0,
            1,1,0,
            0,0,0,
            0,1,0,
            1,0,0, 
            0,1,0,
            0,0,1,
            0,1,1,
            0,0,0,
            0,0,1, 
            0,1,0,
            1,0,0,
            1,1,0,
            1,1,1,
            1,0,0,
            1,1,1,
            1,0,1,
        ]);

        const uvs = new Float32Array([
            0,1,
            0,0,
            1,1,
            1,1,
            0,0,
            1,0,
        ]);
        geo.setAttribute("position", new T.BufferAttribute(vertices, 3));
        geo.setAttribute("uv", new T.BufferAttribute(uvs,2));

        let material = new T.MeshStandardMaterial({
            color:"maroon",
            roughnessMap:brick, 
            map:brickD
        });
    
        geo.computeVertexNormals();
 
        meshes.push(new T.Mesh(geo, material));

        super("Laptop", meshes)
    }

}

let parentOfCanvas = document.getElementById("div1");
let world = new GrWorld({ where: parentOfCanvas });
let cube = new Cube();
world.add(cube);
world.go();