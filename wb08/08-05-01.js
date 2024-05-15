/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

// define a class of Dice here - it should be a subclass of GrObject

let world = new GrWorld();
let dots = new T.TextureLoader().load("../images/dice_texture.png");

/**
 * Die object definition
 */
class Die extends GrObject {
    constructor() {
        let shape = new T.Shape();
         shape.lineTo(0,1);
         shape.bezierCurveTo(0,1.25, 0.125,1.25, 0.25,1.25);
         shape.lineTo(1.25,1.25);
         shape.bezierCurveTo(1.5,1.25, 1.5,1.125, 1.5,1);
         shape.lineTo(1.5, 0);
         shape.bezierCurveTo(1.5,-0.25, 1.375,-0.25, 1.25,-0.25);
         shape.lineTo(0.25, -0.25);
         shape.bezierCurveTo(0,-0.25, 0,-0.125, 0,0);
         
        let dieSettings = {
            depth: 1.25
        }
        let geometry = new T.ExtrudeGeometry(shape, dieSettings);

        let material = new T.MeshStandardMaterial({
            color: "white",
            roughness: 0.8, metalness: 0.3, 
            map:dots
        });


        let mesh = new T.Mesh(geometry, material);

        mesh.scale.set(0.75, 0.75, 0.75);
        mesh.position.y = 0.25;

        super("Die", mesh);
    }
}

/**
 * Die object definition
 */
class Die2 extends GrObject {
    constructor(rotate=false) {
        let geometry = new T.BufferGeometry();

        const vertices = new Float32Array([ 
            
            1,0,0, 
            0,1,0,
            1,1,0,
            0,0,0,
            0,1,0,
            1,0,0, // face 1

            0,1,0,
            0,0,1,
            0,1,1,
            0,0,0,
            0,0,1,
            0,1,0, // face 2  
        
            1,0,1,
            1,1,1,
            0,1,1,
            1,0,1,
            0,1,1,
            0,0,1, // face 3
        
            1,0,0,
            1,1,0,
            1,1,1,
            1,0,0,
            1,1,1,
            1,0,1, // face 4

            0,1,0,
            0,1,1,
            1,1,0,
            1,1,1,
            1,1,0, 
            0,1,1,  // face 5

            0,0,1,
            0,0,0,
            1,0,0,
            1,0,1,
            0,0,1,
            1,0,0
        ])

        const uvs = new Float32Array([
            
            0.3,0.7,
            0.7,1,
            0.3,1, 
            0.7,0.7,
            0.7,1,
            0.3,0.7,  // face 1 
            
            0.3,0.3,
            0.7,0,
            0.7,0.3,
            0.3,0,
            0.7,0, 
            0.3,0.3, // face 2 

            0.4,0.35,
            0.4,0.65,
            0,0.65,
            0.4,0.35,
            0,0.65,
            0,0.35, // face 3

            1,0.35,
            1,0.65,
            0.7,0.65,
            1,0.35,
            0.7,0.65,
            0.7,0.35, // face 4

            0.7,0.3,
            0.7,0,
            1,0.3,
            1,0,
            1,0.3,
            0.7,0, // face 5

            0.4,0.4,
            0.4,0.6,
            0.6,0.6,
            0.6,0.4,
            0.4,0.4,
            0.6,0.6  // face 6


        ])

        geometry.setAttribute("position", new T.BufferAttribute(vertices, 3));
        geometry.setAttribute("uv", new T.BufferAttribute(uvs, 2));

        geometry.computeVertexNormals();
        let material = new T.MeshStandardMaterial({
            color: "white",
            roughness: 0.8, metalness: 0.3, 
            map:dots
        });

        let mesh = new T.Mesh(geometry, material);
        if (rotate) {
            mesh.rotateZ(Math.PI/2);
        }

        super("Die2", mesh);
    }
}
  

let die2 = new Die2();
let die3 = new Die2(true);
die3.setPos(3,0,0);

// put the two dice into the world Here
// don't forget to orient them so they have different numbers facing up
world.add(die2);
world.add(die3);
world.go();

