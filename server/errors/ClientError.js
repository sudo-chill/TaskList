const ParentError = require('./ParentError');

const MIN_ERROR_CODE = 100;
const MAX_ERROR_CODE = 499;

class ServerError extends ParentError {
  constructor(message, errorCode) {
    if(errorCode < MIN_ERROR_CODE) {
      throw new Error(`ClientError codes must be at least ${MIN_ERROR_CODE}`);
    } else if(errorCode > MAX_ERROR_CODE) {
      throw new Error(`ClientError codes can be at most ${MAX_ERROR_CODE}`);
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
