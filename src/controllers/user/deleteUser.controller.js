const { Response } = require('../../frameworks/common')

module.exports = (dependencies) => {

  const {
    useCases: {
      user: {
        deleteUserUseCase
      }
    }
  } = dependencies;

  return async (req, res, next) => {
    try {
      const { body = {} } = req;

      const { id, username, gender } = body;

      const deleteUser = deleteUserUseCase(dependencies);
      const response = await deleteUser.execute({
        user: {
          id, username, gender
        }
      });

      res.json(new Response({ status: true, content: response }));

      next();
    } catch (e) {
      next(e);
    }
  }
}