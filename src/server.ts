var express = require('express');
var app = express();
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { socketConnection } from "./externalServices/sockerConnection";
import { clientSockerConnection } from "./externalServices/clientSockerConnection";
import { db } from "./externalServices/db";
import { io as clientIo } from "socket.io-client";
var cors = require('cors');

app.use(cors());
app.options('*', cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
    credentials: true
  },
  allowEIO3: true
});
httpServer.listen(3000, async () => {
  console.log(`Server started at Port 3000`)
  await db.init()
});

function socketInit() {
  io.sockets.on("connection", (socket: Socket) => {
    console.log("connected");
    socketConnection.sockerInitialization(socket);
  });
}
function listenSocketInit() {
  const socketConnection = clientIo("http://localhost:3000");
  socketConnection.on("sending_data", (data) => {
    console.log("received")
    clientSockerConnection.eventHandler(data);
  })
}
socketInit();
listenSocketInit()





