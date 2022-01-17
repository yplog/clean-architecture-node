const { Response } = require('../../frameworks/common');

module.exports = (dependencies) => {
  const {
    useCases: {
      order: {
        addOrderUseCase
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

      const addOrder = addOrderUseCase(dependencies);
      const response = await addOrder.execute({ userId, productIds, date, isPayed });

      res.json(new Response({ status: true, content: response }));

      next();
    } catch (e) {
      next(e);
    }
  }
}