const express = require('express');
let router = express.Router();

router.get('/api/test', function(req, res, next) {
    console.log(req.user);
    res.send([ 'Testing 123!' ]);
});

module.exports = router;
