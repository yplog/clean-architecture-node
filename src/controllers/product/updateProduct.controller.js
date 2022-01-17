const { Response } = require('../../frameworks/common');

module.exports = (dependencies) => {
  const {
    useCases: {
      product: {
        updateProductUseCase
      }
    }
  } = dependencies;

  return async (req, res, next) => {
    try {
      const { body = {} } = req;
      const { name, description, images, price } = body;

      const updateProduct = updateProductUseCase(dependencies);
      const response = await updateProduct.execute({
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