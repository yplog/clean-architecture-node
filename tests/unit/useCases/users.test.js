const Chance = require('chance');
const { v4: uuidv4 } = require('uuid');
const { user: { addUserUseCase, getUserByIdUseCase, updateUserUseCase, deleteUserUseCase } } = require('../../../src/useCases');

const { User, constants: { userConstants: { genders } } } = require('../../../src/entities');

const chance = new Chance();

describe('User use cases', () => {

  const mockUserRepo = {
    add: jest.fn(async (user) => ({
      ...user,
      id: uuidv4()
    })),
    getById: jest.fn(async (id) => ({
      id,
      username: chance.name(),
      gender: genders.NOT_SPECIFIED
    })),
    update: jest.fn(async (user) => user),
    delete: jest.fn(async (user) => user)
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

  describe('Get user use case', () => {
    test('User should be returned by id', async () => {
      const fakeId = uuidv4();
      const userById = await getUserByIdUseCase(dependencies).execute({ id: fakeId });

      expect(userById).toBeDefined();
      expect(userById.id).toBe(fakeId);
      expect(userById.username).toBeDefined();

      const expectedId = mockUserRepo.getById.mock.calls[0][0];
      expect(expectedId).toBe(fakeId);
    })
  })

  describe('Update user use case', () => {
    test('User should be updated', async () => {
      const testData = {
        id: uuidv4(),
        username: chance.name(),
        gender: genders.NOT_SPECIFIED
      };

      const updatedUser = await updateUserUseCase(dependencies).execute({user: testData});
      expect(updatedUser).toEqual(testData);

      const expectedUser = mockUserRepo.update.mock.calls[0][0];
      expect(expectedUser).toEqual(testData);
    })
  })

  describe('Delete user use case', () => {
    test('User should be deleted', async () => {
      const testData = {
        id: uuidv4(),
        username: chance.name(),
        gender: genders.NOT_SPECIFIED
      };

      const deletedUser = await deleteUserUseCase(dependencies).execute({ user: testData });
      expect(deletedUser).toEqual(testData);

      const expectedUser = mockUserRepo.delete.mock.calls[0][0];
      expect(expectedUser).toEqual(testData);
    })
  })
})