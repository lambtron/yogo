'use strict';

(function() {
	// Page specific JS here.
  function initialize(position) {
    var mapOptions = {
      center: new google.maps.LatLng(position.coords.latitude,
        position.coords.longitude),
      zoom: 13
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);

    console.log(map);
    // Add your location.
    // var you = new google.maps.Marker({
    //   position: new google.maps.LatLng(position.coords.latitude,
    //     position.coords.longitude),
    //   map: map,
    //   title: 'You',
    //   animation: google.maps.Animation.DROP
    //   // icon: '/public/img/currentlocation.png'
    // });
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(initialize);
    } else {
      var x = document.getElementById("map-canvas");
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  google.maps.event.addDomListener(window, 'load', getLocation);
}());