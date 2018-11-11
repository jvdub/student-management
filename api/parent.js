const Authentication = require('../orm/Authentication');
const OrganizationPersonRole = require('../orm/OrganizationPersonRole');
const Person = require('../orm/Person');
const Role = require('../orm/Role');

module.exports = {
    async getStudentsFromParent(parentId, res) {
        let persons = await Person.findAll();
        res.send(persons);
    }
};
