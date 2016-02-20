'use strict';
const bodyParser = require('body-parser');


exports.jsonParser = (app) => {
  app.use(bodyParser.json());
}


exports.formParser = (app) => {
  app.use(bodyParser.urlencoded({extended: true}));
}


exports.init = (app) => {
  exports.jsonParser(app);
  exports.formParser(app);
}
