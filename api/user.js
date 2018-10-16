const Authentication = require('../orm/Authentication');
const OrganizationPersonRole = require('../orm/OrganizationPersonRole');
const Person = require('../orm/Person');

module.exports = {
    getPersonFromLoginIdentifier: (loginIdentifier, res) => {
        Authentication.find({ where: { loginIdentifier: loginIdentifier } }).then((authentication) => {
            OrganizationPersonRole.findById(authentication.organizationPersonRoleId).then((orgPersonRole) => {
                Person.findById(orgPersonRole.personId).then((person) => {
                    console.log(person);
                    res.send(person);
                });
            });
        });
    }
};
