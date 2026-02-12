import THREEx3 from 'three-x3';
import { settings } from '../settings';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import CannonDebugger from 'cannon-es-debugger';
import { world } from './world';
import Stats from 'three/addons/libs/stats.module.js';

export default class Debug {

  stats = new Stats();

  constructor(camera, engine) {
    if (settings.debug && engine.currentScene) {
      const grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000);
      engine.currentScene.add(grid);
      this.x3 = new THREEx3({
        THREE,
        OrbitControls,
        camera: camera,
        renderer: engine.renderer,
        scene: engine.currentScene,
      }, { grid: false });
      this.cannonDebugger = CannonDebugger(engine.currentScene, world);
      document.body.appendChild(this.stats.dom);
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
    if (settings.debug) {
      this.x3.add(element, options);
    }
  }

}