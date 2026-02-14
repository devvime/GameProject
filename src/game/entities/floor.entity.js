import * as THREE from 'three';
import Entity from '../../engine/entity'

export default class Floor extends Entity {

  name = 'floor';

  constructor() {
    super();

    this.geometry = new THREE.BoxGeometry(20, 0.1, 20);
    this.material = new THREE.MeshLambertMaterial({ color: 0xcccccc });

    this.addBody({ size: [20, 0.1, 20], move: false });
  }

  update(dt) {
    this.updateBody({});
  }


}