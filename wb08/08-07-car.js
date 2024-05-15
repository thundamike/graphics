/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

let cow = new T.TextureLoader().load("../textures/cow.png");


// define your vehicles here - remember, they need to be imported
// into the "main" program

export class Car extends GrObject {
    constructor() {
        let meshes = [];

        // wheels
        for (let i = 0; i < 4; i++) {
            let trace = new T.Shape();
            trace.ellipse(0.5,0.5,0.5,0.5,0,2*Math.PI, true,0);
            let wheelSettings = {
                depth: 0.1
            }
            let wheelGeometry = new T.ExtrudeGeometry(trace, wheelSettings);

            let wheelMaterial = new T.MeshStandardMaterial({
                color: "gray",
                roughness: 0.8, metalness: 0.3, 
            });
            let wheelMesh = new T.Mesh(wheelGeometry, wheelMaterial);
            wheelMesh.scale.x = 0.25;
            wheelMesh.scale.y = 0.25;
            wheelMesh.scale.z = 0.25;

            wheelMesh.position.x = 0.5+(i%2);
            wheelMesh.position.z = i>1 ? 1.5: 0.5;
            meshes.push(wheelMesh);

        }

        // body
        let body = new T.Shape();
        body.lineTo(0,1);
        body.lineTo(2,1);
        body.lineTo(3,0)
        body.lineTo(0,0);
        let bodySettings = {
            depth: 0.4
        }
        let bodyMaterial = new T.MeshStandardMaterial({
            color: "white",
            roughness: 0.2, metalness: 0.7, 
            map:cow
        });
        let bodyGeometry = new T.ExtrudeGeometry(body, bodySettings);
        bodyGeometry.computeVertexNormals();
        let bodyMesh = new T.Mesh(bodyGeometry, bodyMaterial);
        meshes.push(bodyMesh);
        bodyMesh.scale.x = 0.5;
        bodyMesh.scale.y = 0.5;
        bodyMesh.scale.z = 1.1;
        bodyMesh.position.z = 0.8;
        bodyMesh.position.y = 0.2;
        bodyMesh.position.x = 0.4;

        super("Car", meshes);
    }
}