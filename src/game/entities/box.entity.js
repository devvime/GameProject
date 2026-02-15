import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import Entity from '../../engine/entity';
import { CharacterController } from '../../engine/CharacterController';
import { InputController } from '../../engine/InputController';

export default class Box extends Entity {

  name = 'box';

  constructor() {
    super();

    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });

    this.addBody({
      mass: 5,
      shape: new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)),
      fixedRotation: true
    });

    this.body.position.set(0, 1, 0);


    // this.player = new CharacterController(this.body, {
    //   speed: 7
    // });

    // this.input = new InputController(this.player);
  }

  update(dt) {
    this.updateBody();

    // this.input.update()
    // this.player.update(dt)
  }


}