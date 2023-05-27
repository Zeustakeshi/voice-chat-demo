export default class SessionStore {
    constructor() {
        this.sessions = new Map();
    }

    findSession(id) {
        return this.sessions.get(id);
    }

    saveSession(id, session) {
        this.sessions.set(id, session);
    }

    removeSession(id) {
        this.sessions.delete(id);
    }

    findAllSessions() {
        return [...this.sessions.values()];
    }
}
