const express = require("express");

const router = express.Router();

const ProductsService = require("../../services/products");
const productService = new ProductsService();

const { config } = require("../../config");

const cacheResponse = require("../../util/cache/cacheResponse");
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS
} = require("../../util/cache/time");

const productsView = app => {
  app.use("/products", router);
  router.get("/", async (req, res, next) => {
    cacheResponse(res,FIVE_MINUTES_IN_SECONDS)
    const { tags } = req.query;
    try {
      const products = await productService.getProducts({ tags });
      res.render("products", { products, dev: config.dev });
    } catch (error) {
      next(error);
    }
  });

  router.get("/:name/:lastName", async (req, res, next) => {
    const { name, lastName } = req.params;
    res.send(`
    <div>
    <p>Hola, <strong>${name} ${lastName}</strong></p>
    </div>
    `);
  });
};

module.exports = productsView;
