import '../sass/style.scss'
import * as THREE from 'three';
import { setKeys } from './keys';
import { world } from './world';

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
      debug.update(this.currentScene);

      const dt = this.clock.getDelta();
      world.step(1 / 60, dt);

      for (const obj of Object.keys(this.currentScene.objects)) {
        const entity = this.currentScene.objects[obj];
        if (entity.update) entity.update(dt);
      }

      this.currentScene.update(dt);
      this.renderer.render(this.currentScene, this.currentScene.camera);
    });
  }
}