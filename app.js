const { Server } = require('engine.io');
let express = require('express');
let socket = require('socket.io');

let app = express();

let server = app.listen(5000, () => {
    console.log('app.listen is working');
})
app.use(express.static('public'))
let io = socket(server);

io.on('connection', (socket) => {
    socket.on('beginPath', (data) => {
        io.sockets.emit('beginPath', data);
    })
    socket.on('draw', (data) => {
        io.sockets.emit('draw', data);
    })
    socket.on('plotImage', (data) => {
        io.sockets.emit('plotImage', data);
    })
})