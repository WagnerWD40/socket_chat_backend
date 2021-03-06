import Chatroom from './Chatroom';

class ChatroomManager {
    constructor() {
        this.chatrooms = [];
    };

    getChatroomByName(chatroomName) {
        return this.chatrooms.find(chatroom => chatroom.name === chatroomName);
    };

    getChatroomUsers(chatroom) {
        return this.getChatroomByName(chatroom).getMembers();
    };

    removeUserFromServer(user) {
        this.chatrooms.forEach(chatroom => chatroom.removeUser(user));
    };

    createChatroom(chatroom, owner) {
        if (!this.getChatroomByName(chatroom)) {

            const newChatroom = new Chatroom(chatroom, owner);
            newChatroom.addUser(owner);

            this.chatrooms.push(newChatroom);
            console.log(this.chatrooms);
        };
    };

    addUser(user, chatroom) {
        const foundChatroom = this.getChatroomByName(chatroom);
        foundChatroom.addUser(user);
    };

    addMessage(message, chatroom) {
        const foundChatroom = this.getChatroomByName(chatroom);

        if (foundChatroom) {
            foundChatroom.addMessage(message);
        };
    };

    removeUser(user, chatroom) {
        const foundChatroom = this.getChatroomByName(chatroom);

        if (foundChatroom && foundChatroom.getMembers().includes(user)) {
            foundChatroom.removeUser(user);
        };

        if (foundChatroom && foundChatroom.isEmpty()) {
            this.deleteChatroom(foundChatroom.name);
        };
    };

    deleteChatroom(chatroom) {
        this.chatrooms = this.chatrooms.filter(chatroom => chatroom.name !== chatroom);
    };

    getAllChatrooms() {
        return this.chatrooms;
    };
};

export default new ChatroomManager();