var http = require('http');

// Función necesaria para recuperar JSON 
function get_json(url, callback) {
  http.get(url, function(res) {
    var body = '';
    res.on('data', function(chunk) {
      body += chunk;
    });
    res.on('end', function() {
      var response = JSON.parse(body);
      callback(response);
    });
  });
}

// GET /shows coincidentes con la palabra introducida
exports.show = function(req, res, next) {
  if (req.query.q !== undefined) {
    var q = "%" + req.query.q.replace(/\s/g, "%") + "%";
    var l = "http://api.tvmaze.com/search/shows?q=" + req.query.q.replace(/\s/g, "%");
    
    var mydata = get_json(l, function (datos) {
      res.render('vshows', {datos: datos});
    });
  }
};

// GET /movies coincidentes con la palabra introducida
exports.movie = function(req, res, next) {
  if (req.query.q !== undefined) {
    var q = "%" + req.query.q.replace(/\s/g, "%") + "%";
    var l = "http://www.omdbapi.com/?s=" + req.query.q.replace(/\s/g, "%") + "&type=movie&r=json";
    
    var mydata = get_json(l, function (datos) { 
      res.render("vmovies", {datos: datos});
    });
  }
};

// GET /movies/tt0123456 coincidente con dicho ID de imdb
exports.moviedet = function(req, res, next) {
  var l1 = "http://www.omdbapi.com/?i="; 
  var l2 = "&type=movie&plot=full&r=json";
  var l = l1 + req.params.id + l2;
  
  var mydata = get_json(l, function (datos) { 
    console.log(datos);
    res.render("mdet", {datos: datos});
  }); 
};
