const mongoose = require('mongoose');

const entityName = 'Order';

const {
  schemas: {
    order: orderSchema
  }
} = require('../../database/mongo');

const repository = () => {
  const Order = mongoose.model(entityName, orderSchema);

  return {
    add: async (order) => {
      const mongoObject = new Order(order);

      return mongoObject.save().lean();
    },
    update: async (order) => {
      const { id } = order;
      delete order.id;

      return Order.findByIdAndUpdate(id, {
        ...order,
        updatedAt: new Date,
      }, { new: true }).lean();
    },
    delete: async (order) => {
      const { id } = order;
      delete order.id;

      return Order.findByIdAndUpdate(id, {
        deletedAt: new Date,
      }, { new: true }).lean();
    },
    getById: async (id) => {
      return Order.findOne({
        _id: id,
        deletedAt: {
          $exists: false
        }
      });
    }
  }
}

module.exports = repository();