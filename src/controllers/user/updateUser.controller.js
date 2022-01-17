const { Response } = require('../../frameworks/common')

module.exports = (dependencies) => {

  const {
    useCases: {
      user: {
        updateUserUseCase
      }
    }
  } = dependencies;

  return async (req, res, next) => {
    try {
      const { body = {} } = req;

      const { id, username, gender } = body;

      const updateUser = updateUserUseCase(dependencies);
      const response = await updateUser.execute({
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