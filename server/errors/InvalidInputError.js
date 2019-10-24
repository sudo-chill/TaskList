const ClientError = require('./ClientError');

const ERROR_CODE = 101;

class InvalidInputError extends ClientError {
  constructor(badInput) {
    const message = 'Invalid input detected. See invalidInput field for more information';
    super(message, ERROR_CODE);
    this._invalidInput = badInput;
  }

  get invalidInput() { return this._invalidInput };
}

module.exports = InvalidInputError;
