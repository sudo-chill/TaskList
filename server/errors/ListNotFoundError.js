const ClientError = require('./ClientError');

const ERROR_CODE = 101;

class ListNotExistError extends ClientError {
  constructor(listId) {
    var message  = `No list with id of '${listId}' found.`;
    super(message, ERROR_CODE);
  }
}

module.exports = ListNotExistError;