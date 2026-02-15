import * as THREE from 'three';
import Entity from '../../engine/entity';

export default class CameraTarget extends Entity {

  name = 'CameraTarget';

  constructor(player) {
    super();
    this.player = player
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
  }

  update(dt) {
    this.position.copy(this.player.position);
    this.position.y = this.position.y + 1;
  }


}