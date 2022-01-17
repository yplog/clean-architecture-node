const Chance = require('chance');
const {productRepository} = require('../../../src/frameworks/repositories/inMemory');
const {Product} = require('../../../src/entities');
const {cloneDeep} = require("lodash");

const chance = new Chance();

describe('Product repository', () => {
  test('New product should be added and returned', async () => {
    const testProduct = new Product({
      name: chance.name(),
      description: chance.sentence(),
      images: [chance.url, chance.url],
      price: chance.natural()
    });

    const addedProduct = await productRepository.add(testProduct);

    expect(addedProduct).toBeDefined();
    expect(addedProduct.id).toBeDefined();
    expect(addedProduct.name).toBe(testProduct.name);
    expect(addedProduct.description).toBe(testProduct.description);
    expect(addedProduct.images).toEqual(testProduct.images);
    expect(addedProduct.price).toBe(testProduct.price);

    const returnedProduct = await productRepository.getById(addedProduct.id);
    expect(returnedProduct).toEqual(addedProduct);
  });

  test('New product should be deleted', async () => {
    const willBeDeletedTestProduct = new Product({
      name: chance.name(),
      description: chance.sentence(),
      images: [chance.url(), chance.url()],
      price: chance.natural()
    });
    const testProduct = new Product({
      name: chance.name(),
      description: chance.sentence(),
      images: [chance.url(), chance.url()],
      price: chance.natural()
    });

    const [willBeDeletedAddedTestProduct, addedTestProduct] = await Promise.all([productRepository.add(willBeDeletedTestProduct), productRepository.add(testProduct)]);

    expect(willBeDeletedAddedTestProduct).toBeDefined();
    expect(addedTestProduct).toBeDefined();

    const deletedProduct = await productRepository.delete(willBeDeletedAddedTestProduct);
    expect(deletedProduct).toEqual(willBeDeletedAddedTestProduct);

    const undefinedProduct = await productRepository.getById(deletedProduct.id);
    expect(undefinedProduct).toBeUndefined();

    const definedProduct = await productRepository.getById(addedTestProduct.id);
    expect(definedProduct).toBeDefined();
  });

  test('New product should be updated', async () => {
    const testProduct = new Product({
      name: chance.name(),
      description: chance.sentence(),
      images: [chance.url(), chance.url()],
      price: chance.natural()
    });

    const addedProduct = await productRepository.add(testProduct);
    expect(addedProduct).toBeDefined();

    const clonedProduct = cloneDeep({...addedProduct, name: chance.name(), description: chance.sentence()});

    const updatedProduct = await productRepository.update(clonedProduct);
    expect(updatedProduct).toEqual(clonedProduct);
  });
})