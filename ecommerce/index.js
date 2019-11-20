const express = require("express");
const path = require("path");
const logger = require('morgan')
const helmet = require('helmet')

const {
  errorNotFound,
  logErrors,
  clientErrorHandler,
  errorHandler
} = require("./util/middlewares/errorHandlers");

const productRoutesViews = require("./routes/views/products");
const apiProductRoutes = require("./routes/api/products");
const apiAuthRoutes = require('./routes/api/auth')

// App
const app = express();

// Middlewares
app.use(helmet())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'))

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// statics files
app.use("/static", express.static(path.join(__dirname, "public")));

// catch error for AJAX request
app.use(clientErrorHandler);

// Routes
productRoutesViews(app)
apiProductRoutes(app)
apiAuthRoutes(app)

// Redirect
app.get("/", (req, res, next) => {
  res.redirect("/products");
});

// catch 404 error
app.use(errorNotFound);

// log errors
app.use(logErrors);

// error handler
app.use(errorHandler);

// Server
const server = app.listen(8000, () => {
  console.log(`listening http://localhost:${server.address().port}`);
});
