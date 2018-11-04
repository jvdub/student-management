const OrganizationPersonRole = require('../orm/OrganizationPersonRole');
const Person = require('../orm/Person');
const Role = require('../orm/Role');

module.exports = {
    async getAllStudents(res) {
        let studentRole = await Role.find({
            where: {
                name: 'Student'
            }
        });

        let studentsOrgRole = await OrganizationPersonRole.findAll({
            where: {
                roleId: studentRole.get('id')
            }
        });

        let students = [];

        for (let sor of studentsOrgRole) {
            let s = await Person.findById(sor.personId);
            students.push(s);
        }

        res.send(students);
    }
};
