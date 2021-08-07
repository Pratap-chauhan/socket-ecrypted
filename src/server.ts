var express = require('express');
var app = express();
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { socketConnection } from "./externalServices/sockerConnection";
import { clientSockerConnection } from "./externalServices/clientSockerConnection";
// import { Socket } from "socket.io";
var cors = require('cors')

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
function socketInit(){
  io.sockets.on("connection", (socket: Socket) => {
    socketConnection.sockerInitialization(socket);
  });
}
socketInit();
httpServer.listen(3000, async()=>{
  clientSockerConnection.init();
});
