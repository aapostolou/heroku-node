const JOYSTICK = function ({ canvas, onMove, onPress }) {
  this.canvas = canvas;

  this.position = {
    x: null,
    y: null
  };

  this.dx = 0;
  this.dy = 0;

  this.angle = null;

  this.isPressed = false;

  /* INIT */
  this.resize();
  window.addEventListener("resize", this.resize.bind(this));

  [("mousedown", "touchstart")].forEach((event) =>
    canvas.addEventListener(event, this.handleMouseDown.bind(this))
  );
  ["mousemove", "touchmove"].forEach((event) =>
    canvas.addEventListener(event, this.handleMouseMove.bind(this))
  );
  ["mouseup", "touchend"].forEach((event) =>
    canvas.addEventListener(event, this.handleMouseUp.bind(this))
  );
  ["mouseleave", "touchcancel"].forEach((event) =>
    canvas.addEventListener(event, this.handleMouseUp.bind(this))
  );

  /* initial Draw */
  this.draw();
};

JOYSTICK.prototype.resize = function () {
  this.canvas.width = this.canvas.parentElement.scrollWidth;
  this.canvas.height = this.canvas.parentElement.scrollHeight;
};

JOYSTICK.prototype.handleMouseDown = function (e) {
  this.position = this.getMousePosition(e);

  this.mouse = this.getMousePosition(e);

  this.isPressed = true;

  this.draw();
};
JOYSTICK.prototype.handleMouseMove = function (e) {
  if (!this.isPressed) return;

  this.mouse = this.getMousePosition(e);

  this.dx = this.mouse.x - this.position.x;
  this.dy = this.mouse.y - this.position.y;

  this.angle = calculateAngle({
    center: this.position,
    point: this.mouse
  });

  this.draw();
};
JOYSTICK.prototype.handleMouseUp = function (e) {
  this.position = {
    x: 0,
    y: 0
  };

  this.dx = 0;
  this.dy = 0;

  this.angle = null;

  this.isPressed = false;

  delete this.mouse;

  this.draw();
};

JOYSTICK.prototype.draw = function () {
  const ctx = this.canvas.getContext("2d");

  ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  let radius = this.canvas.width / 4;
  if (radius > 100) radius = 100;

  let x = this.isPressed ? this.position.x : this.canvas.width / 2;
  let y = this.isPressed ? this.position.y : this.canvas.height / 2;

  ctx.strokeStyle = "#ffffff78";
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.stroke();

  if (this.isPressed) {
    ctx.beginPath();
    ctx.arc(this.mouse.x, this.mouse.y, radius / 3, 0, 2 * Math.PI);
    ctx.stroke();
  }
};

JOYSTICK.prototype.getMousePosition = function (e) {
  let x = 0;
  let y = 0;

  if (window.innerWidth > window.innerHeight) {
    x = e.clientX || e.touches[0].clientX;
    y = e.clientY || e.touches[0].clientY;
  } else {
    x = e.clientY || e.touches[0].clientY;
    y = e.clientX || e.touches[0].clientX;

    x -= this.canvas.getBoundingClientRect().top;
    y = window.innerWidth - y - this.canvas.getBoundingClientRect().left;
  }

  return { x, y };
};

const calculateAngle = ({ center, point }) =>
  (Math.atan2(point.y - center.y, point.x - center.x) * 180) / Math.PI;
