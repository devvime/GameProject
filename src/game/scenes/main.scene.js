import * as THREE from 'three';
import Scene from "../../engine/scene";
import Floor from '../entities/floor.entity';
import Box from '../entities/box.entity';
import Soldier from '../entities/soldier.entity';

export default class MainScene extends Scene {

  constructor() {
    super();
  }

  create() {
    this.objects['floor'] = new Floor();
    this.objects['box'] = new Box();
    this.objects['soldier'] = new Soldier();
  }

  update(dt) { }

}