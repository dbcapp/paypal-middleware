'use strict';
const express = require('express');
const middlewares = require('./middlewares');
const routes = require('./routes');
const EventEmitter = require('events');

module.exports = (options) => {
  const app = express();
  const opt = options || {};
  const ev = opt.ev || new EventEmitter();
  let debug = options.debug;
  
  if (debug === undefined) {
    debug = false;
  }

  if (opt.process) {
    ev.on('donnation.process', opt.process);
  }

  if (opt.success) {
    ev.on('donnation.success', opt.success);
  }

  if (opt.error) {
    ev.on('donnation.error', opt.error);
  }

  app.set('ev', ev);
  app.set('debug', debug);
  middlewares.init(app);
  routes.init(app);
  
  return app;
};
