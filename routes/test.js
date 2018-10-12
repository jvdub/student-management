const express = require('express');
let router = express.Router();

router.get('/api/test', function(req, res, next) {
    console.log('got to test!');
    console.log(req);
    res.send([ 'Testing 123!' ]);
});

module.exports = router;
