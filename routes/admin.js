var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './public/img/portfolio'});
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'seeme'
});
connection.connect();

/* GET Add Project Page */
router.get('/add', function(req, res, next) {
  res.render('admin/add');
});

router.post('/add', upload.single('image'), function(req, res, next) {
  //Get Form Values
  var title = req.body.title;
  var description = req.body.description;
  var service = req.body.service;
  var url = req.body.url;
  var client = req.body.client;
  var date = req.body.date;

  //Check Image Upload
  if (req.file){
    var image = req.file.filename;
  }else{
    var image = 'https://via.placeholder.com/900x650';
  }

  //Form Fields Validation
  req.checkBody('title', 'Title field is required').notEmpty();
  req.checkBody('service', 'Service field is required').notEmpty();
  req.checkBody('client', 'Client field is required').notEmpty();
  req.checkBody('url', 'URL field is required').notEmpty();
  req.checkBody('description', 'Description field is required').notEmpty();

  var errors = req.validationErrors();

  //Refill The Correct Fields After Validation
  if(errors){
    res.render('admin/add', {
      errors: errors,
      title: title,
      description: description,
      service: service,
      client: client,
      url: url
    });
  }else{
    var project = {
      title: title,
      description: description,
      service: service,
      client: client,
      date: date,
      url: url,
      image: image
    };
  }

  var query = connection.query("INSERT INTO projects SET ?", project, function (err, result) {
    //Project Inserted
    console.log('Error' + err);
    console.log('Success' + result);
  });
  req.flash('success', 'Project Added!');
  res.redirect('/');
});

module.exports = router;
