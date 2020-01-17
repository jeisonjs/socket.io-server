import { Server, Socket, Namespace } from "socket.io";
import Controller from "../interfaces/controller.interface";
import { getAllCreditsByAavvId } from "../service";

class VicanderController implements Controller {
    public io: Server
    public nsp: Namespace
    public path = '/vicander'

    constructor(io: Server) {
        this.io = io
        this.nsp = this.io.of(this.path)
        this.intializeNamespaces();
    }

    private intializeNamespaces() {
        this.getAvailableCredit()
    }

    private getAvailableCredit() {
        this.nsp.on('connection', (socket: Socket) => {
            socket.on('aavv/credits', data => {
                let room = data.aavvId
                
                socket.join(room);
                console.log('conectado');
                
                
                getAllCreditsByAavvId({aavvId: data.aavvId})
                    .then(data => socket.emit('aavv/credits', data.data))
                    .catch(error => socket.emit('aavv/credits/errors', error))
            })


            socket.on('aavv/credits/update', data => {
                let room = data.aavvId

                getAllCreditsByAavvId({aavvId: data.aavvId})
                    .then(data => socket.to(room).emit('aavv/credits', data.data))
                    .catch(error => socket.to(room).emit('aavv/credits/errors', error))
            })


            socket.on('disconnect', function () {
                console.log('SocketIO > Disconnected socket ' + socket.id);
            });
        })
    }
}

export default VicanderController