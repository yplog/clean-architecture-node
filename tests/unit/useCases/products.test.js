const Chance = require('chance');
const { v4: uuidv4 } = require('uuid');
const { Product } = require('../../../src/entities');
const {
  product: {
    addProductUseCase,
    getProductByIdUseCase,
    updateProductUseCase
  }
} = require('../../../src/useCases');
const {deleteProductUseCase} = require("../../../src/useCases/products");

const chance = new Chance();
const { cloneDeep } = require('lodash');

describe('Products use cases', () => {

  const testProduct = new Product({
    name: chance.name(),
    description: chance.sentence(),
    images: [uuidv4(), uuidv4()],
    price: chance.natural()
  });

  const mockProductRepo = {
    add: jest.fn(async (product) => ({
      ...product,
      id: uuidv4()
    })),
    getById: jest.fn( async (id) => ({
      id,
      name: chance.name(),
      description: chance.sentence(),
      images: [uuidv4(), uuidv4()],
      price: chance.natural()
    })),
    update: jest.fn(async (product) => product),
    delete: jest.fn(async (product) => product)
  }
  const dependencies = {
    productsRepository: mockProductRepo
  };

  describe('Add product use case', () => {
    test('New product should be added', async () => {
      const savedProduct = await addProductUseCase(dependencies).execute(testProduct);
      expect(savedProduct).toBeDefined();
      expect(savedProduct.id).toBeDefined();
      expect(savedProduct.name).toBe(testProduct.name);
      expect(savedProduct.description).toBe(testProduct.description);
      expect(savedProduct.images).toEqual(testProduct.images);
      expect(savedProduct.price).toBe(testProduct.price);

      const expectedProductData = mockProductRepo.add.mock.calls[0][0];
      expect(expectedProductData).toEqual(testProduct);
    });
  });

  describe('Get product by id use case', () => {
    test('Product should be returned', async () => {
      const fakeId = uuidv4();
      const returnedProduct = await getProductByIdUseCase(dependencies).execute({id: fakeId});
      expect(returnedProduct).toBeDefined();
      expect(returnedProduct.id).toBeDefined();
      expect(returnedProduct.name).toBeDefined();
      expect(returnedProduct.description).toBeDefined();
      expect(returnedProduct.images).toBeDefined();
      expect(returnedProduct.price).toBeDefined();

      const expectedId = mockProductRepo.getById.mock.calls[0][0];
      expect(expectedId).toBe(fakeId)
    });
  });

  describe('Update product use case', () => {
    test('Product should be updated', async () => {
      const mockProduct = {
        ...testProduct,
        id: uuidv4()
      };

      const updatedProduct = await updateProductUseCase(dependencies).execute({ product: cloneDeep(mockProduct) });
      expect(updatedProduct).toEqual(mockProduct);

      const expectedProduct = mockProductRepo.update.mock.calls[0][0];
      expect(expectedProduct).toEqual(mockProduct);

    });
  });

  describe('Delete product use case', () => {
    test('Product should be deleted', async () => {
      const mockProduct = {
        ...testProduct,
        id: uuidv4()
      };

      const deletedProduct = await deleteProductUseCase(dependencies).execute({ product: cloneDeep(mockProduct) });
      expect(deletedProduct).toEqual(mockProduct);

      const expectedProduct = mockProductRepo.delete.mock.calls[0][0];
      expect(expectedProduct).toEqual(mockProduct);
    });
  });
});