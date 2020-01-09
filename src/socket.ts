import { Server, Socket } from "socket.io";

export default (io: Server) => {
    const nsp = io.of('/aavv/credit')

    nsp.on('connection', socket => {    
        console.log('>... connected to: /aavv/credit')

        socket.on('getCredit', aavvId => {
            console.log(aavvId.msg)
            socket.join(aavvId.room)
            
            // Implements function
        })
    })
}