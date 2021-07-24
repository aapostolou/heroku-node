const CANVAS = function ({ width = 1920, height = 1080 }) {
  this.element = document.createElement("canvas");

  this.element.width = width;
  this.element.height = height;

  this.resize();
  window.addEventListener("resize", this.resize.bind(this));
};

CANVAS.prototype.resize = function () {
  const { width, height } = this.element;

  if (width / height > window.innerWidth / window.innerHeight) {
    this.element.style.width = "100vw";
    this.element.style.height = `${100 * (height / width)}vw`;
  } else {
    this.element.style.height = "100vh";
    this.element.style.width = `${100 * (width / height)}vh`;
  }
};
