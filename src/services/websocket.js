import socketio from 'socket.io';

import ChatroomManager from '../entities/ChatroomManager';

let io;

function setupWebSocket(server) {
    io = socketio(server);

    io.on('connection', socket => {
        console.log(socket.id);
        socket.on('create chatroom', chatroomName => {
            ChatroomManager.createChatroom(chatroomName, socket.id)
            io.emit('chatroom created', ChatroomManager.getAllChatrooms());
        });

        socket.on('get available chatrooms', () => {
            io.to(socket.id).emit('sent available chatrooms', ChatroomManager.getAllChatrooms());
        });

        socket.on('enter chatroom', chatroomName => {
            const chatroomExists = ChatroomManager.getChatroomByName(chatroomName);

            if (chatroomExists) {
                ChatroomManager.addUser(socket.id, chatroomName);
            };
        });

        socket.on('send message', payload => {
            const { chatroomName, message } = payload;

            const chatroomExists = ChatroomManager.getChatroomByName(chatroomName);
            console.log(chatroomExists, message);
            if (chatroomExists) {
                sendMessage(chatroomName, message);
                
            };
        });

        socket.on('exit chatroom', chatroom => {
            ChatroomManager.removeUser(socket.id, chatroom);
        });
    });
};

function addUserToChatroom(user, chatroomName) {
    const foundChatroom = ChatroomManager.getChatroomByName(chatroomName);

    if (foundChatroom) {
        foundChatroom.addUser(user);
    };
};

function sendMessage(chatroomName, msg) {
    ChatroomManager.getChatroomByName(chatroomName)
                .getMembers()
                .forEach(member =>
                    io.to(member).emit('send message', msg)
                );
};

export {
    setupWebSocket,
    sendMessage
};