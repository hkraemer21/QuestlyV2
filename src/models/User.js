export default class User {
    id;
    username;
    email;
    avatarURL;
    steamId;
    psnName;
    xboxGamertag;

    constructor(username, email, avatarURL, steamId, psnName, xboxGamertag) {
        this.username = username;
        this.email = email;
        this.avatarURL = avatarURL ?? '';
        this.steamId = steamId ?? '';
        this.psnName = psnName ?? '';
        this.xboxGamertag = xboxGamertag ?? '';

        return this;
    }

    toFirestore() {
        let username = this.username;
        let email = this.email;
        let avatarURL = this.avatarURL;
        let steamId = this.steamId;
        let psnName = this.psnName;
        let xboxGamertag = this.xboxGamertag;

        return { username, email, avatarURL, steamId, psnName, xboxGamertag };
    }

    static fromFirestore(snapshot, options) {
        const data = snapshot.data(options);
        
        const user = new User(data.username, data.email, data.avatarURL, data.steamId, data.psnName, data.xboxGamertag);
        user.id = snapshot.id || 0;

        return user;
    }

}