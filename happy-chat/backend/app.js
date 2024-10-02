/* Ideia: Chat em tempo real estilo nintendo DS, onde o servidor não armazena mensagens, somente as repassa para os clientes 
Existem Salas de Chat
Cada sala de chat que contém uma pessoa, quando uma mensagem for enviada, deve ser enviada para todas as pessoas na sala
Essa mensagem deve ficar armazenada somente no front end, e após sair da sala todas as mensagens sumirão pra essa pessoa. 

Problemas: Como identificar as pessoas na sala? O back deve ter algum id para cada pessoa? um user id?
           Como lidar com duas ou mais mensagens enviadas ao mesmo tempo? fila?
           Como guardar as mensagens no front end? Cookies? Local Storage? Session Storage?
           Como lidar com a saída de uma pessoa da sala? 
           Como lidar com a entrada de uma pessoa na sala?
           
Como não sei muito sobre back e websockets, vou começar fazendo o front, e descobrindo como fazer o back depois

Implementação atual (ainda não testado)
    Usar um WebSocket Server, que abre as salas e atribui as salas os clientes
    Dai, através do event listener, é possível enviar mensagens a todos os clientes 
    dentro de uma sala.
    As salas são criadas por demanda, e devem ser excluidas quando não tiverem mais usuários.


*/



const formidable = require('formidable');
const express = require('express');
const cors = require('cors');
const crypto = require("crypto");
const fs = require('fs');
const app = express.Router();
const expressWs = require('express-ws')(app);

import WebSocket from 'ws';

const wss = new WebSocket.Server({ port: 8080,
});
const rooms ={}; //Armazena as salas

//teoricamente isso deve funcionar...

wss.on('connection', (ws) => {
    ws.send('ok');

    ws.on('message', (data) => {

        let message;
        try{
            message = JSON.parse(data);
        } catch (e) {
            sendError(ws, 'Wrong format');
            return;
        }

        if (message.type ==='JOIN_ROOM'){
            const room = message.room;
            if(!rooms[room]){
                rooms[room] = new Set();
            }
        rooms[room].add(ws); // Adiciona o cliente na sala 
        ws.room = room;
        ws.send(`Joined Room: ${room}`);
        }

        else if (message.type === 'NEW_MESSAGE'){
            const room = ws.room;
            if(room && rooms[room]){
                rooms[room].forEach(client => {
                    if(client !== ws){
                        client.send(data); //Envia a mensagem pra todos os clientes.
                    }
                });
            }
        }
        console.log(data);
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
});
});

ws.send(JSON.stringify(messageObject));



