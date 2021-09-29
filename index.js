const express = require('express')

var app = express()
var http = require('http').createServer(app);
var port = process.env.PORT || 5000;

app.use(express.static('public'))

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:8080"
      }
})

io.on('connection', (socket) => {
  socket.on('insertPayment', amount => {
    io.emit('insertPayment', amount)
  })
});

http.listen(port, () => console.info(`Server is running at http://localhost:${port}`));