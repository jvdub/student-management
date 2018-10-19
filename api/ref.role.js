const Role = require('../orm/Role');

module.exports = {
    getRoles(res) {
        Role.findAll({
            attributes: ['id', 'name']
        }).then((roles) => {
            res.send(roles);
        });
    }
};
