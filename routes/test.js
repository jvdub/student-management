const express = require('express');
let router = express.Router();

router.get('/api/test', function(req, res, next) {
    res.send([ 'Testing 123!' ]);
});

module.exports = router;
