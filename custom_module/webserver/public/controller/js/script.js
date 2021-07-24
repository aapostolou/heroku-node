/* Mobile Viewport */
const actualViewport = () => {
  const handleViewportChange = () => {
    let vmin =
      (window.innerWidth < window.innerHeight
        ? window.innerWidth
        : window.innerHeight) * 0.01;
    let vmax =
      (window.innerWidth > window.innerHeight
        ? window.innerWidth
        : window.innerHeight) * 0.01;
    document.documentElement.style.setProperty("--vmin", `${vmin}px`);
    document.documentElement.style.setProperty("--vmax", `${vmax}px`);
  };
  handleViewportChange();

  window.addEventListener("resize", handleViewportChange);

  return () => {
    window.removeEventListener("resize", handleViewportChange);
  };
};

// Fullscreen
function toggleFullScreen() {
  var doc = window.document;
  var docEl = doc.documentElement;

  var requestFullScreen =
    docEl.requestFullscreen ||
    docEl.mozRequestFullScreen ||
    docEl.webkitRequestFullScreen ||
    docEl.msRequestFullscreen;
  var cancelFullScreen =
    doc.exitFullscreen ||
    doc.mozCancelFullScreen ||
    doc.webkitExitFullscreen ||
    doc.msExitFullscreen;

  if (
    !doc.fullscreenElement &&
    !doc.mozFullScreenElement &&
    !doc.webkitFullscreenElement &&
    !doc.msFullscreenElement
  ) {
    requestFullScreen.call(docEl);
  } else {
    cancelFullScreen.call(doc);
  }
}

window.addEventListener("load", () => {
  actualViewport();

  document
    .querySelector(".fullscreen")
    .addEventListener("click", toggleFullScreen);
});
