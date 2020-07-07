class Chatroom {
    
    constructor(name, owner) {
        this.name = name;
        this.owner = owner;
        this.members = [];
        this.chatHistory = [];
    };

    addUser(user) {
        this.members.push(user);
    }

    removeUser(user) {
        this.members = this.members.filter(u => u.id !== user.id);
    }

    broadcastMessage(message) {
        this.members.forEach(m => m.emit('message', message));
    }

    addMessage(message) {
        this.chatHistory.push(message);
    }

    getChatHistory() {
        return this.chatHistory;
    }

}

export default Chatroom;