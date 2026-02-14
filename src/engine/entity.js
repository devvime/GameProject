import * as THREE from 'three';
import Engine from './engine';
import { LoadModel } from './loader';
import { world } from './world';

export default class Entity extends THREE.Mesh {

  name = ''
  loadModel = LoadModel;
  game = Engine.getGame();

  constructor() {
    super();
    this.receiveShadow = true;
    this.castShadow = true;
    this.isGrounded = true;
  }

  updateModel(y = 0) {
    if (!this.model) return;
    this.model.position.copy(this.position);
    this.model.quaternion.copy(this.quaternion);
    this.model.position.y = this.model.position.y - y
  }

  addBody({
    type = 'box',
    size = [1, 1, 1],
    pos = [0, 0, 0],
    rot = [0, 0, 0],
    move = true,
    density = 1,
    friction = 0.2,
    restitution = 0,
    belongsTo = 1,
    collidesWith = 0xffffffff
  }) {
    this.body = world.add({
      type: type, // type of shape : sphere, box, cylinder 
      size: size, // size of shape
      pos: pos, // start position in degree
      rot: rot, // start rotation in degree
      move: move, // dynamic or statique
      density: density,
      friction: friction,
      restitution: restitution,
      belongsTo: belongsTo, // The bits of the collision groups to which the shape belongs.
      collidesWith: collidesWith // The bits of the collision groups with which the shape collides.
    });
  }

  updateBody() {
    this.position.copy(this.body.getPosition());
    this.quaternion.copy(this.body.getQuaternion());
  }

  create() { }

  update(dt) { }
}