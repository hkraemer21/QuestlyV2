export default class Game {
    id;
    title;
    platform;
    image;
    achievements;
    dateCompleted;

    constructor(title, platform, image, achievements, dateCompleted) {
        this.title = title;
        this.platform = platform;
        this.image = image;
        this.achievements = achievements ?? [];
        this.dateCompleted = dateCompleted ?? '';

        return Item(this);
    }

    // platform enums
    static STEAM = 'Steam';
    static PLAYSTATION = 'PlayStation';
    static XBOX = 'Xbox';
    static OTHER = 'Other';

    static platformOptions() {
        return [Game.STEAM, Game.PLAYSTATION, Game.XBOX, Game.OTHER];
    }

    platformOptions() {
        return Game.platformOptions();
    }

    toFirestore() {
        let title = this.title;
        let platform = this.platform;
        let image = this.image;
        let achievements = this.achievements;
        let dateCompleted = this.dateCompleted;

        return { title, platform, image, achievements, dateCompleted };
    }

    static fromFirestore(snapshot, options) {
        const data = snapshot.data(options);
        const game = new Game(data.title, data.platform, data.image, data.achievements, data.dateCompleted);
        game.id = snapshot.id;

        return game;
    }

}