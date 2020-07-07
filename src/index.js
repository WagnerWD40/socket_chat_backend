import Express from 'express';
import http from 'http';
import socketio from 'socket.io';
import database from './config/database';
import bodyParser from 'body-parser';

import ChatroomManager from './entities/ChatroomManager';

import routes from './routes';


const port = process.env.PORT || 8000;

const app = Express();
app.use(bodyParser.json());
app.use(routes);

const server = http.createServer(app);

const io = socketio(server);

const chatroomManager = new ChatroomManager();


// io.on('connection', (client) => {
//     console.log('a user conected');
//     client.emit('a user conected');

//     client.on('chat message', (msg) => {
//         client.broadcast.emit('receivedMessage', msg);
//     });

//     client.on('createChatroom', (chatroomName, ownerUser) => {
//         const newChatroom = chatroomManager.createChatroom(chatroomName, ownerUser);
//         newChatroom.addUser(ownerUser);
//     });
// });


database.connect().then(() => {
    server.listen(port);
    console.log(`Listening on port ${port}`);
})
