const State = require('../orm/State');

module.exports = {
    getStates(res) {
        State.findAll({
            attributes: ['id', 'description', 'sortOrder']
        }).then((states) => {
            res.send(states);
        });
    }
};
