import '../sass/style.scss'
import * as THREE from 'three';
import { setKeys } from './keys';
import { world } from './world';
import Debug from './debug';

export class Game {

  constructor() {
    this.clock = new THREE.Clock();
    setKeys();

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  create() {
    window.addEventListener('resize', () => {
      this.currentScene.camera.aspect = window.innerWidth / window.innerHeight;
      this.currentScene.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    document.body.appendChild(this.renderer.domElement);
  }

  update(debug) {
    this.renderer.setAnimationLoop(() => {
      world.fixedStep();
      debug.update(this.currentScene);
      const delta = this.clock.getDelta();

      this.currentScene.update(delta);
      for (const obj of Object.keys(this.currentScene.objects)) {
        const entity = this.currentScene.objects[obj];
        if (entity.update) entity.update();
      }

      this.currentScene.update(delta);
      this.renderer.render(this.currentScene, this.currentScene.camera);
    });
  }
}