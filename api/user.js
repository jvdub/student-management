const Authentication = require('../orm/Authentication');
const OrganizationPersonRole = require('../orm/OrganizationPersonRole');
const Person = require('../orm/Person');
const Role = require('../orm/Role');
const okta = require('../okta');

function cloneObject(obj) {
    let clone = {};

    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            if (obj[i] && typeof(obj[i]) === 'object') {
                clone[i] = cloneObject(obj[i]);
            } else {
                clone[i] = obj[i];
            }
        }
    }

    return clone;
}

module.exports = {
    async getAllUsers(res) {
        let persons = await Person.findAll();
        res.send(persons);
    },
    async getPersonFromLoginIdentifier(loginIdentifier, res) {
        let authentication = await Authentication.find({ where: { loginIdentifier: loginIdentifier } });
        let orgPersonRole = await OrganizationPersonRole.findById(authentication.organizationPersonRoleId);
        let person = await Person.findById(orgPersonRole.personId);
        let role = await Role.findById(orgPersonRole.roleId);

        res.send({
            role: role,
            person: person
        });
    },
    async createNewUser(req, res) {
        const reqLoginId = req.jwt.claims.sub;
        const requestBody = cloneObject(req.body);
        let orgPersonRole;

        try {
            let authentication = await Authentication.find({ where: { loginIdentifier: reqLoginId } });
            orgPersonRole = await OrganizationPersonRole.findById(authentication.get('organizationPersonRoleId'));
        } catch (e) {
            req.status(500).send(e).end();
        }

        if (+orgPersonRole.get('roleId') === 1) {
            let auth;

            try {
                auth = await Authentication.find({ where: { loginIdentifier: requestBody.email } });
            } catch (e) {
                req.status(500).send(e).end();
            }

            if (!auth) {
                const pData = cloneObject(requestBody);

                let person;

                try {
                    person = await Person.findOrCreate({
                        where: {
                            firstName: pData.firstName,
                            middleName: pData.middleName,
                            lastName: pData.lastName,
                            birthdate: pData.birthdate,
                            gender: pData.gender,
                            stateOfResidence: pData.state
                        }
                    });
                } catch (e) {
                    req.status(500).send(e).end();
                }

                let role;

                try {
                    role = await OrganizationPersonRole.findOrCreate({
                        where: {
                            organizationId: 1,
                            personId: person[ 0 ].get('id'),
                            roleId: pData.role,
                            entryDate: new Date()
                        }
                    });
                } catch (e) {
                    let result = await Person.destroy({ where: { id: person[0].get('id') } });
                    req.status(500).send(e).end();
                }


                let newAuth;

                try {
                    newAuth = await Authentication.findOrCreate({
                        where: {
                            organizationPersonRoleId: role[0].get('id'),
                            identityProviderName: 'Okta',
                            identityProviderUri: 'https://dev-512457.oktapreview.com/oauth2/default',
                            loginIdentifier: pData.email,
                            startDate: new Date(),
                            endDate: new Date('2222/12/31')
                        }
                    });
                } catch (e) {
                    let result = await Person.destroy({ where: { id: person[0].get('id') } });
                    result = await OrganizationPersonRole.destroy({ where: { id: role[0].get('id') } });
                    req.status(500).send(e).end();
                }

                const client = okta.getClient();

                client.createUser({
                    profile: {
                        email: pData.email,
                        firstName: pData.firstName,
                        lastName: pData.lastName,
                        login: pData.email
                    }
                }).then((user) => {
                    res.send(user);
                    res.status(201).end();
                }).catch(async (e) => {
                    let result = await Person.destroy({ where: { id: person[0].get('id') } });
                    result = await OrganizationPersonRole.destroy({ where: { id: role[0].get('id') } });
                    result = await Authentication.destroy({ where: { id: newAuth[0].get('id') } });
                    req.status(500).send(e).end();
                });
            } else {
                res.sendStatus(409);
            }
        } else {
            res.sendStaus(403);
        }
    }
};
