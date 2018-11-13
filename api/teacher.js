const OrganizationPersonRole = require('../orm/OrganizationPersonRole');
const Person = require('../orm/Person');
const Role = require('../orm/Role');

module.exports = {
    async getAllTeachers(res) {
        let teacherRole = await Role.find({
            where: {
                name: 'Teacher'
            }
        });

        let teacherOrgRole = await OrganizationPersonRole.findAll({
            where: {
                roleId: teacherRole.get('id')
            }
        });

        let teachers = [];

        for (let tor of teacherOrgRole) {
            let t = await Person.findById(tor.personId);
            teachers.push(t);
        }

        res.send(teachers);
    }
};
