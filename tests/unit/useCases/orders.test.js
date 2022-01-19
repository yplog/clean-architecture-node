const Chance = require('chance');

const {
  orderRepository,
} = require('../../../src/frameworks/repositories/inMemory');

const {
  Order
} = require('../../../src/entities');

const chance = new Chance();

const {
  cloneDeep
} = require('lodash');

const {
  v4: uuidv4
} = require('uuid');

describe('Orders repository', () => {
  test('New Order should be added and returned', async () => {
    const testOrder = new Order({
      userId: uuidv4(),
      productIds: [uuidv4(), uuidv4()],
      date: chance.date(),
      isPayed: true,
      meta: {
        comment: 'Deliver it to me as soon as possible'
      }
    })

    const addedOrder = await orderRepository.add(testOrder);
    expect(addedOrder).toBeDefined();
    expect(addedOrder.id).toBeDefined();
    expect(addedOrder.userId).toBe(testOrder.userId);
    expect(addedOrder.productIds).toEqual(testOrder.productIds);
    expect(addedOrder.date).toEqual(testOrder.date);
    expect(addedOrder.isPayed).toBe(testOrder.isPayed);
    expect(addedOrder.meta).toEqual(testOrder.meta);

    const returnedOrder = await orderRepository.getById(addedOrder.id);
    expect(returnedOrder).toEqual(addedOrder);
  })
  test('New Order should be deleted', async () => {
    const willBeDeletedOrder = new Order({
      userId: uuidv4(),
      productIds: [uuidv4(), uuidv4()],
      date: chance.date(),
      isPayed: true,
      meta: {
        comment: 'Deliver it to me as soon as possible'
      }
    })

    const shouldStayOrder = new Order({
      userId: uuidv4(),
      productIds: [uuidv4(), uuidv4()],
      date: chance.date(),
      isPayed: true,
      meta: {
        comment: 'Deliver it to me as soon as possible'
      }
    })

    const [willBeDeletedAddedOrder, shouldStayAddedOrder] = await Promise.all([orderRepository.add(willBeDeletedOrder), orderRepository.add(shouldStayOrder)])
    expect(willBeDeletedAddedOrder).toBeDefined();
    expect(shouldStayAddedOrder).toBeDefined();

    const deletedOrder = await orderRepository.delete(willBeDeletedAddedOrder);
    expect(deletedOrder).toEqual(willBeDeletedAddedOrder);

    const shouldBeDeletedOrder = await orderRepository.getById(deletedOrder.id);
    expect(shouldBeDeletedOrder).toBeUndefined()

    const shouldBeDefinedOrder = await orderRepository.getById(shouldStayAddedOrder.id);
    expect(shouldBeDefinedOrder).toBeDefined()
  })
  test('New Order should be updated', async () => {
    const testOrder = new Order({
      userId: uuidv4(),
      productIds: [uuidv4(), uuidv4()],
      date: chance.date(),
      isPayed: true,
      meta: {
        comment: 'Deliver it to me as soon as possible'
      }
    })

    const addedOrder = await orderRepository.add(testOrder);
    expect(addedOrder).toBeDefined();

    const clonedOrder = cloneDeep({
      ...addedOrder,
      isPayed: false,
      productIds: [...testOrder.productIds, uuidv4()],
    })

    const updatedOrder = await orderRepository.update(clonedOrder);
    expect(updatedOrder).toEqual(clonedOrder);
  })

});