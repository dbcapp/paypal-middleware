'use strict'; 
const assert = require('assert');
const request = require('supertest');
const express = require('express');
const paypal = require('../lib');
const payload = require('./payload.json');
const querystring = require('querystring');

describe('Paypal', () => {
  let app;

  before(() => {
    app = paypal({'debug': true});
  });

  after(() => {
    app = null;
  });

  describe('Callback service', () => {
    it('should have an missing body', (done) => {
      request(app)
        .post('/ipn-callback')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .expect(400, done)
    });

    it('should have an invalid body', (done) => {
      request(app)
        .post('/ipn-callback')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send('a=1')
        .expect(400, done)
    });

    it('should execute successfully', (done) => {
      console.log(querystring.stringify(payload));
      request(app)
        .post('/ipn-callback')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(querystring.stringify(payload))
        .expect(200, done);
    });
  });
});
