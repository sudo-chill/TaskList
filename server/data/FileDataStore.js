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
      console.log('reading file');
      var filepath = path.resolve(__dirname, DATA_FILE);
      data = JSON.parse(fs.readFileSync(filepath));
    }
  }

  getList(id) {
    if(id < 0 || id > data.length) {
      return null;
    }
    return data[id];
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
}

module.exports = FileDataStore;