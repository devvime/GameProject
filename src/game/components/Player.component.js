import { keys } from '../../engine/keys';

export class PlayerController {

  constructor(player) {
    this.player = player
    this.speed = 15;
    this.jumpForce = 5;
  }

  movement(dt) {
    if (!this.player.isGrounded) return;
    if (keys.w) {
      this.player.body.velocity.z = -this.speed;
    }
    if (keys.s) {
      this.player.body.velocity.z = this.speed;
    }
    if (keys.a) {
      this.player.body.velocity.x = -this.speed;
    }
    if (keys.d) {
      this.player.body.velocity.x = this.speed;
    }
    if (keys.spacebar) {
      this.player.body.velocity.y = this.jumpForce;
    }
  }

  update(dt) {
    this.movement(dt);
  }

}