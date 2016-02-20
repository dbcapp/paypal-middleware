'use strict';


const ref = require('../config/ipn.json');
const services = require('../services');


function callback (req, res) {
  let status = req.body.payment_status.toLowerCase().replace(' ', '-');
  let debug = req.app.get('debug');
  if (ref.success.indexOf(status) !== -1) {
    services
      .ipn
      .validate(req.body, {'debug': debug}, (err, success) => {
        if (err) {
          req.app.get('ev').emit('donnation.error', err);
          return;
        }
        
        if (success === 'VERIFIED') {
          req.app.get('ev').emit('donnation.success', services.ipn.format(req.body));
          return;
        }

        req.app.get('ev').emit('donnation.error', services.ipn.format(req.body));
      });
  }
  
  if (ref.process.indexOf(status) !== -1) {
    req.app.get('ev').emit('donnation.process', services.ipn.format(req.body));
  }

  if (ref.error.indexOf(status) !== -1) {
    req.app.get('ev').emit('donnation.error', services.ipn.format(req.body));
  }

  res.status(200).end();
}


module.exports = {
  'callback': callback
};