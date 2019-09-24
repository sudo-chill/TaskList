const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const app = express();

const List = require('./concepts/List');

app.use(bodyParser.urlencoded({extended: false}));
app.use(pino);

app.get('/api/lists/list', (req, res) => {
  var list = new List();
  list.title = 'I am a list';
  list.items.push({desc: 'i am an item', checked: true});
  list.items.push({desc: 'i am an unfinished item', checked: false});
  res.setHeader('Content-Type', 'application/json');
  res.json({lists: [list]});
});

app.listen(3001, () => {
  console.log('Express server running on 3001');
});