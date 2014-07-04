'use strict';

(function() {

  /**
   * Import helpers ============================================================
   */
  var Yo = require('../app/helpers/yo');
  var Go = require('../app/models/go');

  // Static variables.
  var RADIUS = 1;

  // Public functions. =========================================================
  module.exports = function (app) {

    // API routes ==============================================================
    app.get('/retrieveyogos', function (req, res) {
      // req.body
      // location: lat: lng:,
      // yo_name: ''
      var lat = req.body.location.lat;
      var lng = req.body.location.lng;
      var target = req.body.yo_name;

      // Retrieve from Mongo that is close to lat and lng.
      Go.find({})
      .where('lat').gt(lat - RADIUS).lt(lat + RADIUS)
      .where('lng').gt(lng - RADIUS).lt(lng + RADIUS)
      .exec(function (err, goes) {
        for (var i = 0; i < goes.length; i++) {
          (function (target, message) {
            // Send Yos.
            Yo.yo(target, message);
          })(target, goes[i].message);
        }
      });
    });

    app.post('/leaveyogos', function (req, res) {
      // location: lat: lng:,
      // message: ''

      // Send to Mongo.
      Go.create({
        message: req.body.message,
        lat: req.body.location.lat,
        lng: req.body.location.lng
      }, function(err, goes) {
        console.log('successfully created a new Go');

        if (err)
          res.send(err, 400);
        else
          res.send("Success", 200);
      });
    });

  	// Application routes ======================================================
  	app.get('/', function (req, res) {
      res.sendfile('index.html', {'root': './public/views/'});
    });
  };

}());