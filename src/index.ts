import * as express from "express";
import * as http from "http";
import * as socketIo from "socket.io";
import router from "./router/router";
import initializeSocketIO from "./socket";


const app = express()
app.use(router)

// http server
const server = http.createServer(app)
const port = process.env.PORT || 4444

// socket.io server
const io = socketIo(server)
initializeSocketIO(io)


server.listen(port, () => console.log(`Listening on port ${port}`));


