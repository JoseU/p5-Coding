var express = require('express');
var Max = require('max-api');

var app = express();
var server = app.listen(3002);


app.use(express.static('public'));

console.log("Ejercico 3 Socket.io con p5.js");


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
    //console.log(data);
  };
    socket.on("message", function incoming(message) {
      console.log('received: %s', message);
    });
    socket.on('message', function incoming(message) {
      console.log('received: %s', message);
    });
    socket.on('close', function stop() {
      Max.removeHandlers("send");
      console.log('Connection closed');

      socket.terminate();
    });
    // Handle the Max interactions here...
    Max.addHandler("send", (...args) => {
      console.log("send args: " + args);

      socket.broadcast.emit('slider', args);
      if (args.length === 3) {

        //sender(args[0], args[1], args[2]);
      }
    });

};





Max.addHandler(Max.MESSAGE_TYPES.ALL, (handled, ...args) => {
  if (!handled) {
    // Max.post('No client connected.')
    // just consume the message
  }
})

console.log('setting up max handlers')
