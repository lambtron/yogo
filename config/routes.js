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
      var load = req.query;
      Go.create.find({ loc:
        {'$near' : [ parseInt(load.lng), parseInt(load.lat) ],
        $maxDistance : 5/111.2 }
      }, function (err, data) {
        if (err)
          res.send(err, 400);

        for (var i = 0; i < data.length; i++) {
          (function (message) {
            Yo.yo(load.yo_name, message);
          }(data[i].message));
        }
      });
    });

    app.post('/leaveyogos', function (req, res) {
      var load = {
        message: req.body.message,
        loc: [ parseInt(req.body.lng), parseInt(req.body.lat) ]
      };

      // Send to Mongo.
      Go.create.create(load, function(err, goes) {
        console.log('successfully created a new Go');
        console.log(goes);

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