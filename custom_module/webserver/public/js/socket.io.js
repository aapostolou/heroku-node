const socket = io();

socket.on("connect", () => {
  console.log("Connected");
});
socket.on("disconnect", () => {
  console.log("Disconnected");
});

/* Seed */
socket.on("seed", ({ seed }) => {
  if (localStorage.getItem("seed") != seed) {
    localStorage.setItem("seed", seed);
    window.location.reload();
  }
});
