var express = require('express');
var router = express.Router();
var smController = require('../controllers/sm_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/shows', smController.show);
router.get('/movies', smController.movie);
router.get('/movies/:id', smController.moviedet);

module.exports = router;
