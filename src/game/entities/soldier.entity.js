import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import Entity from '../../engine/entity';
import { keys } from '../../engine/keys';
import { Animator } from '../../engine/animator';

export default class Soldier extends Entity {

  name = 'Soldier';
  model;

  constructor() {
    super();
  }

  create() {
    console.log('carregando');
    this.loadModel('public/Soldier.glb', (model, anims) => this.setModel(model, anims));
  }

  setModel(model, anims) {
    this.model = model;
    this.game.currentScene.add(this.model);
    this.animator = new Animator(this.model, anims);
    console.log('carregado');
  }

  update(dt) {
    if (!this.animator) return;
    this.animator.update(dt);

    let anim = 'Idle';

    if (keys.w) {
      anim = 'Walk';
    }

    this.animator.play(anim);
  }
}
