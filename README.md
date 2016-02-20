# paypal IPN Middleware

ExpressJS middleware for hanbdling paypal ipn webhook.

Uses EventEMitter when a callback request is received.

## Usage

```js
'use strict';
const paypal = require('paypal-middleware');

const app = express();

const cfg = {
  debug: true,
  process: (data) => {
    //pending status
    console.log({'a': 'process', 'data': data});
  },
  success: (data) => {
    //transaction completed with success
    console.log({'a': 'success', 'data': data});
  },
  error: (data) => {
    //error status
    console.log({'a': 'error', 'data': data});
  }
};

app.use('/paypal', paypal(cfg));

app.listen(3000, () => {
  console.log('Running on 3000');
});
```