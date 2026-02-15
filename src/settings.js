import * as CANNON from 'cannon-es';

export const settings = {
  debug: false,
  world: {
    gravity: new CANNON.Vec3(0, -9.82, 0)
  }
}