const createError = require("http-errors");
const { config } = require("../../config");

const errorNotFound = (req, res, next) => {
  // catch error 404
  if (!req.accepts("html")) {
    res.status(400).json(createError(404))
  }
  next(createError(404));
};

const logErrors = (error, req, res, next) => {
  // log error
  console.log("ERROR:::", error);
  next(error);
};

const clientErrorHandler = (req, res, next) => {
  // catch error for AJAX request
  const error = new Error("No XMLHttpRequest");
  if (req.xhr) {
    res.status(500).json({ error: error.message });
    next(error);
  } else {
    next();
  }
};

const errorHandler = (err, req, res, next) => {
  // catch error while streaming
  if (res.headerSent) {
    next(err);
  }

  if (!config.dev) {
    delete err.stack;
  }
  res.status(err.status || 500).render("error", { error: err });
};

module.exports = {
  errorNotFound,
  logErrors,
  clientErrorHandler,
  errorHandler
};
