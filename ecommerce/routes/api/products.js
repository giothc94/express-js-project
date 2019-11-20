const express = require("express");
const router = express.Router();

// JWT strategie
const passport = require("passport");
require("../../util/auth/strategies/jwt");

const {
  createProductSchema,
  productIdSchema,
  productTagSchema,
  updateProductSchema
} = require("../../util/schemas/products");

const validate = require("../../util/middlewares/validationHandler");

const ProductsService = require("../../services/products");
const productService = new ProductsService();

const productsApi = app => {
  app.use("/api/products", router);

  router.get("/", async (req, res, next) => {
    const { tags } = req.query;
    try {
      const products = await productService.getProducts({ tags });
      res.status(200).json({
        data: products,
        message: "products listed"
      });
    } catch (error) {
      next(error);
    }
  });

  router.get("/:productId", async (req, res, next) => {
    const { productId } = req.params;
    try {
      const product = await productService.getProduct({ productId });
      res.status(200).json({
        data: product,
        message: "products retrieved"
      });
    } catch (error) {
      next(error);
    }
  });

  router.post(
    "/",
    validate({ schema: createProductSchema }),
    async (req, res, next) => {
      const { body: product } = req;
      try {
        const productCreated = await productService.createProduct({ product });
        res.status(201).json({
          idProduct: productCreated,
          message: "product created"
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.put(
    "/:productId",
    passport.authenticate("jwt", { session: false }),
    validate({ schema: { productId: productIdSchema }, check: "params" }),
    validate({ schema: updateProductSchema }),
    async (req, res, next) => {
      const { productId } = req.params;
      const { body: product } = req;
      try {
        const productUpdated = await productService.updateProducts({
          productId,
          product
        });

        res.status(200).json({
          upsertedId: productUpdated,
          message: "product updated"
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    "/:productId",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
      const { productId } = req.params;
      try {
        const product = await productService.deleteProducts({ productId });

        res.status(200).json({
          data: product,
          message: "products deleted"
        });
      } catch (error) {
        next(error);
      }
    }
  );
};

module.exports = productsApi;
