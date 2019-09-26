class ParentError extends Error {
  constructor(message, errorCode) {
    super(message);
    this._errorCode = errorCode;
    this.name = this.constructor.name;
    if(typeof(Error.captureStackTrace) === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(message)).stack;
    }
  }

  get message() {
    return this._message;
  }

  get errorCode() {
    return this._errorCode;
  }

  isClientError() {
    throw new Error('Not Implemented Yet');
  }

  isServerError() {
    throw new Error('Not Implemented Yet');
  }
}

module.exports = ParentError;
