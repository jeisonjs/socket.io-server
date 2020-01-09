const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const axios = require('axios')
const router = require('./router/router')

// app config
const app = express()
app.use(router)

const server = http.createServer(app)
const io = socketIo(server)

const port = process.env.PORT || 4444

// in-memory store
const documents = {}


io.on('connection', socket => {
    let previousId;
    const safeJoin = currentId => {
        socket.leave(previousId)
        socket.join(currentId)
        previousId = currentId
    }


    socket.on('getDoc', docId => {      
        safeJoin(docId)
        socket.emit('document', documents[docId])
    })


    socket.on('addDoc', doc => {     
        documents[doc.id] = doc
        safeJoin(doc.id)
        io.emit('documents', Object.keys(documents))
        socket.emit('document', doc)
    })


    socket.on('editDoc', doc => {      
        documents[doc.id] = doc
        socket.to(doc.id).emit('document', doc)
    })


    io.emit('documents', Object.keys(documents))
})


const nsp = io.of('/aavv/credit')
nsp.on('connection', socket => {    
    console.log('>... connected to: /aavv/credit')

    socket.on('getCredit', aavvId => {
        console.log(aavvId.msg)
        socket.join(aavvId.room)
        
        getAllCreditsByAavvId(aavvId.room).then(data => {
            nsp.to(aavvId.room).emit('hi', data);  
        })
    })
})


server.listen(port, () => console.log(`Listening on port ${port}`));


async function getAllCreditsByAavvId(aavvId) {
    return await axios.get(`https://jsonplaceholder.typicode.com/users/${aavvId}`).then(response => response.data)
}