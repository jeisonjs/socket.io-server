import * as express from "express";
import * as http from "http";
import * as cors from "cors";
import router from "./router/router";
import SocketService from "./socket";


const app = express()
// app.use(cors)
app.use(router)

// http server
const server = http.createServer(app)
const port = process.env.PORT || 3000

// socket.io server
new SocketService(server)


server.listen(port, () => console.log(`Listening on port ${port}`));


