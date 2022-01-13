const { Product } = require('../../entities');

module.exports = dependencies => {
  const { productsRepository } = dependencies;

  if (!productsRepository) {
    throw new Error('productRepository should be in dependencies');
  }

  const execute = ({ name, images, description, price }) => {
    const product = new Product({ name, description, images, price });

    return productsRepository.add(product);
  }

  return {
    execute
  }
}