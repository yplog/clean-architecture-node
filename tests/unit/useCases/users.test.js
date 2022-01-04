const Chance = require('chance');
const { v4: uuidv4 } = require('uuid');
const { user: { addUserUseCase } } = require('../../../src/useCases');

const { User, constants: { userConstants: { genders } } } = require('../../../src/entities');

const chance = new Chance();

describe('User use cases', () => {

  const mockUserRepo = {
    add: jest.fn(async (user) => ({
      ...user,
      id: uuidv4()
    }))
  }

  const dependencies = {
    userRepository: mockUserRepo
  }

  describe('Add user use case', () => {

    test('User should be added', async () => {
      const testUserData = {
        username: chance.name(),
        gender: genders.NOT_SPECIFIED
      }

      const addedUser = await addUserUseCase(dependencies).execute(testUserData);
      expect(addedUser).toBeDefined();
      expect(addedUser.id).toBeDefined();
      expect(addedUser.gender).toBe(testUserData.gender);

      const call = mockUserRepo.add.mock.calls[0][0];
      expect(call.id).toBeUndefined();
      expect(call.username).toBe(testUserData.username);
      expect(call.gender).toBe(testUserData.gender);
    })

  })
})