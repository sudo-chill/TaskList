/**
 * Server side representation of a list.
 * TODO: see if there is a better way to represent the data so
 * UI code doesn't have to reference fields with underscores. Then again,
 * that *does* enforce a nice pattern of always knowing what content is from an API call
 * vs locally defined...
 */
class List {
  constructor(options) {
    this._title = options.title || 'I am a list!';
    this._items = options.items || [];
    this._id = options.id;
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

  get id() {
    return this._id;
  }

  addItem(item) {
    const newId = this._items.length;
    item['id'] = newId;
    this._items.push(item);
    return newId;
  }
}

module.exports = List;
