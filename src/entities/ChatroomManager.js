import Chatroom from './Chatroom';

class ChatroomManager {
    constructor() {
        this.chatrooms = [];
    }

    getChatroomByName(chatroomName) {
        return this.chatrooms.find(chatroom => chatroom.name === chatroom);
    }

    removeUserFromServer(user) {
        this.chatrooms.forEach(chatroom => chatroom.removeUser(user));
    }

    createChatroom(chatroomName, ownerUser) {
        const newChatroom = new Chatroom(chatroomName, ownerUser)
        this.chatrooms.push(newChatroom);

        return newChatroom;
    }

    addUser(chatroomName, user) {
        const foundChatroom = this.getChatroomByName(chatroomName);
        foundChatroom.addUser(user);
    }

    getAllChatrooms() {
        return this.chatrooms;
    }
}

export default ChatroomManager;