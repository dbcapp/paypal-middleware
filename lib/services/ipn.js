'use strict';
const http = require('https');
const querystring = require('querystring');


exports.format = (data) => {
  const output = {
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
      'gross': data.payment_gross,
      'handling': data.mc_handling,
      'handling1': data.mc_handling1,
      'shipping': data.mc_shipping,
      'shipping1': data.mc_shipping1
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


exports.validate = (data, config, callback) => {
  const body = JSON.parse(JSON.stringify(data));
  body.cmd = '_notify-validate';
  
  const postData =  querystring.stringify(body);
  const options = {
    'host': (config.debug ? 'www.sandbox.paypal.com' : 'www.paypal.com'),
    'path': '/cgi-bin/webscr',
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  };

  const req = http.request(options, (res) => {
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
