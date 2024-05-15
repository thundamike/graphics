/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";

// get things we need
import { GrWorld }  from "../libs/CS559-Framework/GrWorld.js";
import {GrSphere, GrTorusKnot} from "../libs/CS559-Framework/SimpleObjects.js";


const CubeMap = new T.CubeTextureLoader().load([
  "../mtn.png","../mtn2.png", 
  "../mtn3.png", "../mtn4.png", 
  "../mtn.png", "../mtn.png"
]);


function test() {

    let world = new GrWorld();
    let cubeTexture = CubeMap;
    world.scene.background = CubeMap;

    let mat = new T.MeshStandardMaterial({ envMap: cubeTexture, metalness:.8, roughness:0.1 });

    let knot = new GrTorusKnot({x:0, y:.5, z:1, color:"cyan"});
    knot.setPos(0,2,2);
    knot.setScale(0.5,0.5,0.5);
    world.add(knot);
    let t=0;
    knot.stepWorld = function(delta) { 
      t+=delta; 
      knot.objects[0].position.x = 3*Math.sin(t/500);
      knot.objects[0].position.z = 3*Math.cos(t/500);
      knot.objects[0].rotateX(delta/1000*Math.PI)
    }

    // use CS 559 demo method of generating the cubecam / render target
    let cubeRenderTarget = new T.WebGLCubeRenderTarget(128, { generateMipmaps: true, minFilter: T.LinearMipmapLinearFilter } );
    let cubecam = new T.CubeCamera(1,1000,cubeRenderTarget);
    cubecam.position.y = 2;
    mat.envMap = cubecam.renderTarget.texture;

    let sphere = new GrSphere({ x:2, y:2, size:1, material: mat});
    sphere.setPos(0,2,0);
    world.add(sphere);

    world.go({

        // use the CS 559 demo predraw function for dynamically updating the 
        // environment maps
        predraw: function() {
         
            let oldObjs = world.scene.children;
           
            world.scene.children = world.scene.children.filter(
                // @ts-ignore
                ob => !(ob.material == mat)
            );
           
            cubecam.update(world.renderer,world.scene);
            world.scene.children = oldObjs;
        }
    });
}

test();
