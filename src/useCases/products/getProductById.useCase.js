module.exports = dependencies => {
  const { productRepository } = dependencies;

  if (!productRepository) {
    throw new Error('productRepository should be in dependencies');
  }

  const execute = ({ id }) => {
    return productRepository.getById(id);
  }

  return {
    execute
  }
}