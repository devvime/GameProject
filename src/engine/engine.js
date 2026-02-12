import { Game } from './game';
import scenes from '../game/setScenes';

export default class Engine {

  constructor() {
    this.scenes = scenes;
    this.game = new Game()
    this.setScene('main');
    this.game.create();
    this.game.update();
  }

  static getGame() {
    return this.game;
  }

  setScene(scene) {
    this.game.currentScene = new this.scenes[scene]();
    this.game.currentScene.create();

    for (const obj of Object.keys(this.game.currentScene.objects)) {
      const entity = this.game.currentScene.objects[obj];
      this.game.currentScene.add(entity);
      if (entity.create) entity.create();
    }
  }

}