import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { world } from './world';

export default class Entity extends THREE.Mesh {

  name = ''
  loader = new GLTFLoader();

  constructor() {
    super();
    this.receiveShadow = true;
    this.castShadow = true;
  }

  addStaticBody(shape) {
    this.body = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape
    });
    world.addBody(this.body);
  }

  addBody(options) {
    this.body = new CANNON.Body(options);
    world.addBody(this.body);
  }

  updateBody() {
    this.position.copy(this.body.position);
    this.quaternion.copy(this.body.quaternion);
  }

  updateStaticBody() {
    this.body.position.copy(this.position);
    this.body.quaternion.copy(this.quaternion);
  }

  create() { }

  update(dt) { }
}