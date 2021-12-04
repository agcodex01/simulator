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
        origin: "*"
      }
})

io.on('connection', (socket) => {
  socket.on('join room', unitId => {
    socket.join(unitId)
    io.emit('join room', unitId)
  })
  socket.on('insertPayment', data => {
    io.to(data.unitId)
    .emit('insertPayment', data.amount)
  })
});

process.env.DEV
if(process.env.ENV) {
  console.log('DEV');
}else {
  console.log('PROD', process.env.ENV);
}

http.listen(port, () => console.info(`Server is running at http://localhost:${port}`));