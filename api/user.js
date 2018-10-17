const Authentication = require('../orm/Authentication');
const OrganizationPersonRole = require('../orm/OrganizationPersonRole');
const Person = require('../orm/Person');
const Role = require('../orm/Role');
const okta = require('../okta');

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
    },
    createNewUser: (req, res) => {
        Authentication.find({ where: { loginIdentifier: req.jwt.claims.sub } }).then((authentication) => {
            OrganizationPersonRole.findById(authentication.organizationPersonRoleId).then((orgPersonRole) => {
                if (orgPersonRole.roleId === 1) {
                    const client = okta.getClient();

                    client.createUser(req.body).then((user) => {
                        console.log(user);
                        res.send(user);
                        res.status(201).end();
                    });
                    // console.log(req.body);
                    //
                    // res.sendStaus(201);
                } else {
                    res.sendStaus(403);
                }
            });
        });
    }
};
