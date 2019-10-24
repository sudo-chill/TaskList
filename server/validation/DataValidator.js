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
      let bad = {};
      bad[name] = ' was not provided';
      throw new InvalidInputError(bad);
    }
  }

  static validateLengthMoreThan(measurable, minLength, name) {
    if(measurable.length && measurable.length < minLength) {
      let bad = {};
      bad[name] = ' must be longer than ' + minLength;
      throw new InvalidInputError(bad);
    }
  }

  static validateLengthLessThan(measurable, maxLength, name) {
    if(measurable.length && measurable.length < maxLength) {
      let bad = {};
      bad[name] = ' can be no longer than ' + maxLength;
      throw new InvalidInputError(bad);
    }
  }

  static validateValueNumeric(val, name) {
    if(val.search(/^\d+$/) !== 0) {
      let bad = {};
      bad[name] = ' must be numeric'
      throw new InvalidInputError(bad);
    }
  }
}

module.exports = DataValidator;
