import * as THREE from 'three';
import Scene from "../../engine/scene";
import Floor from '../entities/floor.entity';
import Box from '../entities/box.entity';

export default class MainScene extends Scene {

  constructor() {
    super();

    this.camera.position.z = 5;
  }

  create() {
    this.objects['floor'] = new Floor();
    this.objects['box'] = new Box();
  }

  update(dt) { }

}