const fs = require('fs');
const path = require('path');
const DataStore = require('./DataStore');
const ListNotFoundError = require('../errors/ListNotFoundError');

const DATA_FILE = './lists.json';
let data = null;

class FileDataStore extends DataStore {
  constructor() {
    super();
    if(data == null) {
      var filepath = path.resolve(__dirname, DATA_FILE);
      data = JSON.parse(fs.readFileSync(filepath));
    }
  }

  // TODO: this is a terrible way to get the right thing. We need an object to act as a map
  // instead.
  getList(id) {
    if(id < 0 || id > data.length) {
      return null;
    }
    return data.filter((list) => {
      return list.id == id;
    });
  }

  getAllLists() {
    return data;
  }

  addItem(listId, itemData) {
    var list = data[listId];
    if(!list) {
      throw new ListNotFoundError(listId);
    }
    const newId = list.items.length + 1;
    itemData['id'] = newId;
    list.items.push(itemData);
    return newId;
  }

  // TODO: similar to getList, this is a very inefficient way to delete
  // an element.
  deleteList(listId) {
    if(!this.getList(listId)) {
      throw new ListNotFoundError(listId);
    }
    data = data.filter((list) => {
      return list.id != listId;
    });
  }
}

module.exports = FileDataStore;
