import * as THREE from 'three';
import { camera } from './camera';
import Engine from './engine';
import { keys } from './keys';
import DefaultSky from './sky';

export default class Scene extends THREE.Scene {

  sky = new DefaultSky();
  sun = new THREE.DirectionalLight();
  ambientLight = new THREE.AmbientLight();
  objects = {};

  constructor() {
    super();
    this.setWorld();
    this.camera = camera;
    this.game = Engine.getGame();
    this.keys = keys;

    this.camera.position.x = -3.35;
    this.camera.position.y = 4.40;
    this.camera.position.z = 5.35;
  }

  setWorld() {
    this.fog = new THREE.Fog(0x5c4740, 20, 100);

    this.sun.position.set(1, 2, 3);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.width = 1024;
    this.sun.shadow.mapSize.height = 1024;

    this.ambientLight.intensity = 0.5

    this.add(this.sky);
    this.add(this.sun);
    this.add(this.ambientLight);
  }

}