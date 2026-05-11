export default class Achievement {
    id;
    name;
    description;
    increment;
    isPinned;
    isIncremental;
    isFavorited;
    isComplete;
    dateCompleted;

    constructor(name, description, increment, isPinned, isIncremental, isFavorited, isComplete, dateCompleted) {
        this.name = name;
        this.description = description;
        this.increment = increment;
        this.isPinned = isPinned ?? false;
        this.isIncremental = isIncremental ?? false;
        this.isFavorited = isFavorited ?? false;
        this.isComplete = isComplete ?? false;
        this.dateCompleted = dateCompleted ?? '';

        return this;
    }

    toFirestore() {
        let name = this.name;
        let description = this.description;
        let increment = this.increment;
        let isPinned = this.isPinned;
        let isIncremental = this.isIncremental;
        let isFavorited = this.isFavorited;
        let isComplete = this.isComplete;
        let dateCompleted = this.dateCompleted;

        return { name, description, increment, isPinned, isIncremental, isFavorited, isComplete, dateCompleted };
    }

    static fromFirestore(snapshot, options) {
        const data = snapshot.data(options);
        const achievement = new Achievement(data.name, data.description, data.increment, data.isPinned, data.isIncremental, data.isFavorited, data.isComplete, data.dateCompleted);
        achievement.id = snapshot.id;

        return achievement;
    }
    
}