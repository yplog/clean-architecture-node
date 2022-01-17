const express = require('express');

const { userController } = require('../../../controllers');

module.exports = (dependencies) => {
  const router = express.Router();

  const {
    addUserController,
    getUserByIdController,
    updateUserController,
    deleteUserController
  } = userController(dependencies);

  router.route('/').post(addUserController).delete(deleteUserController).put(updateUserController);
  router.route('/:id').get(getUserByIdController);

  return router;
}