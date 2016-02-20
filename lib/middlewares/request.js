'use strict';
const bodyParser = require('body-parser');


function jsonParser (app) {
  app.use(bodyParser.json());
}


function formParser (app) {
  app.use(bodyParser.urlencoded({extended: true}));
}


function init (app) {
  jsonParser(app);
  formParser(app);
}


module.exports = {
  'jsonParser': jsonParser,
  'formParser': formParser,
  'init': init
};