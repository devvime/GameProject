import * as THREE from 'three';
import Entity from '../../engine/entity';

export default class Box extends Entity {

  name = 'box';

  constructor() {
    super();

    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });

    this.position.set(-3, 3, 0);
    this.addBody();
  }

  update(dt) {
    this.updateBody();
  }


}