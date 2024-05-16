const { default: mongoose } = require("mongoose");

const errorHandler = (cb) => {
  return async (req, res, next) => {
    try {
      let nextFnCalled = false;

      const result = await cb(req, res, (params) => {
        nextFnCalled = true;
        next(params);
      });

      if (!res.headersSent && !nextFnCalled) {
        res.json(result);
      }
    } catch (err) {
      next(err);
    }
  };
};

const withTransaction = (cb) => {
  return async (req, res, next) => {
    let result;
    await mongoose.connection.transaction(async (session) => {
      result = await cb(req, res, session);
      return result;
    });

    return result;
  };
};

module.exports = {
  errorHandler,
  withTransaction,
};
