const fs = require('fs');
const path = require('path');
const DataStore = require('./DataStore');

const DATA_FILE = './lists.json';

class FileDataStore extends DataStore {
  constructor() {
    super();
    var filepath = path.resolve(__dirname, DATA_FILE);
    this.data = JSON.parse(fs.readFileSync(filepath));
  }

  getList(id) {
    if(id < 0 || id > this.data.length) {
      return null;
    }
    return this.data[id];
  }

  getAllLists() {
    return this.data;
  }
}

module.exports = FileDataStore;