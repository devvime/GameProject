import * as THREE from 'three';
import { camera } from "../../engine/camera";
import { keys } from "../../engine/keys";

export class PlayerSkinController {

  constructor(player) {
    this.player = player;
    this.targetQuat = new THREE.Quaternion();
    this.lookMatrix = new THREE.Matrix4();
    this.up = new THREE.Vector3(0, 1, 0);
    this.zero = new THREE.Vector3(0, 0, 0);
  }

  turn() {
    const input = new THREE.Vector3();

    if (keys["w"]) input.z -= 1;
    if (keys["s"]) input.z += 1;
    if (keys["a"]) input.x -= 1;
    if (keys["d"]) input.x += 1;

    if (input.lengthSq() === 0) return;

    input.normalize();

    const camDir = new THREE.Vector3();
    camera.getWorldDirection(camDir);
    camDir.y = 0;
    camDir.normalize();

    const camRight = new THREE.Vector3();
    camRight.crossVectors(camDir, this.up).normalize();

    const moveDir = new THREE.Vector3();
    moveDir.addScaledVector(camDir, -input.z);
    moveDir.addScaledVector(camRight, input.x);
    moveDir.normalize();

    this.lookMatrix.lookAt(this.zero, moveDir, this.up);
    this.targetQuat.setFromRotationMatrix(this.lookMatrix);
    this.player.model.quaternion.slerp(this.targetQuat, 0.18);
  }

  animate(dt) {
    if (!this.player.animator) return;
    this.player.animator.update(dt);

    // let anim = 'Fall'; // TO DO
    let anim = 'Idle';

    if (this.player.isGrounded) {
      anim = 'Idle';

      if (keys.w || keys.a || keys.s || keys.d) {
        anim = 'Walk';
      }
    }

    this.player.animator.play(anim);
  }

  update(dt) {
    this.animate(dt);
    this.turn();
  }

}