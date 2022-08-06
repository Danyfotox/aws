const path = require('path');
const express = require('express');
const app = express();



//settings
app.set('port',process.env.PORT || 8080);

//static files
app.use(express.static(path.join(__dirname, 'public')));

// start the server
const server = app.listen(app.get('port'),()=> {
    console.log('server on port: ', app.get('port'));
});




// websockets
const SocketIO = require('socket.io');
const io= SocketIO(server);


app.get("/items",function(req,res){
    var alarm = req.query.id;
    res.send("hola: " + alarm);
    io.sockets.emit('señal','peligro!');
});

io.on('connection', (socket)=> {
    console.log('new connection', socket.id);
    
    socket.on('chat:message',(data)=>{
        io.sockets.emit('chat:message', data);
    });

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
    });

    socket.on('alarma',(data)=>{
        io.sockets.emit('alarma',data);
    });
    socket.on('señal',(alarm)=>{
        io.sockets.emit('señal',alarm);
    });
});


// GET
