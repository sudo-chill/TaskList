const ServerError = require('./ServerError');

const ERROR_CODE = 501;

class DuplicateListIdError extends ServerError {
  constructor(listId, dupCount) {
    var message  = `${dupCount} lists exist with the same id of ${listId}`;
    super(message, ERROR_CODE);
    this._listId = listId;
    this._duplicateCount = dupCount;
  }

  get listId() { return this._listId; }
  get duplicateCount() { return this._duplicateCount; }
}

module.exports = DuplicateListIdError;