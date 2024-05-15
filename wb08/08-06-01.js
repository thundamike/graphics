/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { houseA } from "../for_students/08-06-buildings.js";
import { houseB } from "../for_students/08-06-buildings.js";
import { tree } from "../for_students/08-06-buildings.js";



// your buildings are defined in another file... you should import them
// here

let world = new GrWorld();

// place your buildings and trees into the world here
let house1 = new houseA("pink");
house1.setScale(1.5,1,1);
world.add(house1);

let house2 = new houseB("cyan");
house2.setPos(-3,0,0);
world.add(house2);

for (let i = 0; i < 5; i++) {
    let Tree = new tree();
    Tree.setPos(-3+i,0,-2);
    Tree.setScale(0.25,0.25,0.25);
    world.add(Tree);

}



world.go();


