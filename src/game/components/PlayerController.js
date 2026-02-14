import { keys } from '../../engine/keys';

export class PlayerController {

  constructor(player) {
    this.player = player

    this.speed = 1.3;
    this.jumpForce = 10;
  }

  movement(dt) {
    if (!this.player.isGrounded) return;
    if (keys.w) {
      this.player.body.position.z -= this.speed * dt;
    }
    if (keys.s) {
      this.player.body.position.z += this.speed * dt;
    }
    if (keys.a) {
      this.player.body.position.x -= this.speed * dt;
    }
    if (keys.d) {
      this.player.body.position.x += this.speed * dt;
    }
    if (keys.spacebar) {
      this.player.body.position.y += this.jumpForce * dt;
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