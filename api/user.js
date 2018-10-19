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
        const reqLoginId = req.jwt.claims.sub;
        const requestBody = req.body;

        Authentication.find({ where: { loginIdentifier: reqLoginId } }).then((authentication) => {
            OrganizationPersonRole.findById(authentication.organizationPersonRoleId).then((orgPersonRole) => {
                if (orgPersonRole.roleId === 1) {
                    Authentication.find({ where: { loginIdentifier: requestBody.email } }).then((auth) => {
                        if (!auth) {
                            Person.create({
                                firstName: requestBody.firstName,
                                middleName: requestBody.middleName,
                                lastName: requestBody.lastName,
                                birthdate: requestBody.birthdate,
                                stateOfResidence: requestBody.state
                            }).then((person) => {
                                OrganizationPersonRole.create({
                                    organizationId: 1,
                                    personId: person.id,
                                    roleId: requestBody.role,
                                    entryDate: new Date()
                                }).then((orgPersonRole) => {
                                    Authentication.create({
                                        organizationPersonRoleId: orgPersonRole.id,
                                        identityProviderName: 'Okta',
                                        identityProviderUri: 'https://dev-512457.oktapreview.com/oauth2/default',
                                        loginIdentifier: requestBody.email,
                                        startDate: new Date(),
                                        endDate: new Date('2222/12/31')
                                    }).then((newAuthorization) => {
                                        const client = okta.getClient();

                                        client.createUser({
                                            email: requestBody.email,
                                            firstName: requestBody.firstName,
                                            lastName: requestBody.lastName,
                                            login: requestBody.email
                                        }).then((user) => {
                                            console.log(user);
                                            res.send(user);
                                            res.status(201).end();
                                        });
                                    });
                                });
                            })
                        } else {
                            res.sendStatus(409);
                        }
                    });
                } else {
                    res.sendStaus(403);
                }
            });
        });
    }
};
