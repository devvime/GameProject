export class InputController {

  constructor(character) {

    this.character = character

    this.keys = {}

    window.addEventListener('keydown', e => this.keys[e.code] = true)
    window.addEventListener('keyup', e => this.keys[e.code] = false)

    window.addEventListener('mousemove', e => {
      if (document.pointerLockElement)
        this.character.addRotation(e.movementX)
    })
  }

  update() {

    const forward =
      (this.keys['KeyW'] ? 1 : 0) +
      (this.keys['KeyS'] ? -1 : 0)

    const right =
      (this.keys['KeyD'] ? 1 : 0) +
      (this.keys['KeyA'] ? -1 : 0)

    this.character.setInput(forward, right)
  }
}