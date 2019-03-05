const Person = require('../orm/Person');

module.exports = {
    async getStudentsFromParent(parentId, res) {
        let persons = await Person.findAll({
            include: [{
                model: Person,
                as: 'student',
                through: {
                    where: {
                        parent_id: parentId
                    }
                }
            }]
        });

        let students = persons.map((p) => p.student).filter((i) => i.length > 0)[0];

        res.send(students);
    },
    async getAllParents(res) {
        let parents = await Person.findAll();

        res.send(parents);
    }
};
