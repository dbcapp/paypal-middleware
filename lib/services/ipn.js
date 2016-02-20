'use strict';
const http = require('https');
const querystring = require('querystring');


function format (data) {
  let output = {
    'payer': {
      'id': data.payer_id,
      'firstName': data.first_name,
      'lastName': data.last_name,
      'email': data.payer_email,
      'status': data.payer_status,
      'address': {
        'name': data.address_name,
        'country': data.address_country,
        'countryCode': data.address_country_code,
        'zip': data.address_zip,
        'state': data.address_state,
        'city': data.address_city,
        'street': data.address_street
      }
    },
    'receiver': {
      'id': data.receiver_id,
      'business': data.business,
      'email': data.receiver_email,
      'country': data.residence_country,
      'tax': data.tax
    },
    'transaction': {
      'id': data.txn_id,
      'type': data.txn_type,
      'receipt': data.receipt_ID,
      'currency': data.mc_currency,
      'fee': data.mc_fee,
      'gross': data.mc_gross_1
    },
    'invoice': data.invoice
  };

  try {
    output.data = new Buffer(data.custom, 'base64').toString('utf-8');
    output.data = JSON.parse(output.data)
  } catch (err) {
    output.data = null;
  }

  return output;
};


function validate (data, config, callback) {
  let body = Object.create(data)
  body.cmd = '_notify-validate';
  
  let postData =  querystring.stringify(body);
  let options = {
    'host': (config.debug ? 'www.sandbox.paypal.com' : 'www.paypal.com'),
    'path': '/cgi-bin/webscr',
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  };

  let req = http.request(options, (res) => {
    let dataStr = '';
    
    res.setEncoding('utf8');
    
    res.on('data', (chunk) => {
      dataStr += chunk;
    });

    res.on('end', () => {
      callback(null, dataStr);
    });
  });

  req.on('error', (e) => {
    callback(e, null);
  });

  req.write(postData);
  req.end();
}


module.exports = {
  'format': format,
  'validate': validate
};