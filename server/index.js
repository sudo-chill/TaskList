// standard modules
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const app = express();

// local stuff
const ErrorHelper = require('./errors/ErrorHelper');
const List = require('./concepts/List');
const FileDataStore = require('./data/FileDatastore');

app.use(bodyParser.json());
app.use(pino);
app.use(ErrorHelper.handleGlobalError);

//======= app startup ==============

let dataStore;

app.listen(3001, () => {
  // load data from 'database' (a file) once on app startup
  dataStore = new FileDataStore();
  console.log('Express server running on 3001');
});

//=========== routes ===============

app.get('/api/listing/list', (req, res) => {
  try {
    var lists = dataStore.getAllLists().map(listData => new List(listData));
    console.log('list count: ', lists.length);
    res.json({lists: lists});
  } catch(e) {
    ErrorHelper.handleGlobalError(e, req, res);
  }
});

app.post('/api/listing/create-item', (req, res) => {
  try {
    let newId = dataStore.addItem(req.body['id'] - 1, req.body['item']);
    res.json({newId: newId});
  } catch(e) {
    ErrorHelper.handleGlobalError(e, req, res);
  }
})
