import * as THREE from 'three';
import Engine from './engine';
import { LoadModel } from './loader';
import { Loading } from './loading';
import * as RAPIER from '@dimforge/rapier3d';

export default class Entity extends THREE.Mesh {

  name = ''
  loadModel = LoadModel;
  game = Engine.getGame();

  constructor() {
    super();
    this.loading = Loading;
    this.receiveShadow = true;
    this.castShadow = true;
    this.isGrounded = true;
    this.model = undefined;
  }

  addStaticBody(x, y, z) {
    this.body = window.world.createCollider(RAPIER.ColliderDesc.cuboid(x, y, z));
  }

  addBody() {
    this.body = window.world.createRigidBody(
      RAPIER.RigidBodyDesc.dynamic().setTranslation(-3, 3, 0)
    );
    this.collider = window.world.createCollider(
      RAPIER.ColliderDesc.cuboid(0.5, 0.5, 0.5),
      this.body
    );
  }

  updateBody() {
    const position = this.body.translation()
    const rotation = this.body.rotation()

    this.position.set(position.x, position.y, position.z)
    this.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w)
  }

  create() { }

  update(dt) { }
}