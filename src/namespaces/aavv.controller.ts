import * as socketio from "socket.io";
import { getAllCreditsByAavvId } from "../service";

class AavvController {
    public path = '/aavv'
    private io: SocketIO.Server;

    constructor(io: SocketIO.Server) {
        this.io = io
        this.intializeRoutes();
    }

    private intializeRoutes() {
        this.getAvailableCredit()
    }

    private getAvailableCredit() {
        const nsp = this.io.of('/aavv/credit')
    
        nsp.on('connection', (socket: socketio.Socket) => {
            let previousRoom: any;
            
            const safeJoin = (currentRoom: any) => {
                socket.leave(previousRoom);
                socket.join(currentRoom);
                previousRoom = currentRoom;
              };

            socket.on('getAvailableCredit', data => {                
                let room = data.aavvId

                // join the room
                safeJoin(room)
    
                // implements function
                getAllCreditsByAavvId(data.aavvId)
                    .then(data => socket.emit('credits', data))
                    .catch(error => socket.emit('credits', error))
            })

            socket.on('update', data => {
                let room = data.aavvId                

                // emits to all sockets in this room
                socket.to(room).emit('credits', { msg: data.msg, status: 200 });
            })
        })
    }
}

export default AavvController