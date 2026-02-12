import * as CANNON from 'cannon-es';
import { settings } from '../settings.js';

export const world = new CANNON.World({
  gravity: settings.world.gravity
});