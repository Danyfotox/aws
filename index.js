const path = require('path');
const express = require('express');
const app = express();

//const os = require('os-utils');

//settings
app.set('port',process.env.PORT || 3000);

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
    io.sockets.emit('señal','Se registra una fuga de gas, estás en peligro!');
});

app.get("/ip",function(req,res){
    var ip = req.query.ip;
    res.send("hola esta es la ip: " + ip);
    io.sockets.emit('ip',ip);
});

app.get("/graph",function(req,res){
    var value = req.query.value;
    res.send("hola este es el valor recibido: " + value);
    io.sockets.emit('value', value);
});

io.on('connection', (socket)=> {
    console.log('new connection', socket.id);
    
    socket.on('chat:message',(data)=>{
        io.sockets.emit('chat:message', data);
    });

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
        io.sockets.emit('señal','Se registra una fuga de gas, estás en peligro!');
    });

   
    socket.on('señal',(alarm)=>{
        io.sockets.emit('señal',alarm);
    });

    socket.on('graph',(value)=>{
        io.sockets.emit('graph',value);
    });
    
    //let tick = 0;
    //setInterval(() => {
    //    os.cpuUsage((cpuPercent) => {
    //        io.sockets.emit('cpu', {
    //            value : cpuPercent,
    //            name : tick++    
    //        });
    //    });
    //}, 1000);
});
