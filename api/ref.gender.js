const RefGender = require('../orm/RefGender');

module.exports = {
    getGenders(res) {
        RefGender.findAll({
            attributes: ['id', 'description', 'sortOrder']
        }).then((gender) => {
            res.send(gender);
        });
    }
};
