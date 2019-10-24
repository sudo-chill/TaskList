// standard modules
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const app = express();

// local stuff
const ErrorHelper = require('./errors/ErrorHelper');
const List = require('./concepts/List');
const InMemoryDataStore = require('./data/InMemoryDataStore');
const DataValidator = require('./validation/DataValidator');

app.use(bodyParser.json());
app.use(pino);
app.use(ErrorHelper.handleGlobalError);

//======= app startup ==============

let dataStore;

app.listen(3001, () => {
  // load data from 'database' (a file) once on app startup
  dataStore = new InMemoryDataStore();
  console.log('Express server running on 3001');
});

//=========== routes ===============

app.get('/api/listing/list', (req, res) => {
  try {
    var lists = dataStore.getAllLists().map(listData => new List(listData));
    res.json({lists: lists});
  } catch(e) {
    ErrorHelper.handleGlobalError(e, req, res);
  }
});

app.post('/api/listing/create', (req, res) => {
  try {
    let title = req.body['title'];
    DataValidator.validateValueDefined(title, 'List title');
    title = title.trim();
    DataValidator.validateListTitle(title);
    let newId = dataStore.createList(title);
    res.json({listId: newId});
  } catch(e) {
    ErrorHelper.handleGlobalError(e, req, res);
  }
});

app.put('/api/listing/create-item', (req, res) => {
  try {
    let newId = dataStore.addItem(req.body['id'] - 1, req.body['item']);
    res.json({newId: newId});
  } catch(e) {
    ErrorHelper.handleGlobalError(e, req, res);
  }
});

app.delete('/api/listing/delete-list/:id', (req, res) => {
  let id = req.params['id'];
  if(!id) { id = '' };
  id = id.trim();
  try {
    DataValidator.validateListId(id);
    dataStore.deleteList(parseInt(id));
    res.json({});
  } catch(e) {
    ErrorHelper.handleGlobalError(e, req, res);
  }
});
