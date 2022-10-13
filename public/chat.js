const socket = io()

import React from "react";
import ReactDOM  from "react";
import { useEffect, useState } from "react";
import {
    Barchart,
    Bar,
    Line,
    LineChart,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from 'recharts';

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

//const App = ({}) => {
    
  //  const [data, setData] = useState([]);

    //Listen for a cpu event and update the state
    //useEffect(() => {
      //  socket.on('cpu',(cpuPercent) =>{
        //    setData(currentData => [...currentData, cpuPercent]);
        //});
    //},[]);

    //rebder the line cg¿hart using the state

    //return(
       // <div>
      //      <h1>Real Time CPU Usage</h1>
         //   <LineChart width={500} height={300} data={data}>
           // <XAxis dataKey="name" />
            //<YAxis />
            //<CartesianGrid
             //   stroke="#eee"
              //  strokeDasharray="5 5"
           // />
           // <Line 
             //   type="monotone"
               // dataKey="value" 
              //  stroke="#8884d8"    
            ///>
            //</LineChart>
  //      </div> 
   // );
//};

ReactDOM.render(<App />,document.getElementById('root'));