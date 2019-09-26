const ParentError = require('./ParentError');

class ErrorHelper {
  static handleGlobalError(err, req, res, next) {
    if(!err) {
      res.status(200);
    } else {
      var errRes = {error: err.message};
      var status = 500;
      if(err instanceof(ParentError)) {
        errRes.errorCode = err.errorCode;
        if(err.isClientError()) {
          status = 400;
        }
      }

      if(req.query['asXhr']) {
        res.status(status).json({error: errRes});
      } else {
        res.status(status).render('error', errRes);
      }
    }
  }
}

module.exports = ErrorHelper;
