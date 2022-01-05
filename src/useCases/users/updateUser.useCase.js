module.exports = (dependencies) => {
  const { userRepository } = dependencies;
  if (!userRepository) {
    throw new Error('The users repository should be exist in dependencies');
  }

  const execute = ({ user = {} }) => {
    return userRepository.update(user);
  }

  return {
    execute
  }
}