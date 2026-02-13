import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { world } from './world';
import Engine from './engine';
import { LoadModel } from './loader';

export default class Entity extends THREE.Mesh {

  name = ''
  loadModel = LoadModel;
  game = Engine.getGame();

  constructor() {
    super();
    this.receiveShadow = true;
    this.castShadow = true;
    this.isGrounded = false;
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
    this.checkGround();
  }

  updateStaticBody() {
    this.body.position.copy(this.position);
    this.body.quaternion.copy(this.quaternion);
  }

  updateModel(y = 0) {
    if (!this.model) return;
    this.updateBody();
    this.model.position.copy(this.position);
    this.model.quaternion.copy(this.quaternion);
    this.model.position.y = this.model.position.y - y
  }

  checkGround() {
    const from = this.body.position;
    const to = new CANNON.Vec3(from.x, from.y - 1.1, from.z);

    const result = new CANNON.RaycastResult();

    const hit = world.raycastClosest(from, to, {}, result);

    if (hit) {
      const normal = result.hitNormalWorld;
      this.isGrounded = normal.y > 0.5;
    } else {
      this.isGrounded = false;
    }
  }

  create() { }

  update(dt) { }
}