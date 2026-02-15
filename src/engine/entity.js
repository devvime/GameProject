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
    if (!this.body) return;
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
    // this.model.quaternion.copy(this.quaternion);
    this.model.position.y = this.model.position.y - y
  }

  checkGround() {
    const origin = this.body.position;
    const radius = 0.20;
    const rayLength = 1.15;
    const offsets = [
      [0, 0],           // centro
      [radius, 0],     // direita
      [-radius, 0],     // esquerda
      [0, radius],     // frente
      [0, -radius],     // trás
    ];

    let grounded = false;

    for (const [ox, oz] of offsets) {

      const from = new CANNON.Vec3(
        origin.x + ox,
        origin.y,
        origin.z + oz
      );
      const to = new CANNON.Vec3(
        origin.x + ox,
        origin.y - rayLength,
        origin.z + oz
      );
      const result = new CANNON.RaycastResult();

      if (world.raycastClosest(from, to, {}, result)) {
        if (result.hitNormalWorld.y > 0.5) {
          grounded = true;
          break;
        }
      }
    }

    this.isGrounded = grounded;
  }


  create() { }

  update(dt) { }
}