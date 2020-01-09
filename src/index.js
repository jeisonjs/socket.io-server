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
        console.log('getDoc')        
        safeJoin(docId)
        socket.emit('document', documents[docId])
    })


    socket.on('addDoc', doc => {
        console.log('addDoc')        
        documents[doc.id] = doc
        safeJoin(doc.id)
        io.emit('documents', Object.keys(documents))
        socket.emit('document', doc)
    })


    socket.on('editDoc', doc => {
        console.log('editDoc')        
        documents[doc.id] = doc
        socket.to(doc.id).emit('document', doc)
    })


    io.emit('documents', Object.keys(documents))
})


server.listen(port, () => console.log(`Listening on port ${port}`));