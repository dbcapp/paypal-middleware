'use strict';
const handler = require('../handlers').ipn;


function init (app) {
  app.post('/ipn-callback', handler.callback);
}


module.exports = {
  'init': init
};