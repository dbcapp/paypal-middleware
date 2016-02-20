'use strict';
const ipn = require('./ipn');


function init (app) {
  ipn.init(app);
}


module.exports = {
  'init': init
};