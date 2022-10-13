const socket = io()

// string
const data_to_pass_in = 'Send this to python script';

// DOM elements
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');
let output2 =document.getElementById('output2');
let btn2 = document.getElementById('send2');
let iconos = document.getElementById('caja-iconos');

btn.addEventListener('click', function(){
    socket.emit('chat:message',{
        message: message.value,
        username: username.value
    });
});

btn2.addEventListener('click', function(){
    iconos.innerHTML = '';
})

message.addEventListener('keypress', function(){
    console.log(username.value);
    socket.emit('chat:typing', username.value);
});

socket.on('chat:message',function(data){
    actions.innerHTML = '';
    output.innerHTML +=`<p>
    <strong>${data.username}</strong>: ${data.message}
    </p>`
});

socket.on('chat:typing', function(data){
    actions.innerHTML = `<p><em>${data} is typing a message.</em></p>`
    iconos.innerHTML = `<lottie-player src="https://assets6.lottiefiles.com/packages/lf20_8knle7ns.json"  
    background="transparent"  speed="1"  style="width: 300px; height: 300px; align-content: center;"  loop autoplay></lottie-player>`
});

socket.on('alarma',function(data){
    output2.innerHTML += `<p>${data.message} </p>`
});

   
socket.on('señal',function(data){
    output2.innerHTML += `<p>${data} </p>`;
    iconos.innerHTML = `<lottie-player src="https://assets6.lottiefiles.com/packages/lf20_8knle7ns.json"  
    background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop autoplay></lottie-player>`
});

socket.on('ip',function(ip){
    output2.innerHTML = `<p>La IP local es ${ip} </p>`;
});

