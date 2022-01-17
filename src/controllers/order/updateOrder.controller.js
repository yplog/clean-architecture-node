const { Response } = require('../../frameworks/common');

module.exports = (dependencies) => {
  const {
    useCases: {
      order: {
        updateOrderUseCase
      }
    }
  } = dependencies;

  return async (req, res, next) => {
    try {
      const { body = {} } = req;
      const {
        id,
        userId,
        productIds,
        date,
        isPayed
      } = body;

      const updateOrder = updateOrderUseCase(dependencies);
      const response = await updateOrder.execute({
        order: {
          id, userId, productIds, date, isPayed
        }
      });

      res.json(new Response({ status: true, content: response }));

      next();
    } catch (e) {
      next(e);
    }
  }
}