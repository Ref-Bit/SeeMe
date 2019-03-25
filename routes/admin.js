var express = require('express');
var router = express.Router();

/* GET Add Project Page */
router.get('/add', function(req, res, next) {
  res.render('admin/add');
});

router.post('/add', function(req, res, next) {
});

module.exports = router;
