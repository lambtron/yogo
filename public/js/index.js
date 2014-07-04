'use strict';

(function() {
  $(document).ready( function () {
    var lat
      , lng;

    $('#yo-name-input-button').on('click', function (event) {
      var load = {
        lat: lat,
        lng: lng,
        yo_name: $('#yo-name-input').val()
      };

      $.ajax({
        dataType: 'json',
        url: '/retrieveyogos',
        data: load,
        success: function (data) {
          console.log(data);
        }
      });
    });

    $('#message-input-button').on('click', function () {
      //
      var load = {
        message: $('#message-input').val(),
        lat: lat,
        lng: lng
      };

      $.post('/leaveyogos', load, function (data) {
        console.log(data);
      });
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

  getLocation;
}());