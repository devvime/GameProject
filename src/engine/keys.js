export const keys = {};

export function setKeys() {
  document.addEventListener('keydown', (event) => {
    event.preventDefault();
    let key = event.key.toLowerCase();
    if (event.key === " ") key = "spacebar";
    keys[key] = true;
  });
  document.addEventListener('keyup', (event) => {
    event.preventDefault();
    let key = event.key.toLowerCase();
    if (event.key === " ") key = "spacebar";
    keys[key] = false;
  });
}