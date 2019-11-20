const Joi = require("@hapi/joi");

const validate = (data, schema) => {
  var { error } = Joi.validate(data, schema);
  return error;
};

const validationHandler = ({ schema, check = "body" }) => {
  return (req, res, next) => {
    const error = validate(req[check], schema);
    error ? res.status(400).json({error:error.details[0].message}) : next();
  };
};

module.exports = validationHandler;
