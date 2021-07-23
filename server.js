const { io } = require("./custom_module/webserver");

/* Seed */
const seed = Math.round(Math.random() * 10 ** 10);
io.on("connection", (socket) => {
  socket.emit(seed, { seed });
});
