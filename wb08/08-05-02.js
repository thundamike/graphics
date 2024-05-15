/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

// define a class of Domino here - it should be a subclass of GrObject

let world = new GrWorld();
let dots = new T.TextureLoader().load("../images/dice_texture.png");
let texture = new T.MeshStandardMaterial({map:dots});

/**
 * use directly - won't show well
 */
class Domino extends GrObject {
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
         
        let dominoSettings = {
            depth: 0.2
        }
        let geometry = new T.ExtrudeGeometry(shape, dominoSettings);

        let material = new T.MeshStandardMaterial({
            color: "white",
            roughness: 0.8, metalness: 0.3, 
            map:dots
        });

        let mesh = new T.Mesh(geometry, material);
        mesh.scale.set(1, 1.5, 1.5);
        mesh.position.y = 0.5;

        super("Die", mesh);
    }
}


/**
 * Die object definition
 */
class Domino2 extends GrObject {
    constructor(number=0) {
        let geometry = new T.BufferGeometry();

        const vertices = new Float32Array([ 
            1,1,0.5,
            1,2,0.5,
            0,2,0.5,
            1,1,0.5,
            0,2,0.5,
            0,1,0.5,

            1,0,0.5,
            1,1,0.5,
            0,1,0.5,
            1,0,0.5,
            0,1,0.5,
            0,0,0.5,

            1,0,0, 
            0,2,0,
            1,2,0,
            0,0,0,
            0,2,0,
            1,0,0, // face 1
            
            0,2,0,
            0,0,0.5,
            0,2,0.5,
            0,0,0,
            0,0,0.5,
            0,2,0, // face 2 

            1,0,0,
            1,2,0,
            1,2,0.5,
            1,0,0,
            1,2,0.5,
            1,0,0.5, // face 4

            0,2,0,
            0,2,0.5,
            1,2,0,
            1,2,0.5,
            1,2,0, 
            0,2,0.5
        ])

        let uvs;

        if (number == 1) {
            uvs = new Float32Array([
                
                0.6,0.4,
                0.6,0.6,
                0.4,0.6,
                0.6,0.4,
                0.4,0.6,
                0.4,0.4, 

                0.6,0.4,
                0.6,0.6,
                0.4,0.6,
                0.6,0.4,
                0.4,0.6,
                0.4,0.4
            
            ])
        }

        if (number == 6) {
            uvs = new Float32Array([
                
                1,0,
                1,0.3,
                0.7,0.3,
                1,0,
                0.7,0.3,
                0.7,0, 

                1,0,
                1,0.3,
                0.7,0.3,
                1,0,
                0.7,0.3,
                0.7,0
            
            ])
        }

        if (number == 5) {
            uvs = new Float32Array([
                
                1,0.4,
                1,0.7,
                0.7,0.7,
                1,0.4,
                0.7,0.7,
                0.7,0.4, 

                1,0.4,
                1,0.7,
                0.7,0.7,
                1,0.4,
                0.7,0.7,
                0.7,0.4
            
            ])
        }

        if (number == 2) {
            uvs = new Float32Array([
                
                0.3,0.4,
                0.3,0.7,
                0,0.7,
                0.3,0.4,
                0,0.7,
                0,0.4, 

                0.3,0.4,
                0.3,0.7,
                0,0.7,
                0.3,0.4,
                0,0.7,
                0,0.4
            
            ])

        }

        geometry.setAttribute("position", new T.BufferAttribute(vertices, 3));
        geometry.setAttribute("uv", new T.BufferAttribute(uvs, 2));

        geometry.computeVertexNormals();
        let material = new T.MeshStandardMaterial({
            color: "white",
            roughness: 0.8, metalness: 0.3, 
            map:dots
        });

        let mesh = new T.Mesh(geometry, material);

        if (number == 1) {
            mesh.rotateY(-Math.PI/4);
        }

        if (number == 5) {
            mesh.rotateY(-Math.PI/2);
        }

        if (number == 2) {
            mesh.rotateY(-3*Math.PI/4);
        }

        super("Die2", mesh);
    }
}


let domino = new Domino2(6);

let domino2 = new Domino2(1);
domino2.setPos(-0.75,0,0.75);

let domino3 = new Domino2(5);
domino3.setPos(-1.5,0,1);

let domino4 = new Domino2(2);
domino4.setPos(-2.25, 0, 0.75);


world.add(domino);
world.add(domino2);
world.add(domino3);
world.add(domino4);
world.go();
