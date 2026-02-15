import * as CANNON from 'cannon-es'

export class CharacterController {

  constructor(body, options = {}) {

    this.body = body

    this.speed = options.speed ?? 6
    this.damping = options.damping ?? 0.85
    this.rotationSpeed = options.rotationSpeed ?? 0.002

    this.input = {
      forward: 0,
      right: 0
    }

    this.yaw = 0

    // nunca tombar
    body.fixedRotation = true
    body.updateMassProperties()
  }

  /* ================= INPUT ================= */

  setInput(forward, right) {
    this.input.forward = forward
    this.input.right = right
  }

  addRotation(deltaX) {
    this.yaw -= deltaX * this.rotationSpeed

    const q = new CANNON.Quaternion()
    q.setFromEuler(0, this.yaw, 0, 'YXZ')

    this.body.quaternion.copy(q)
  }

  /* ================= UPDATE ================= */

  update(dt) {

    const move = new CANNON.Vec3(
      this.input.right,
      0,
      -this.input.forward
    )

    if (move.lengthSquared() > 0) {

      move.normalize()
      move.scale(this.speed, move)

      // LOCAL → WORLD
      const worldMove = this.body.quaternion.vmult(move)

      this.body.velocity.x = worldMove.x
      this.body.velocity.z = worldMove.z

    } else {

      // desacelerar suave
      this.body.velocity.x *= this.damping
      this.body.velocity.z *= this.damping
    }
  }
}