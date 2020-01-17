import * as socketIo from "socket.io";
import * as http from "http";
import VicanderController from "./namespaces/vicander.controller";

class SocketService {
    private io: SocketIO.Server;
    private namespaces = [
        VicanderController
    ]

    constructor(server: http.Server) {
        this.io = socketIo(server)
        this.io.origins("*:*");

        this.initializeNamespaces(this.namespaces);
    }

    private initializeNamespaces(namespaces: any) {
        namespaces.forEach((namespace: any) => {
            new namespace(this.io)
        });
    }
}

export default SocketService