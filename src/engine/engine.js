import { Game } from './game';
import scenes from '../game/setScenes';
import Debug from './debug';

export default class Engine {

  constructor() {
    this.scenes = scenes;
    this.game = new Game();
    this.setScene('main');
    this.game.create();
    this.debug = new Debug(this.game.currentScene.camera, this.game);
    this.debug.add(this.game.currentScene.camera);
    this.game.update(this.debug);
    this.debugSceneObjects();
  }

  static getGame() {
    return this.game;
  }

  setScene(scene) {
    this.game.currentScene = new this.scenes[scene]();
    this.game.currentScene.create();

    for (const obj of Object.keys(this.game.currentScene.objects)) {
      const entity = this.game.currentScene.objects[obj];
      entity.game = this.game;
      this.game.currentScene.add(entity);
      if (entity.create) entity.create();
    }
  }

  debugSceneObjects() {
    for (const obj of Object.keys(this.game.currentScene.objects)) {
      const entity = this.game.currentScene.objects[obj];
      this.debug.add(entity, { label: entity.name });
    }
  }

}