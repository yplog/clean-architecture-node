const { v4: uuidv4 } = require('uuid');
const Chance = require('chance');
const { cloneDeep } = require('lodash');
const {
  order: {
    addOrderUseCase,
    getOrderByIdUseCase,
    updateOrderUseCase,
    deleteOrderUseCase
  }
} = require('../../../src/useCases');

const chance = new Chance();

describe('Order use cases', () => {

  const testOrder = {
    userId: uuidv4(),
    productIds: [uuidv4(), uuidv4()],
    date: chance.date(),
    isPayed: false
  };

  const mockOrderRepository = {
    add: jest.fn( async (order) => ({
      ...order,
      id: uuidv4()
    })),
    getById: jest.fn(async (id) => ({
      id,
      userId: uuidv4(),
      productIds: [uuidv4(), uuidv4()],
      date: chance.date(),
      isPayed: false
    })),
    update: jest.fn(async (order) => order),
    delete: jest.fn(async (order) => order)
  };
  const dependencies = { orderRepository: mockOrderRepository };

  describe('Add order use case', () => {
    test('Order should be added', async () => {
      const addedOrder = await addOrderUseCase(dependencies).execute(testOrder);
      expect(addedOrder).toBeDefined();
      expect(addedOrder.id).toBeDefined();
      expect(addedOrder.userId).toBe(testOrder.userId);
      expect(addedOrder.productIds).toEqual(testOrder.productIds);
      expect(addedOrder.date).toEqual(testOrder.date);
      expect(addedOrder.isPayed).toBe(testOrder.isPayed);

      const expectedOrder = mockOrderRepository.add.mock.calls[0][0];
      expect(expectedOrder).toEqual(testOrder);
    });
  });

  describe('Get by id order use case', () => {
    test('Order should be returned by id', async () => {
      const fakeId = uuidv4();

      const returnedOrder = await getOrderByIdUseCase(dependencies).execute({id: fakeId});
      expect(returnedOrder).toBeDefined();
      expect(returnedOrder.userId).toBeDefined();
      expect(returnedOrder.productIds).toBeDefined();
      expect(returnedOrder.date).toBeDefined();
      expect(returnedOrder.isPayed).toBeDefined();

      const expectedId = mockOrderRepository.getById.mock.calls[0][0];
      expect(expectedId).toBe(fakeId);
    });
  });

  describe('Update order use case',  () => {
    test('Order should be updated', async () => {
      const mockOrder = { ...testOrder, id: uuidv4() };
      const updatedOrder = await updateOrderUseCase(dependencies).execute({
        order: cloneDeep(mockOrder)
      });
      expect(updatedOrder).toEqual(mockOrder);

      const expectedOrder = mockOrderRepository.update.mock.calls[0][0];
      expect(expectedOrder).toEqual(mockOrder);
    });
  });

  describe('Delete order use case', () => {
    test('Order should be deleted', async () => {
      const mockOrder = {
        ...testOrder,
        id: uuidv4()
      };

      const deletedOrder = await deleteOrderUseCase(dependencies).execute({
        order: cloneDeep(mockOrder)
      });
      expect(deletedOrder).toEqual(mockOrder);

      const expectedOrder = mockOrderRepository.delete.mock.calls[0][0];
      expect(expectedOrder).toEqual(mockOrder);
    });
  });
})