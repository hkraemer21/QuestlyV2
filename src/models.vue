<script>

function ItemCollection(array) {
    const items = array || [];

    items.addItem = function(item) {
        items.push(item);
        return items;
    }

    items.deleteItem = function(item) {
        items.splice(items.indexOf(item), 1);
        return items;
    }

    return items;
}

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

    return item;
}

function Game(name, image, platform, achievements) {
    this.name = name;
    this.image = image;
    this.platform = platform;
    this.achievements = achievements || [];

    return Item(this);

}

function Achievement(name, description) {
    this.name = name;
    this.description = description;
    this.increment = 0;

    return Item(this);
}





export { Item, Game, Achievement, ItemCollection };

</script>