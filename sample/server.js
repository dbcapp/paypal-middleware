'use strict';
const express = require('express');
const paypal = require('paypal-middleware');


let app = express();
let cfg = {
  debug: true,
  process: (data) => {
    console.log(data);
  },
  success: (data) => {
    console.log(data);
  },
  error: (data) => {
    console.log(data);
  }
};

app.use('/paypal', paypal(cfg));


app.listen(3000, () => {
  console.log('Running on 3000');
});