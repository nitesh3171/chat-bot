const { log } = require('console');
const express = require('express');
const path = require('path');
const http = require('http');
const socket = require('socket.io');
const { Socket } = require('dgram');

const app =express();

app.use(express.static(path.join(__dirname,'../frontend')));

const server = http.createServer(app);
const io = Socket(server);

io.on('connection', function(socket){
    console.log('A user connected');
    
    socket.on('chat-message',function(data){
        io.emit('chat-message',data)
    })

    socket.on('disconnect',function(){
        console.log('user disconnected');
    })

})

server.listen(3005, ()=>{
 console.log('server started');
})