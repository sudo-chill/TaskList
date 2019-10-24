const ClientError = require('./ClientError');

const ERROR_CODE = 102;

class ListNotExistError extends ClientError {
  constructor(listId) {
    var message  = `No list with id of '${listId}' found.`;
    super(message, ERROR_CODE);
    this._listId = listId;
  }

  get listId() { return this._listId; }
}

module.exports = ListNotExistError;
