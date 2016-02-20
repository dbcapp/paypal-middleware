'use strict';
const ipn = require('./ipn');

exports.init = (app) => {
  ipn.init(app);
};
