'use strict';

(function() {
  var lat
    , lng;

  $(document).ready( function () {
    $('#yo-name-input-button').on('click', function (event) {
      var load = {
        lat: lat,
        lng: lng,
        yo_name: $('#yo-name-input').val()
      };

      if (lat && lng) {
        $.get('/retrieveyogos', load, function (data) {
          console.log(data);
        });
      } else {
        alert('Make sure your geolocation is turned on.');
      }
    });

    $('#message-input-button').on('click', function () {
      var load = {
        lat: lat,
        lng: lng,
        message: $('#message-input').val()
      };

      if (lat && lng) {
        $.post('/leaveyogos', load, function (data) {
          console.log(data);
        });
      } else {
        alert('Make sure your geolocation is turned on.');
      }
    });
  });

	// Page specific JS here.
  function initialize(position) {
    lat = position.coords.latitude;
    lng = position.coords.longitude;
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(initialize);
    } else {
      var x = document.getElementById("map-canvas");
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  getLocation();
}());