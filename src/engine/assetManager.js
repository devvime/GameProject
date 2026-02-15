export class AssetManager {

  constructor() {
    this.loader = new GLTFLoader();
    this.cache = new Map();
  }

  async loadGLTF(path) {
    if (this.cache.has(path)) {
      return this.cache.get(path);
    }

    const gltf = await this.loader.loadAsync(path);
    this.cache.set(path, gltf);
    return gltf;
  }

}