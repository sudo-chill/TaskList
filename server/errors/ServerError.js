const ParentError = require('./ParentError');

const MIN_ERROR_CODE = 500;

class ServerError extends ParentError {
  constructor(message, errorCode) {
    if(errorCode < 500) {
      throw new Error(`ServerError codes must be at least ${MIN_ERROR_CODE}`);
    }
    super(message, errorCode);
  }

  isClientError() {
    return false;
  }

  isServerError() {
    return true;
  }
}

module.exports = ServerError;
