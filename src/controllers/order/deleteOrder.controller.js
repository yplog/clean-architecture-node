const { Response } = require('../../frameworks/common');

module.exports = (dependencies) => {
  const {
    useCases: {
      order: {
        deleteOrderUseCase
      }
    }
  } = dependencies;

  return async (req, res, next) => {
    try {
      const { body = {} } = req;
      const {
        userId,
        productIds,
        date,
        isPayed
      } = body;

      const deleteOrder = deleteOrderUseCase(dependencies);
      const response = await deleteOrder.execute({
        order: {
          userId, productIds, date, isPayed
        }
      });

      res.json(new Response({ status: true, content: response }));

      next();
    } catch (e) {
      next(e);
    }
  }
}