const { Response, ResponseError } = require('../common');

module.exports = (err, req, res, next) => {
  const error = new ResponseError({
    status: err.status || 500,
    message: err.message || 'No Message',
    reason: err.reason || err.stack,
    url: req.originalUrl,
    ip: req.ip
  });

  req.status(error.status);
  res.json(new Response({ status: false, error }));
}