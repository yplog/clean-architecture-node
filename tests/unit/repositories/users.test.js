const Chance = require('chance');
const { cloneDeep } = require('lodash');
const { userRepository } = require('../../../src/frameworks/repositories/inMemory');
const { User, constants: { userConstants: { genders } } } = require('../../../src/entities');

const chance = new Chance();

describe('Users repository', values => {
    test('New user should be added and returned', async () => {
        const testUser = new User({ username: chance.name(), gender: genders.FEMALE });

        const addedUser = await userRepository.add(testUser);

        expect(addedUser).toBeDefined();
        expect(addedUser.id).toBeDefined();
        expect(addedUser.username).toBe(testUser.username);
        expect(addedUser.gender).toBe(testUser.gender);

        const returnedUser = await userRepository.getById(addedUser.id);
        expect(returnedUser).toEqual(addedUser);
    });

    test('New user should be deleted', async () => {
        const willBeDeletedTestUser = new User({ username: chance.name(), gender: genders.FEMALE });
        const testUser = new User({ username: chance.name(), gender: genders.FEMALE });

        const [ willBeDeletedAddedTestUser, addedTestUser ] = await Promise.all([userRepository.add(willBeDeletedTestUser), userRepository.add(testUser)]);

        expect(willBeDeletedTestUser).toBeDefined();
        expect(testUser).toBeDefined();

        const deletedUser = await userRepository.delete(willBeDeletedAddedTestUser);
        expect(deletedUser).toEqual(willBeDeletedAddedTestUser);

        const undefinedUser = await userRepository.getById(deletedUser.id);
        expect(undefinedUser).toBeUndefined();

        const definedUser = await userRepository.getById(addedTestUser.id);
        expect(definedUser).toBeDefined();
    });

    test('New user should be updated', async () => {
        const testUser = new User({ username: chance.name(), gender: genders.FEMALE });

        const addedUser = await userRepository.add(testUser);
        expect(addedUser).toBeDefined();

        const clonedUser = cloneDeep({...addedUser, username: chance.name(), gender: genders.NOT_SPECIFIED });

        const updatedUser = await userRepository.update(clonedUser);
        expect(updatedUser).toEqual(clonedUser);
    });
});