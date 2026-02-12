import * as THREE from 'three';
import Scene from "../../engine/scene";
import Floor from '../entities/floor.entity';
import Box from '../entities/box.entity';

export default class MainScene extends Scene {

  create() {
    this.camera.position.z = 5;

    this.floor = new Floor();
    this.add(this.floor);

    this.box = new Box();
    this.add(this.box);
  }

  update(dt) {
    this.box.update(dt)
  }

}