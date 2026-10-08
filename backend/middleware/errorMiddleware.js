const notFound = (req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  let message = err.message || 'Server error';

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 400;
    message = 'Invalid MongoDB ObjectId';
  } else if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((value) => value.message)
      .join(', ');
  } else if (err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate value entered';
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
