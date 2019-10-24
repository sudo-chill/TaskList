const fs = require('fs');
const path = require('path');
const NotImplementedError = require('../errors/NotImplementedError');

const DATA_FILE = './lists.json';

/**
 * This is an 'interface' (it does not implement any behavior). DataStore extenders
 * should implement these methods.
 */
class DataStore {
  getList(id) {
    throw new NotImplementedError();
  }

  getAllLists() {
    throw new NotImplementedError();
  }

  addItem(listId, itemData) {
    throw new NotImplementedError();
  }

  deleteList(listId) {
    throw new NotImplementedError();
  }

  createList(listData) {
    throw new NotImplementedError();
  }
}

module.exports = DataStore;
