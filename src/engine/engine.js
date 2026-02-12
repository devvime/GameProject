export default class Engine {

  static game = null;

  static set(game) {
    this.game = game;
  }

  static get() {
    return this.game;
  }

}