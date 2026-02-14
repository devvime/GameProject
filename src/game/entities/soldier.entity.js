import * as THREE from 'three';
import Entity from '../../engine/entity';
import { Animator } from '../../engine/animator';
import { PlayerController } from '../components/PlayerController';

export default class Soldier extends Entity {

  name = 'Soldier';

  constructor() {
    super();
  }

  async create() {
    const { model, animations } = await this.loadModel('public/Soldier.glb');
    this.model = model;
    this.game.currentScene.add(this.model);
    this.animator = new Animator(this.model, animations);
    this.controller = new PlayerController(this);
  }

  update(dt) {
    this.updateModel();
    if (this.controller) this.controller.update(dt);
  }
}
