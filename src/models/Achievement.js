export default class Achievement {
    id;
    name;
    description;
    increment;
    dateCompleted;

    constructor(name, description, increment, dateCompleted) {
        this.name = name;
        this.description = description;
        this.increment = increment;
        this.dateCompleted = dateCompleted ?? '';

        return Item(this);
    }

    toFirestore() {
        let name = this.name;
        let description = this.description;
        let increment = this.increment;
        let dateCompleted = this.dateCompleted;

        return { name, description, increment, dateCompleted };
    }

    static fromFirestore(snapshot, options) {
        const data = snapshot.data(options);
        const achievement = new Achievement(data.name, data.description, data.increment, data.dateCompleted);
        achievement.id = snapshot.id;

        return achievement;
    }
    
}