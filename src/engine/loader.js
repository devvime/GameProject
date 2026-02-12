import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function loadModel(model_path) {
  const loader = new GLTFLoader();
  let model, animations;

  loader.load(model_path, function (gltf) {
    model = gltf.scene;
    animations = gltf.animations;
  }, undefined, function (e) {
    console.error(e);
  });

  return { model, animations };
}