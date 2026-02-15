import * as CANNON from 'cannon-es';
import * as THREE from 'three';
import Entity from '../../engine/entity';
import { Animator } from '../../engine/animator';
import { PlayerController } from '../components/Player.component';
import { PlayerSkinController } from '../components/PlayerSkin.component';
import CameraTarget from './cameraTarget.entity';
import { CameraFollow } from '../components/CameraFollow.component';
import { camera } from '../../engine/camera';

export default class Soldier extends Entity {

  name = 'Soldier';

  constructor() {
    super();
  }

  async create() {
    const { model, animations } = await this.loadModel('src/assets/Soldier.glb');
    this.model = model;
    this.game.currentScene.add(this.model);
    this.animator = new Animator(this.model, animations);
    this.setBody();
    this.setComponents();
  }

  setBody() {
    this.addBody({
      mass: 80,
      shape: new CANNON.Box(new CANNON.Vec3(0.2, 0.85, 0.2)),
      fixedRotation: true
    });
    this.body.position.set(0, 1, 0);
  }

  setComponents() {
    this.cameraTarget = new CameraTarget(this.model);
    this.cameraFollow = new CameraFollow(camera, this.cameraTarget, {
      offset: new THREE.Vector3(0, 1.8, 3),
      smooth: 0.1
    });
    this.controller = new PlayerController(this);
    this.skinController = new PlayerSkinController(this);
  }

  update(dt) {
    this.updateModel(0.85);
    if (this.controller) this.controller.update(dt);
    if (this.skinController) this.skinController.update(dt);
    if (this.cameraTarget) this.cameraTarget.update(dt);
    if (this.cameraFollow) this.cameraFollow.update(dt);
  }
}
