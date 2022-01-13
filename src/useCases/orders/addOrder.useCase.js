const { Order } = require('../../entities');

module.exports = (dependencies) => {
  const { orderRepository } = dependencies;

  if (!orderRepository) {
    throw new Error('orderRepository should be exist in dependencies!');
  }

  const execute = ({ userId, productIds, date, isPayed }) => {
    const order = new Order({ userId, productIds, date, isPayed });

    return orderRepository.add(order);
  };

  return {
    execute
  }
}