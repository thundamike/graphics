// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";

let laptop = new T.TextureLoader().load("../laptop.jpg");
let keys = new T.TextureLoader().load("../keys.jpg");


export class Laptop extends GrObject {
    constructor() {
        let meshes = [];
        let geo = new T.BufferGeometry();
        const vertices = new Float32Array([ 

            // make the top
            0,1,0,
            0,6.75,1,
            1,1,0,
            1,1,0,
            0,6.75,1,
            1,6.75,1,

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
        geo.setAttribute("uv", new T.BufferAttribute(uvs, 2));

        let keyboard = new T.BufferGeometry();
        const keyVerts = new Float32Array([ 
            0,1,0,
            0,1,1,
            1,1,0,
            1,1,0,
            0,1,1,
            1,1,1
        ]);

        const keyuvs = new Float32Array([
            0,1,
            0,0,
            1,1,
            1,1,
            0,0,
            1,0,
        ]);
        keyboard.setAttribute("position", new T.BufferAttribute(keyVerts, 3));
        keyboard.setAttribute("uv", new T.BufferAttribute(keyuvs, 2));



        let material = new T.MeshStandardMaterial({
            color:"gray",
            map:laptop
        });
        let keyMaterial = new T.MeshStandardMaterial({
            color:"gray",
            map:keys
        });
        geo.computeVertexNormals();
        keyboard.computeVertexNormals();
        geo.scale(3,0.1,2);
        keyboard.scale(3,0.1,2);

        meshes.push(new T.Mesh(geo, material));
        meshes.push(new T.Mesh(keyboard, keyMaterial));

        super("Laptop", meshes)
    }
}

let parentOfCanvas = document.getElementById("div1");
let world = new GrWorld({ where: parentOfCanvas });
let lap = new Laptop();
world.add(lap);
world.go();

