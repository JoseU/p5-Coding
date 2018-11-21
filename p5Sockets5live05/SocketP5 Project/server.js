var express = require('express');
var Max = require('max-api');

var app = express();
var server = app.listen(3000);
let dataMouse;

var clients = [];

app.use(express.static('public'));

console.log("Ejercico 2 - Socket.io - Max4Live - p5.js");


var socket = require('socket.io');
var io = socket(server);
io.sockets.on('connection', newConnection);



function newConnection(socket) {
  console.log('new connection: ' + socket.id);

  // Store id clientes in array
  clients.push(socket.id);



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
  Max.addHandler("send", (freq) => {
    console.log("send freq: " + freq);
    socket.broadcast.emit('frecuency', freq);

  });

  // Data x and y from mouse
  socket.on('mouse', mouseMsg);

  function mouseMsg(data) {
    socket.broadcast.emit('mouse', data);
    //io.broadcast.emit('mouse', data);
    dataMouse = data;
  };


  // Send note on to max outlet
  socket.on("noteOn", outMax);

  function outMax(newNote) {
    var numberClient = clients.indexOf(socket.id);
    Max.outlet("client" + numberClient%2 + " " + newNote);
  };

};




Max.addHandler(Max.MESSAGE_TYPES.ALL, (handled, ...args) => {
  if (!handled) {
    Max.post('No client connected.')
    // just consume the message
  }
})

console.log('setting up max handlers')
