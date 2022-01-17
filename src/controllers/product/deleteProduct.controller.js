const { Response } = require('../../frameworks/common');

module.exports = (dependencies) => {
  const {
    useCases: {
      product: {
        deleteProductUseCase
      }
    }
  } = dependencies;

  return async (req, res, next) => {
    try {
      const { body = {} } = req;
      const { name, description, images, price } = body;

      const deleteProduct = deleteProductUseCase(dependencies);
      const response = await deleteProduct.execute({
        product: {
          name, description, images, price
        }
      });

      res.json(new Response({ status: true, content: response }));

      next();
    } catch (e) {
      next(e);
    }
  }
}