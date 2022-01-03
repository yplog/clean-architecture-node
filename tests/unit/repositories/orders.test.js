const Chance = require('chance');
const { v4: uuidv4 } = require('uuid');
const { cloneDeep } = require("lodash");
const { orderRepository, productRepository} = require('../../../src/frameworks/repositories/inMemory');
const { Order } = require('../../../src/entities');

const chance = new Chance();

describe('Order repository', () => {
  test('New Order should be added and return', async () => {
    const testOrder = new Order({ userId: uuidv4(), isPayed: true, productIds: [uuidv4(), uuidv4()], date: new Date() });

    const addedOrder = await orderRepository.add(testOrder);
    expect(addedOrder).toBeDefined();
    expect(addedOrder.id).toBeDefined();
    expect(addedOrder.userId).toBe(testOrder.userId);
    expect(addedOrder.productIds).toEqual(testOrder.productIds);
    expect(addedOrder.date).toEqual(testOrder.date);
    expect(addedOrder.isPayed).toBe(testOrder.isPayed);

    const returnedOrder = await orderRepository.getById(addedOrder.id);
    expect(returnedOrder).toEqual(addedOrder);
  });

  test('New Order should be deleted', async () => {
    const willBeDeletedTestOrder = new Order({ userId: uuidv4(), isPayed: true, productIds: [uuidv4(), uuidv4()], date: new Date() });
    const testOrder = new Order({ userId: uuidv4(), isPayed: true, productIds: [uuidv4(), uuidv4()], date: new Date() });

    const [ willBeDeletedAddedOrder, addedTestOrder ] = await Promise.all([orderRepository.add(willBeDeletedTestOrder), orderRepository.add(testOrder)]);
    expect(willBeDeletedAddedOrder).toBeDefined();
    expect(addedTestOrder).toBeDefined();

    const deletedOrder = await orderRepository.delete(willBeDeletedAddedOrder);
    expect(deletedOrder).toEqual(willBeDeletedAddedOrder);

    const undefinedOrder = await productRepository.getById(deletedOrder.id);
    expect(undefinedOrder).toBeUndefined();

    const definedOrder = await orderRepository.getById(addedTestOrder.id);
    expect(definedOrder).toBeDefined();
  });

  test('New Order should be updated', async () => {
    const testOrder = new Order({ userId: uuidv4(), isPayed: true, productIds: [uuidv4(), uuidv4()], date: new Date() });

    const addedOrder = await orderRepository.add(testOrder);
    expect(addedOrder).toBeDefined();

    const cloneOrder = cloneDeep({ ...addedOrder, isPayed: false, products: [ ...testOrder.productIds, uuidv4() ] });

    const updatedOrder = await orderRepository.update(cloneOrder);
    expect(updatedOrder).toEqual(cloneOrder);
  });

})