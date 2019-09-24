class List {
    constructor() {
        this._title = 'this is a list';
        this._items = [];
    }
    set title(newTitle) {
        this._title = newTitle;
    }
    get title() {
        return this._title;
    }
    get items() {
        return this._items;
    }
}

module.exports = List;
