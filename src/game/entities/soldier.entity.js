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

    this.addBody({ pos: [0, 2, 0], size: [1, 1.5, 1] });
  }

  update(dt) {
    this.updateBody({ model: true, y: 0.75 });
    if (this.controller) this.controller.update(dt);
  }
}
