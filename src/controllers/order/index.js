const addOrderController = require('./addOrder.controller');
const updateOrderController = require('./updateOrder.controller');
const deleteOrderController = require('./deleteOrder.controller');
const getOrderByIdController = require('./getOrderById.controller');

module.exports = (dependencies) => {
  return {
    addOrderController: addOrderController(dependencies),
    updateOrderController: updateOrderController(dependencies),
    deleteOrderController: deleteOrderController(dependencies),
    getOrderByIdController: getOrderByIdController(dependencies)
  }
}