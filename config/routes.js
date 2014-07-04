'use strict';

(function() {

  /**
   * Import helpers ============================================================
   */
  var Yo = require('../app/helpers/yo');
  var Go = require('../app/models/goes');

  // Static variables.
  var RADIUS = 100;

  // Public functions. =========================================================
  module.exports = function (app) {

    // API routes ==============================================================
    app.get('/retrieveyogos', function (req, res) {
      // req.body
      // location: lat: lng:,
      // yo_name: ''
      var lat = req.query.lat;
      var lng = req.query.lng;
      var location = {
        lat: lat,
        lng: lng
      };
      // var latMin = req.query.lat - RADIUS;
      // var latMax = req.query.lag + RADIUS;
      // var lngMin = req.query.lng - RADIUS;
      // var lngMax = req.query.lng + RADIUS;
      var target = req.query.yo_name;

      // Retrieve from Mongo that is close to lat and lng.
      var point = {
        type: "Point",
        coordinates: [req.query.lat, req.query.lng]
      };

      Go.create.find({})
      // .where('lat').gt(latMin).lt(latMax)
      // .where('lng').gt(lngMin).lt(lngMax)
      .exec(function (err, data) {
        if (getDistanceFromLatLonInKm(this.lat, this.lng, data.lat, data.lng)
          < 100) {
          console.log('hi');
          for (var i = 0; i < data.length; i++) {
            (function (target, message) {
              // Send Yos.
              Yo.yo(target, message);
            })(target, data[i].message);
          }
        };
      }.bind(location));

      function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1);
        var a =
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c; // Distance in km
        console.log('hi');
        return d;
      }

      function deg2rad(deg) {
        return deg * (Math.PI/180)
      }

    });

    app.post('/leaveyogos', function (req, res) {
      // location: lat: lng:,
      // message: ''

      // Send to Mongo.
      Go.create.create({
        message: req.query.message,
        lat: req.query.lat,
        lng: req.query.lng
      }, function(err, goes) {
        console.log('successfully created a new Go');

        if (err)
          res.send(err, 400);
        else
          res.send('Success', 200);
      });
    });

  	// Application routes ======================================================
  	app.get('/', function (req, res) {
      res.sendfile('index.html', {'root': './public/views/'});
    });
  };

}());