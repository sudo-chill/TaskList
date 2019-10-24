const InvalidInputError = require('../errors/InvalidInputError');

class DataValidator {
  static validateListTitle(title) {
    DataValidator.validateValueDefined(title, 'List title');
    DataValidator.validateLengthMoreThan(title, 0, 'List title');
    DataValidator.validateLengthLessThan(title, 30, 'List title');
  }

  static validateListId(id) {
    DataValidator.validateValueDefined(id, 'List id');
    DataValidator.validateValueNumeric(id, 'List id');
  }

  static validateValueDefined(val, name) {
    if(!val) {
      this.throwInvalidInputError(name, 'was not provided');
    }
  }

  static validateLengthMoreThan(measurable, minLength, name) {
    if(measurable.length && measurable.length < minLength) {
      this.throwInvalidInputError(name, 'must be longer than ' + minLength);
    }
  }

  static validateLengthLessThan(measurable, maxLength, name) {
    if(measurable.length && measurable.length > maxLength) {
      this.throwInvalidInputError(name, 'can be no longer than ' + maxLength);
    }
  }

  static validateValueNumeric(val, name) {
    if(val.search(/^\d+$/) !== 0) {
      this.throwInvalidInputError(name, 'must be numeric');
    }
  }

  static throwInvalidInputError(name, message) {
    let bad = {};
    bad[name] = message;
    throw new InvalidInputError(bad);
  }
}

module.exports = DataValidator;
