const Joi = require("@hapi/joi");

const productIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const productTagSchema = Joi.array().items(
  Joi.string()
    .max(20)
    .required()
);

const createProductSchema = {
  name: Joi.string()
    .max(50)
    .required(),
  price: Joi.number()
    .min(1)
    .max(1000000)
    .required(),
  image: Joi.string().required(),
  tags: productTagSchema.required()
};

const updateProductSchema = {
  name: Joi.string().max(50),
  price: Joi.number()
    .min(1)
    .max(1000000),
  image: Joi.string(),
  tags: productTagSchema
};

module.exports = {
  productIdSchema,
  productTagSchema,
  createProductSchema,
  updateProductSchema
};
