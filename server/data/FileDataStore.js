const fs = require('fs');
const path = require('path');
const IDataStore = require('./IDataStore');
const ListNotFoundError = require('../errors/ListNotFoundError');
const DuplicateListIdError = require('../errors/DuplicateListIdError');

const DATA_FILE = './lists.json';
let data = null;

class FileDataStore extends IDataStore {
  constructor(inputData) {
    super();
    if(data == null) {
      if(inputData) {
        data = inputData;
      } else {
        var filepath = path.resolve(__dirname, DATA_FILE);
        data = JSON.parse(fs.readFileSync(filepath));
      }
    }
  }

  // used so we don't retain data between test runs
  static reset() {
    data = null;
  }

  // TODO: this is a terrible way to get the right thing. We need an object to act as a map
  // instead.
  getList(id) {
    if(id < 0 || id > data.length) {
      return null;
    }
    let matches = data.filter((list) => {
      return list.id == id;
    });
    if(matches.length === 0) {
      return null;
    } else if(matches.length > 1) {
      throw new DuplicateListIdError(id, matches.length);
    }
    return matches[0];
  }

  getAllLists() {
    return data;
  }

  addItem(listId, itemData) {
    var list = this.getList(listId);
    if(!list) {
      throw new ListNotFoundError(listId);
    }
    const newId = list.items.length + 1;
    itemData['id'] = newId;
    // TODO: validate item data
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
