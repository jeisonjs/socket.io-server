import express, { Application } from "express";
import http from "http";
import 'dotenv/config';
import * as cors from "cors";
import router from "./routes";
import SocketService from "./socket";


/**
 * App Variables
 */
const {
    PORT
} = process.env;


/**
 *  App Configuration
 */
const app: Application = express()
app.use(router)

const server = http.createServer(app)
new SocketService(server)


/**
 * Server Activation
 */
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));


