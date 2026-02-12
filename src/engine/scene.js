import * as THREE from 'three';
import { camera } from './camera';
import Engine from './engine';
import { keys } from './keys';
import DefaultSky from './sky';

export default class Scene extends THREE.Scene {

  sky = new DefaultSky();
  sun = new THREE.DirectionalLight();
  ambientLight = new THREE.AmbientLight();

  constructor() {
    super();
    this.setWorld();
    this.camera = camera;
    this.game = Engine.get();
    this.keys = keys;
  }

  setWorld() {
    this.sun.position.set(1, 2, 3);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.width = 1024;
    this.sun.shadow.mapSize.height = 1024;

    this.ambientLight.intensity = 0.5

    this.add(this.sky);
    this.add(this.sun);
    this.add(this.ambientLight);
  }

  create() { }

  update(dt) { }

}