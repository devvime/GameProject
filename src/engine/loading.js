export class Loading {

  static loadinArea = document.querySelector('#loading-area')
  static loaded = false;

  static start() {
    Loading.loaded = false;
    Loading.loadinArea.classList.remove('fadeOut');
  }

  static end() {
    Loading.loaded = true;
    Loading.loadinArea.classList.add('fadeOut');
  }

}