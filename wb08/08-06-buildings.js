/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

let frontA = new T.TextureLoader().load("../textures/house.png");

// define your buildings here - remember, they need to be imported
// into the "main" program
export class houseA extends GrObject {
    constructor(col) {
        let geometry = new T.BufferGeometry();
    
        const vertices = new Float32Array([ 

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

                // make the roof
                0,1,0,
                0,1.5,0.5,
                1,1,0,
                1,1,0,
                0,1.5,0.5,
                1,1.5,0.5,

                1,1,1,
                1,1.5,0.5, 
                0,1,1,
                0,1,1,
                1,1.5,0.5,
                0,1.5,0.5,

                0,1,0,
                0,1,1,
                0,1.5,0.5,
                1,1,0,
                1,1.5,0.5,
                1,1,1,
            ]);
    
            const uvs = new Float32Array([
                // need to draw on the first two triangles
                // going to try to pull the coords (0.25, 0) x (0.75,1)
                0.75, 0,
                0.75, 1,
                0.25, 1,
                0.75, 0,
                0.25, 1,
                0.25, 0
            ]);
    
            geometry.setAttribute("position", new T.BufferAttribute(vertices, 3));
            geometry.setAttribute("uv", new T.BufferAttribute(uvs, 2));

            geometry.computeVertexNormals();

            let material = new T.MeshStandardMaterial({
                color: col,
                roughness: 0.8, metalness: 0.3, 
                map: frontA
            });
    
            let mesh = new T.Mesh(geometry, material);
    
            super("houseA", mesh);
        }
    }

    // define your buildings here - remember, they need to be imported
// into the "main" program
export class houseB extends GrObject {
    constructor(col) {
        let geometry = new T.BufferGeometry();
        let roof = new T.BufferGeometry();
    
        const vertices = new Float32Array([ 

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

            const roofVertices = new Float32Array([
            // make the roof
            0,1,0,
            0,1.5,0.25,
            1,1,0,
            1,1,0,
            0,1.5,0.25,
            1,1.5,0.25,

            0,1,0.5,
            0,1.5,0.75,
            1,1,0.5,
            1,1,0.5,
            0,1.5,0.75,
            1,1.5,0.75,

            1,1,0.5,
            1,1.5,0.25, 
            0,1,0.5,
            0,1,0.5,
            1,1.5,0.25,
            0,1.5,0.25,

            1,1,1,
            1,1.5,0.75, 
            0,1,1,
            0,1,1,
            1,1.5,0.75,
            0,1.5,0.75,

            0,1,0,
            0,1,0.5,
            0,1.5,0.25,
            1,1,0,
            1,1.5,0.25,
            1,1,0.5,

            0,1,0.5,
            0,1,1,
            0,1.5,0.75,
            1,1,0.5,
            1,1.5,0.75,
            1,1,1]);
    
            const uvs = new Float32Array([
                // need to draw on the first two triangles
                // going to try to pull the coords (0.25, 0) x (0.75,1)
                0.75, 0,
                0.75, 1,
                0.25, 1,
                0.75, 0,
                0.25, 1,
                0.25, 0
            ]);
    
            geometry.setAttribute("position", new T.BufferAttribute(vertices, 3));
            roof.setAttribute("position", new T.BufferAttribute(roofVertices, 3));


            geometry.setAttribute("uv", new T.BufferAttribute(uvs, 2));

            geometry.computeVertexNormals();
            roof.computeVertexNormals();

            let material = new T.MeshStandardMaterial({
                color: col,
                roughness: 0.8, metalness: 0.3, 
                map: frontA
            });

            let roofMaterial = new T.MeshStandardMaterial({
                color: "brown",
                roughness: 0.8, metalness: 0.2, 
            });
    
            let mesh = new T.Mesh(geometry, material);

            let mesh2 = new T.Mesh(roof, roofMaterial);

            let meshes = []
            meshes.push(mesh);
            meshes.push(mesh2);
    
            super("houseB", meshes);
        }
    }

    export class tree extends GrObject {
        constructor() {
            let meshes = []

            let level1 = new T.ConeGeometry(1.5,2.8);
            level1.translate(0,3,0);
            let mat1 = new T.MeshStandardMaterial({color: "green"});
            meshes.push(new T.Mesh(level1, mat1));

            let trunk = new T.CylinderGeometry(0.5,0.5,3);
            trunk.translate(0,0.7,0);
            let mat2 = new T.MeshStandardMaterial({color: "brown"});
            meshes.push(new T.Mesh(trunk, mat2));
            
            
            super("tree", meshes);
        }
        

    }



