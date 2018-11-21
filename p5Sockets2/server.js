var express = require('express');

var app = express();
var server = app.listen(3000);


app.use(express.static('public'));

console.log("Ejercico 2 Socket.io con p5.js");


var socket = require('socket.io');
var io = socket(server);
io.sockets.on('connection', newConnection);

function newConnection(socket) {
  console.log('new connection: ' + socket.id);

  socket.on('mouse', mouseMsg);
  //io.on('mouse', mouseMsg);

  function mouseMsg(data) {
    socket.broadcast.emit('mouse', data);
    //io.broadcast.emit('mouse', data);
    console.log(data);

  }
}
