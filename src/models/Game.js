export default class Game {
    id;
    title;
    platform;
    imageURL;
    isPinned; // I had to delete the decorator because using firebase transforms the object, which
    isComplete; // eliminates my ability to use the methods from the Item object and I did not like 
    dateCompleted; // the alternatives I was seeing to get it to work.

    constructor(title, platform, imageURL, isPinned, isComplete, achievements, dateCompleted) {
        this.title = title;
        this.platform = platform;
        this.imageURL = imageURL;
        this.isPinned = isPinned ?? false;
        this.isComplete = isComplete ?? false;
        this.dateCompleted = dateCompleted ?? '';

        return this;
    }

    toFirestore() {
        let title = this.title;
        let platform = this.platform;
        let imageURL = this.imageURL;
        let dateCompleted = this.dateCompleted;
        let isPinned = this.isPinned;
        let isComplete = this.isComplete;

        return { title, platform, imageURL, isPinned, isComplete, dateCompleted };
    }

    static fromFirestore(snapshot, options) {
        const data = snapshot.data(options);
        const game = new Game(data.title, data.platform, data.imageURL, data.isPinned, data.isComplete, data.dateCompleted);
        game.id = snapshot.id;

        return game;
    }

}