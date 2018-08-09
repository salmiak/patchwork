var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// var state = undefined;

/*
  A: Connect - Server sends: Player index 0
  A: State: Waiting for other player
  B: Connect - Server sends: Player index 1
  B: Client send state - Server emits to all connections
  A: Does first turn, on turn end sends state
  */

var users = [false,false]

io.on('connection', function (socket) {

  if (!users[0]) {
    socket.emit("playerIndex", 0)
    users[0] = true
    socket.userIndex = 0
  } else if (!users[1]) {
    socket.emit("playerIndex", 1)
    users[1] = true
    socket.userIndex = 1
  } else {
    socket.emit("tooManyPlayers")
  }

  io.emit("usersListUpdate", users)

  socket.on('stateSyncPing', (state) => {
    socket.broadcast.emit('stateSyncPong', state)
  })

  socket.on('disconnect', function () {
    console.log('user disconnected: ' + socket.userIndex)
    users[socket.userIndex] = false
    io.emit("usersListUpdate", users)
  });

/*
  socket.on('stateInit', function (newState) {
    console.log('Received new state')
    state = newState
  })
  socket.on('stateSync', (newState) => {
    console.log('Synced state')
    state = newState
    io.emit("stateSync", state)
  })

  if (!state) {
    console.log('a hosting user connected requesting new');
    io.emit("stateSync")

    socket.on('disconnect', function () {
      console.log('hosting user disconnected');
      state = undefined
    });
  } else {
    console.log('a non hosting user connected - sending new state');
    io.emit("stateSync", state)

    socket.on('disconnect', function () {
      console.log('non hosting user disconnected');
    });
  }
  */

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
