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

  /**
   * This allows us to easily represent an error with all relevant fields
   * in a response that can be used on the client. The expectation is that
   * child errors can augment the JSON representation with additional info
   * if they wish and call super.asObject() with that data.
   * @param {*} other - optional; if provided, will have data merged with
   *                    the current object to be returned.
   */
  asObject(other) {
    let result = {message: this.message, errorCode: this.errorCode };
    if(other) {
      if(other instanceof(ParentError)) {
        other = other.asObject();
      }
      Object.keys(other).forEach(key => result[key] = other[key]);
    }
    return result;
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
