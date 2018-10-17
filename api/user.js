const Authentication = require('../orm/Authentication');
const OrganizationPersonRole = require('../orm/OrganizationPersonRole');
const Person = require('../orm/Person');
const Role = require('../orm/Role');

module.exports = {
    getPersonFromLoginIdentifier: (loginIdentifier, res) => {
        Authentication.find({ where: { loginIdentifier: loginIdentifier } }).then((authentication) => {
            OrganizationPersonRole.findById(authentication.organizationPersonRoleId).then((orgPersonRole) => {
                Person.findById(orgPersonRole.personId).then((person) => {
                    Role.findById(orgPersonRole.roleId).then((role) => {
                        res.send({
                            role: role,
                            person: person
                        });
                    });
                });
            });
        });
    }
};
