const personOrm = require('../orm/Person');

module.exports = {
    logIn: () => {
        return personOrm.findById(1);
    }
};