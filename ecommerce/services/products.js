const productMocks = require("../util/mocks/products");

const MongoLib = require("../lib/mongo");
class ProductsService {
  constructor() {
    this.collections = "products";
    this.mongodb = new MongoLib();
  }

  async getProducts({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const products = await this.mongodb.getAll(this.collections, query);
    return Promise.resolve(products || []);
  }
  getProduct({ productId }) {
    const product = this.mongodb.get(this.collections, productId);
    return Promise.resolve(product || {});
  }
  createProduct({ product }) {
    const createProduct = this.mongodb.create(this.collections, product);
    return Promise.resolve(createProduct);
  }
  updateProducts({ productId, product }) {
    const updateProductId = this.mongodb.update(
      this.collections,
      productId,
      product
    );
    return Promise.resolve(updateProductId);
  }
  deleteProducts({ productId }) {
    const deleteProductId = this.mongodb.delete(this.collections, productId);
    return Promise.resolve(deleteProductId);
  }
}

module.exports = ProductsService;
