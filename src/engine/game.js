import '../sass/style.scss'
import * as THREE from 'three';
import Engine from './engine';
import scenes from "../game/setScenes"
import { setKeys } from './keys';
import { world } from './world';
import Debug from './debug';

export class Game {

  constructor() {
    this.clock = new THREE.Clock();
    setKeys();
    this.scenes = scenes;
    Engine.set(this);
    this.currentScene = new this.scenes['main']();
    this.currentScene.create();

    this.setScene = (scene) => {
      this.currentScene = new this.scenes[scene]();
      this.currentScene.create();
    }

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.shadowMap.enabled = true;
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.debug = new Debug(this.currentScene.camera, this);
    this.debug.add(this.currentScene.camera);

    this.renderer.setAnimationLoop(() => {
      world.fixedStep();
      this.debug.update(this.currentScene);
      const delta = this.clock.getDelta();
      this.currentScene.update(delta);
      this.renderer.render(this.currentScene, this.currentScene.camera);
    });

    window.addEventListener('resize', () => {
      this.currentScene.camera.aspect = window.innerWidth / window.innerHeight;
      this.currentScene.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    document.body.appendChild(this.renderer.domElement);
  }
}