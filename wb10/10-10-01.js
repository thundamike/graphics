/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";
import * as SimpleObjects from "../libs/CS559-Framework/SimpleObjects.js";
import { shaderMaterial } from "../libs/CS559-Framework/shaderHelper.js";

{
  let mydiv = document.getElementById("div1");

  let world = new GrWorld({ width: mydiv ? 600 : 800, where: mydiv });
  
  // Replace these files with your own shaders!
  
  let shaderMat = shaderMaterial("./shaders/10-10-01.vs", "./shaders/10-10-01.fs", {
    side: T.DoubleSide,
    uniforms: {
      time: {value: 0.0}, 
      resolution: {value: new T.Vector2(100,100)}
    },
  });

  let sphere = new SimpleObjects.GrSphere({ x: -2, y: 1, material: shaderMat });
  let sphereTime = 0;
  sphere.stepWorld = function(delta) {
    sphereTime += delta;
    shaderMat.uniforms.time.value = sphereTime * 0.001; // pass in the time in seconds
  }

  world.add(sphere);
  world.add(
    new SimpleObjects.GrSquareSign({ x: 2, y: 1, size: 1, material: shaderMat })
  );

  world.go();
}
