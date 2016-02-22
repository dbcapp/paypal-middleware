'use strict';
const ref = require('../config/ipn.json');
const services = require('../services');

exports.callback = (req, res, next) => {
  let status = req.body.payment_status;
  
  if (!req.body || status === undefined) {
    req.app.get('ev').emit('donnation.error', {'error': 'invalid body'});
    return next(400);
  }

  status = status.toLowerCase().replace(' ', '-');
  const debug = req.app.get('debug');
  const response = services.ipn.format(req.body);

  console.log(response);
  
  if (ref.success.indexOf(status) !== -1) {
    services
      .ipn
      .validate(req.body, {'debug': debug}, (err, success) => {
        if (err) {
          req.app.get('ev').emit('donnation.error', err);
          return next(200);
        }

        if (success === 'VERIFIED') {
          req.app.get('ev').emit('donnation.success', response);
          return next(200);
        }
        
        req.app.get('ev').emit('donnation.error', response);
        return next(200);
      });
  }
  
  if (ref.process.indexOf(status) !== -1) {
    req.app.get('ev').emit('donnation.process', response);
  }

  if (ref.error.indexOf(status) !== -1) {
    req.app.get('ev').emit('donnation.error', response);
  }

  next(200);
};
