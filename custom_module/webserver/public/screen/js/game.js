/* Init */
(function () {
  const init = () => {
    /* init Game */
    window.game = {};

    /* init Canvas */
    game.canvas = new CANVAS({ width: 1920 / 2, height: 1080 / 2 });
    document.body.append(game.canvas.element);

    loop();
  };

  const loop = () => {
    window.requestAnimationFrame(loop);
  };

  window.addEventListener("load", () => {
    init();
  });
})();
