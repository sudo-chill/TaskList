const ServerError = require('./ServerError')

const ERROR_CODE = 1;

class NotImplementedError extends ServerError {
  constructor() {
    super("Not Implemented Yet", ERROR_CODE);
  }
}

module.exports = NotImplementedError;