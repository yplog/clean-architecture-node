const { User } = require('../../entities');

module.exports = (dependencies) => {
  const { userRepository } = dependencies;
  if (!userRepository) {
    throw new Error('The users repository should be exist in dependencies');
  }

  const execute = ({ username, gender }) => {
    const user = new User({ username, gender });

    return userRepository.add(user);
  }

  return {
    execute
  }
}