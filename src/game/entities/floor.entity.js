import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import Entity from '../../engine/entity'

export default class Floor extends Entity {

  constructor() {
    super();

    this.geometry = new THREE.BoxGeometry(5, 0.2, 5);
    this.material = new THREE.MeshLambertMaterial({ color: 0xcccccc });
    this.addStaticBody(new CANNON.Box(new CANNON.Vec3(2.5, 0.1, 2.5)));
  }


}