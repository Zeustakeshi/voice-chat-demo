export default class SignalStore {
    constructor() {
        this.users = {};
        this.userToRoom = {};
    }

    newUser(roomID, userID, username) {
        if (this.users[roomID]) this.users[roomID].push({ userID, username });
        else this.users[roomID] = [{ userID, username }];
        this.userToRoom[userID] = roomID;
    }

    getUserInRoom(roomID) {
        return this.users[roomID];
    }

    removeUser(userID) {
        const roomID = this.userToRoom[userID];
        let room = this.users[roomID];
        if (room) {
            room = room.filter((id) => id !== socket.id);
            users[roomID] = room;
        }
    }
}
