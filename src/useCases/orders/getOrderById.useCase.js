module.exports = (dependencies) => {
  const { orderRepository } = dependencies;

  if (!orderRepository) {
    throw new Error('orderRepository should be exist in dependencies!');
  }

  const execute = ({ id }) => {
    return orderRepository.getById(id);
  };

  return {
    execute
  }
}