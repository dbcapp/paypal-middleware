'use strict';

exports.send = (status, req, res, next) => {
  res
    .status(status)
    .end();
};
