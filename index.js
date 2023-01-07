const express = require("express");
const app = express();
const port = 3000;
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
});

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`)

  socket.on("join_room", (data) => {
    socket.join(data);
  })

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data)
  })
})

server.listen(port, () => {
  console.log(`listening on *:${port}`);
})
