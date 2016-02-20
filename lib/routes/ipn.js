'use strict';
const handler = require('../handlers').ipn;


exports.init = (app) => {
  app.post('/ipn-callback', handler.callback);
};
