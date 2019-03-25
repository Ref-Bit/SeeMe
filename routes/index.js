var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'See Me - Home Page',
    name: 'Refaat Bitar'
  });
});

module.exports = router;
