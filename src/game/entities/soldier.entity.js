import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import Entity from '../../engine/entity';
import { Animator } from '../../engine/animator';
import { PlayerController } from '../components/PlayerController';

export default class Soldier extends Entity {

  name = 'Soldier';

  constructor() {
    super();
  }

  create() {
    this.loadModel(
      'public/Soldier.glb',
      (model, anims) => this.setModel(model, anims)
    );
  }

  setModel(model, anims) {
    this.model = model;
    this.game.currentScene.add(this.model);
    this.animator = new Animator(this.model, anims);
    this.setBody();
    this.controller = new PlayerController(this);
  }

  setBody() {
    this.addBody({
      mass: 80,
      shape: new CANNON.Box(new CANNON.Vec3(0.2, 0.85, 0.2)),
      fixedRotation: true
    });
    this.body.position.set(0, 1, 0);
  }

  update(dt) {
    this.updateModel(0.85);
    if (this.controller) this.controller.update(dt);
  }
}
