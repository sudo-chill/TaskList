const ERROR_CODE = 0;

class NotImplementedError extends Error {
  constructor() {
    super("Not Implemented Yet");
    // https://stackoverflow.com/questions/31089801/extending-error-in-javascript-with-es6-syntax-babel
    this.name = this.constructor.name;
    if(typeof(Error.captureStackTrace) === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(message)).stack;
    }
  }

  get errorCode() {
    return ERROR_CODE;
  }
}

module.exports = NotImplementedError;