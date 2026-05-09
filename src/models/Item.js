function Item(item) {
    item.pinned = false;
    item.favorited = false;
    item.completed = false;
    item.iterable = false;

    // pin functions
    item.togglePin = function() {
        this.pinned = !this.pinned;
        return this;
    }

    item.isPinned = function() {
        return this.pinned;
    }

    // favorite functions
    item.toggleFavorite = function() {
        this.favorited = !this.favorited;
        return this;
    }

    item.isFavorited = function() {
        return this.favorited;
    }

    // complete functions
    item.toggleComplete = function() {
        this.completed = !this.completed;
        this.dateCompleted = this.completed ? new Date() : null;
        return this;
    }

    item.isComplete = function() {
        return this.completed;
    }

    // iterable functions
    item.toggleIterable = function() {
        this.iterable = !this.iterable;
        return this;
    }

    item.isIterable = function() {
        return this.iterable;
    }

    item.formatDate = function(date) {
        const months = [
            'January', 'February', 'March', 
            'April', 'May', 'June', 'July', 
            'August', 'September', 'October', 
            'November', 'December'];
        
        if (!date) return null;

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let hours = date.getHours();
        let minutes = date.getMinutes();

        return `${months[month + 1]} ${day}, ${year} at ${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    }

    return item;
    

}

export default Item;