/*jshint esversion: 6 */
// @ts-check

// get things we need
import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { AutoUI } from "../libs/CS559-Framework/AutoUI.js";
import { GrCrane, GrExcavator, DumpTruck, TruckCrane } from "./07-09-constructionobjects.js";

let cDiv = document.getElementById("construction");
let world = new GrWorld({ groundplanesize: 10, where: cDiv });


let truckCrane = new TruckCrane();
world.add(truckCrane);
let t_ui = new AutoUI(truckCrane, 300, cDiv, 1, true);

let dozer = new DumpTruck();
world.add(dozer);
let d_ui = new AutoUI(dozer, 300, cDiv, 1, true);

let crane = new GrCrane({ x: 2, z: -2 });
world.add(crane);
let c_ui = new AutoUI(crane, 300, cDiv, 1, true);

let excavator = new GrExcavator({ x: -2, z: 2 });
world.add(excavator);
let e_ui = new AutoUI(excavator, 300, cDiv, 1, true);
e_ui.set("x", 6);
e_ui.set("z", 3);
e_ui.set("theta", 36);

// let excavator2 = new GrExcavator({ x: -2, z: 2 });
// world.add(excavator2);
// let e_ui2 = new AutoUI(excavator, 300, cDiv, 1, true);
// e_ui2.set("x", 6);
// e_ui2.set("z", 3);
// e_ui2.set("theta", 36);

world.go();
