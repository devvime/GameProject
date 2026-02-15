import { keys } from '../../engine/keys';

export class PlayerController {

  constructor(player) {
    this.player = player

    this.speed = 11;
    this.jumpForce = 4;
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

  animate(dt) {
    if (!this.player.animator) return;
    this.player.animator.update(dt);

    // let anim = 'Fall';
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
    this.movement(dt);
    this.animate(dt);
  }

}