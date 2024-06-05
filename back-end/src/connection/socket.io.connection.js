const socket = require("socket.io");
const { app } = require("../../index");

const { APP_URL, SIO_ADMIN } = process.env;

const io = socket(app, {
  cors: {
    origin: APP_URL,
  },
});

io.on("connection", (socket) => {
  console.log("An employee has connected");

  socket.on("sendMessage", (message) => {
    io.emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const createMessage = (name, text) => {
  return {
    name,
    text,
    time: new Intl.DateTimeFormat("default", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(new Date()),
  };
};
