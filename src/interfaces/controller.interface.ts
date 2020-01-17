import { Namespace, Server } from "socket.io";

interface Controller {
    io: Server
    nsp: Namespace
    path: string
}

export default Controller