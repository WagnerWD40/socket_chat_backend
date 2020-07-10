import { v4 as uuidv4 } from 'uuid';

class Chatroom {
    
    constructor(name, owner) {
        this.id = uuidv4();
        this.name = name;
        this.owner = owner;
        this.members = [];
        this.chatHistory = [];
    };

    addUser(user) {
        this.members.push(user);
    };

    removeUser(user) {
        this.members = this.members.filter(u => u !== user);
    };

    getMembers() {
        return this.members;
    };

    addMessage(message) {
        this.chatHistory.push(message);
    };

    getChatHistory() {
        return this.chatHistory;
    };

    getName() {
        return this.name;
    };

    isEmpty() {
        return this.members.length <= 0;
    };

};

Chatroom.prototype.toString = function() {
    return `Chatroom: "${this.name}" with [${this.members.length} members]`;
};

export default Chatroom;