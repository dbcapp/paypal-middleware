'use strict';
const express = require('express');
const paypal = require('../lib'); //require('paypal-middleware');


let app = express();
let cfg = {
  debug: true,
  process: (data) => {
    console.log({'a': 'process', 'data': data});
  },
  success: (data) => {
    console.log({'a': 'success', 'data': data});
  },
  error: (data) => {
    console.log({'a': 'error', 'data': data});
  }
};

app.use('/paypal', paypal(cfg));


app.listen(3000, () => {
  console.log('Running on 3000');
});