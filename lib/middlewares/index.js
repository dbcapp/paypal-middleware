'use strict';
const request = require('./request');


exports.request = request;

exports.init = (app) => {
  request.init(app);
}
