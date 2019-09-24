// standard modules
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const app = express();

// local stuff
const List = require('./concepts/List');
const FileDataStore = require('./data/FileDatastore');

app.use(bodyParser.urlencoded({extended: false}));
app.use(pino);

let dataStore;

app.listen(3001, () => {
  // load data from 'database' (a file) once on app startup
  dataStore = new FileDataStore();
  console.log('Express server running on 3001');
});

app.get('/api/listing/list', (req, res) => {
  var lists = dataStore.getAllLists().map(listData => new List(listData));
  res.json({lists: lists});
});
