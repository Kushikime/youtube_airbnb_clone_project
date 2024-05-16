const errorHandler = (cb) => {
  return async (req, res, next) => {
    try {
      const result = await cb(req, res);
      res.json(result);
    } catch (err) {
      next(err);
    }
  };
};

module.exports = {
  errorHandler,
};
