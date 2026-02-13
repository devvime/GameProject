import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function LoadModel(path, callback) {
  const loader = new GLTFLoader();
  let model, animations;
  loader.load(path, gltf => {
    model = gltf.scene;
    animations = gltf.animations
    model.traverse(object => {
      if (object.isMesh) object.castShadow = true;
    });
    callback(model, animations);
  });

}