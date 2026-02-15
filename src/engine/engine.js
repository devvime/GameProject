import { Game } from './game';
import scenes from '../game/setScenes';
import Debug from './debug';
import { Loading } from './loading';
export default class Engine {

  constructor() {
    this.setMouseEvents();
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

  async setScene(scene) {
    this.game.currentScene = new this.scenes[scene]();
    this.game.currentScene.create();

    Loading.start();

    await this.game.currentScene.create();

    for (const obj of Object.keys(this.game.currentScene.objects)) {
      const entity = this.game.currentScene.objects[obj];
      entity.game = this.game;
      this.game.currentScene.add(entity);
      if (entity.create) entity.create();
    }

    setTimeout(() => {
      Loading.end();
    }, 1000);
  }

  debugSceneObjects() {
    for (const obj of Object.keys(this.game.currentScene.objects)) {
      const entity = this.game.currentScene.objects[obj];
      this.debug.add(entity, { label: entity.name });
    }
  }

  setMouseEvents() {
    this.mouseX = 0;
    this.mouseY = 0;

    document.body.addEventListener("click", () => {
      document.body.requestPointerLock();
    });

    document.addEventListener("mousemove", (e) => {
      if (document.pointerLockElement !== document.body) return;

      this.mouseX = e.movementX;
      this.mouseY = e.movementY;

      Engine.emit('MousePosition', { x: this.mouseX, y: this.mouseY });
    });
  }

  static emit(name, data) {
    const event = new CustomEvent(name, { detail: data });
    document.dispatchEvent(event);
  }

  static output(name, callback) {
    document.addEventListener(name, callback);
  }

}