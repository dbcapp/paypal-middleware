'use strict';
const ref = require('../config/ipn.json');
const services = require('../services');

exports.callback = (req, res) => {
  let status = req.body.payment_status;
  
  if (!req.body || status === undefined) {
    req.app.get('ev').emit('donnation.error', {'error': 'invalid body'});
    return res.status(400).json({'error': 'invalid body'});
  }

  status = status.toLowerCase().replace(' ', '-');
  const debug = req.app.get('debug');
  
  if (ref.success.indexOf(status) !== -1) {
    services
      .ipn
      .validate(req.body, {'debug': debug}, (err, success) => {
        if (err) {
          req.app.get('ev').emit('donnation.error', err);
          return;
        }

        const response = services.ipn.format(req.body);

        if (success === 'VERIFIED') {
          req.app.get('ev').emit('donnation.success', response);
          return;
        }
        
        req.app.get('ev').emit('donnation.error', response);
      });
  }
  
  if (ref.process.indexOf(status) !== -1) {
    req.app.get('ev').emit('donnation.process', response);
  }

  if (ref.error.indexOf(status) !== -1) {
    req.app.get('ev').emit('donnation.error', response);
  }

  res.status(200).end();
};
