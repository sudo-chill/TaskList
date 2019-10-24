const DataValidator = require('./DataValidator');
const InvalidInputError = require('../errors/InvalidInputError');
var expect = require('chai').expect;

describe('DataValidator', () => {
  describe('validateListId()', () => {
    it('ensures the id is defined', () => {
      expect(() => {
        DataValidator.validateListId(null);
      }).to.throw(InvalidInputError);
    });

    it('ensures the id is numeric', () => {
      expect(() => {
        DataValidator.validateListId('abc');
      }).to.throw(InvalidInputError);
    });
  });

  describe('validateListTitle()', () => {
    it('ensures the title is defined', () => {
      expect(() => {
        DataValidator.validateListTitle(null);
      }).to.throw(InvalidInputError);
    });

    it('ensures the title is not empty', () => {
      expect(() => {
        DataValidator.validateListTitle('');
      }).to.throw(InvalidInputError);
    });

    it('ensures the title is not too long', () => {
      expect(() => {
        DataValidator.validateListTitle("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      }).to.throw(InvalidInputError);
    });

    it('does nothing if the title is fine', () => {
      expect(() => {
        DataValidator.validateListTitle('normal title');
      }).to.not.throw();
    });
  });

  describe('validateValueDefined()', () => {
    it('does nothing if the value is defined', () => {
      expect(() => {
        DataValidator.validateValueDefined('hello');
      }).to.not.throw();
    });

    it('throws an InvalidInputError with info if the value is undefined', () => {
      expect(() => {
        DataValidator.validateValueDefined(undefined, 'test');
      }).to.throw(InvalidInputError, /Invalid input detected/).that.satisfies((e) => {
        return e.invalidInput.test === 'was not provided';
      });
    });
  });

  describe('validateLengthMoreThan()', () => {
    it('does nothing if the value is larger than the given min size', () => {
      expect(() => {
        DataValidator.validateLengthMoreThan('test', 2, 'test');
      }).to.not.throw();
    });

    it('does nothing if the value does not define a length function', () => {
      expect(() => {
        DataValidator.validateLengthMoreThan(14, 2, 'test');
      }).to.not.throw();
    });

    it('throws an InvalidInputError if the value is smaller than the given min size', () => {
      expect(() => {
        DataValidator.validateLengthMoreThan('teststring', 40, 'test');
      }).to.throw(InvalidInputError, /Invalid input detected/).that.satisfies(e => {
        return e.invalidInput.test === 'must be longer than 40';
      });
    });
  });

  describe('validateLengthLessThan()', () => {
    it('does nothing if the value is smaller than the given max size', () => {
      expect(() => {
        DataValidator.validateLengthLessThan('test', 8, 'test');
      }).to.not.throw();
    });

    it('does nothing if the value does not define a length function', () => {
      expect(() => {
        DataValidator.validateLengthLessThan(14, 2, 'test');
      }).to.not.throw();
    });

    it('throws an InvalidInputError if the value is larger than the given max size', () => {
      expect(() => {
        DataValidator.validateLengthLessThan('teststring', 3, 'test');
      }).to.throw(InvalidInputError, /Invalid input detected/).that.satisfies(e => {
        return e.invalidInput.test === 'can be no longer than 3';
      });
    });
  });

  describe('validateValueNumeric()', () => {
    it('does nothing if the value is numeric', () => {
      expect(() => {
        DataValidator.validateValueNumeric('123', 'test');
      }).to.not.throw();
    });

    it('throws an InvalidInputError if the value is not numeric', () => {
      expect(() => {
        DataValidator.validateValueNumeric('abc', 'test');
      }).to.throw(InvalidInputError, /Invalid input detected/).that.satisfies(e => {
        return e.invalidInput.test === 'must be numeric';
      });
    });

    it('throws an InvalidInputError if the value is partially numeric', () => {
      expect(() => {
        DataValidator.validateValueNumeric('a2b3c', 'test');
      }).to.throw(InvalidInputError, /Invalid input detected/).that.satisfies(e => {
        return e.invalidInput.test === 'must be numeric';
      });
    });
  });
});