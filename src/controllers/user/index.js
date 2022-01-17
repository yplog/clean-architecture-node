const addUserController = require('./addUser.controller');
const deleteUserController = require('./deleteUser.controller');
const updateUserController = require('./updateUser.controller');
const getUserByIdController = require('./getUserById.controller');

module.exports = (dependencies) => {
  return {
    addUserController: addUserController(dependencies),
    deleteUserController: deleteUserController(dependencies),
    updateUserController: updateUserController(dependencies),
    getUserByIdController: getUserByIdController(dependencies)
  }
}