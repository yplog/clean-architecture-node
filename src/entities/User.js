module.exports.User = class User {
    constructor({ id, username = null, gender = genders.NOT_SPECIFIED }) {
        this.id = id;
        this.username = username;
        this.gender = gender;
    }
}

const genders = {
    NOT_SPECIFIED: 0,
    FEMALE: 1,
    MALE: 2
};

module.exports.userConstants = {
    genders
}