'use strict';

(function () {

  var request = require('request');
  var path = 'http://yofor.me/';

  module.exports = {
    yo: function yo (target, message) {
      // /{target}/{message}
      request.post(path + encodeURIComponent(target) + '/'
        + encodeURIComponent(message));
    }
  };
}());