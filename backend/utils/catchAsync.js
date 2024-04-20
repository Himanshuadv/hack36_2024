module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      console.log(err.message);
     res.status(err.statusCode || 500).json({
        status: err.status || 'error',
        message: err.message
      });
      next(err); // Pass the error to the Express.js error-handling middleware
    });
  };
};
