import * as socketIo from "socket.io";
import * as http from "http";
import AavvController from "./namespaces/aavv.controller";

class SocketService {
    private io: SocketIO.Server;
    private namespaces = [
        AavvController
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