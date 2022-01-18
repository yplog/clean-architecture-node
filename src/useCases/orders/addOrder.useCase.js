const {isEmpty} = require("lodash");
const { Order } = require('../../entities');

const { ResponseError, ValidationErrors } = require('../../frameworks/common');

module.exports = (dependencies) => {
  const {
    orderRepository,
    useCases: {
      user: {
        getUserByIdUseCase
      },
      product: {
        getProductByIdUseCase
      }
    }
  } = dependencies;

  if (!orderRepository) {
    throw new Error('orderRepository should be exist in dependencies!');
  }

  if (!getUserByIdUseCase) {
    throw new Error('getUserByIdUseCase should be exist in dependencies!');
  }

  if (!getProductByIdUseCase) {
    throw new Error('getProductByIdUseCase should be exist in dependencies!');
  }

  const getUserById = getUserByIdUseCase(dependencies).execute;
  const getProductById = getProductByIdUseCase(dependencies).execute;

  const getValidationErrors = async ({ order }) => {
    const returnable = [];
    const { productIds = [], userId } = order;

    const products = await Promise.all(productIds.map((id) => getProductById({id}) ));

    const notFoundIds = products.reduce((acc = [], product, i) => {
      if (!product) {
        acc.push(productIds[i]);
      }

      return acc;
    });

    if (!isEmpty(notFoundIds)) {
      returnable.push(new ValidationErrors({
        field: 'productIds',
        msg: `No products with ids ${notFoundIds.join(', ')}`
      }));
    }

    const user = await getUserById({ id: userId });

    if (!user) {
      returnable.push(new ValidationErrors({ field: 'userId', msg: `No user with id ${user}`}))
    }

    return returnable;
  }

  const execute = async ({ userId, productIds, date, isPayed }) => {
    const order = new Order({ userId, productIds, date, isPayed });

    const validationErrors = await getValidationErrors({ order });

    if (!isEmpty(validationErrors)) {
      return Promise.reject(new ResponseError({ status: 403, msg: 'Validation Errors', reason: 'Bad data', validationErrors }))
    }

    return orderRepository.add(order);
  };

  return {
    execute
  }
}