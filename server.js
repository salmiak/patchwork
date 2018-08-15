var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var path = require('path');
var serveStatic = require('serve-static');

app.use(serveStatic(__dirname + "/dist"));
var port = process.env.PORT || 5000;

var games = {}

io.on('connection', function (socket) {

  socket.on('connect to', (hash) => {

    if (!games[hash]) {
      console.log('User created a new game ' + hash)
      games[hash] = {
        hash: hash,
        players: [0, 0]
      }
    }

    console.log('User connected to game ' + hash)

    var index = games[hash].players.indexOf(0)

    if (index === -1) {
      console.log('Game is full, user refused')
      socket.emit('gameFull')

    } else {
      games[hash].players[index] = socket.id
      socket.currentGame = {
        shared: games[hash],
        playerIndex: index,
        hash: hash
      }
      socket.join(hash)
      socket.emit("gameInit", socket.currentGame)
      console.log('User got index ' + index)
    }
  })

  socket.on('init state', (state) => {
    console.log('new state initiated')
    socket.currentGame.shared.state = state
    socket.broadcast.to(socket.currentGame.hash).emit('initNewState', state)
  })

  socket.on('stateSyncPing', (state) => {
    if (socket.currentGame) {
      socket.currentGame.shared.state = state
      socket.broadcast.to(socket.currentGame.hash).emit('stateSyncPong', state)
    }
  })

  socket.on('gameOver', (state) => {
    socket.broadcast.to(socket.currentGame.hash).emit('stateSyncPong', state)
    delete games[socket.currentGame.hash]
  })

  socket.on('disconnect', function () {
    if (socket.currentGame) {
      console.log('user ' + socket.currentGame.playerIndex + ' disconnected from ' + socket.currentGame.hash)
      socket.currentGame.shared.players[socket.currentGame.playerIndex] = 0
    } else {
      console.log('User from a full game disconnected - ignored')
    }
  });

});

http.listen(port);
console.log('server started '+ port);
