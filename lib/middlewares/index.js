'use strict';
const request = require('./request');


function init (app) {
  request.init(app);
}


module.exports = {
  'request': request,
  'init': init
};