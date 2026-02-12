import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import Entity from '../../engine/entity';

export default class Robot extends Entity {

  name = 'Robot';
  actions = {};

  constructor() {
    super();
  }

  create() {
    this.loader.load('public/robot.glb', gltf => {

      this.model = gltf.scene;
      this.animations = gltf.animations;

      this.mixer = new THREE.AnimationMixer(this.model);

      // Criar todas as actions
      this.animations.forEach((clip) => {
        const action = this.mixer.clipAction(clip);
        this.actions[clip.name] = action;
      });

      // Tocar animação idle automaticamente
      if (this.actions['Idle']) {
        this.play('Idle');
      }

      this.game.currentScene.add(this.model);
    });
  }

  play(name) {

    if (!this.actions[name]) return;

    const newAction = this.actions[name];

    if (this.activeAction === newAction) return;

    if (this.activeAction) {
      this.activeAction.fadeOut(0.2);
    }

    newAction
      .reset()
      .fadeIn(0.2)
      .play();

    this.activeAction = newAction;
  }

  update(dt) {
    if (this.mixer) {
      this.mixer.update(dt);
    }
  }
}
