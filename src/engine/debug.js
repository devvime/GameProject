import THREEx3 from 'three-x3';
import { settings } from '../settings';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import CannonDebugger from 'cannon-es-debugger';
import { world } from './world';

export default class Debug {

  constructor(camera, engine) {
    if (settings.debug && engine.currentScene) {
      this.x3 = new THREEx3({
        THREE,
        OrbitControls,
        camera: camera,
        renderer: engine.renderer,
        scene: engine.currentScene
      });
      this.cannonDebugger = CannonDebugger(engine.currentScene, world);
    }
  }

  update(currentScene) {
    if (settings.debug && currentScene) {
      this.x3.tick();
      this.x3.fps(() => { });
      this.cannonDebugger.update();
    }
  }

  add(element, options) {
    this.x3.add(element, options);
  }

}