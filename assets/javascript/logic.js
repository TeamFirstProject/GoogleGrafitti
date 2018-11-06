var map;
var markers = [];

function initMap() {
    var haightAshbury = { lat: 37.769, lng: -122.446 };
    var goldenGatePark = { lat: 37.769, lng: -122.486 };
    var japaneseGarden = { lat: 37.770, lng: -122.470 };
    var pier39 = { lat: 37.808, lng: -122.409 };
    var salesForceTower = { lat: 37.789, lng: -122.396 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: haightAshbury,
        mapTypeId: 'terrain'
    });

    // This event listener will call addMarker() when the map is clicked.
    map.addListener('click', function(event) {
        addMarker(event.latLng);
    });

    // Adds a marker at the center of the map.
    //Markers will be render when load each chatroom.
    //addMarker(haightAshbury);
    //addMarker(goldenGatePark);
    //addMarker(japaneseGarden);
    //addMarker(pier39);
    //addMarker(salesForceTower);

}

// Adds a marker to the map and push to the array.
function addMarker(location) {
    var geocoder = new google.maps.Geocoder;
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    geocoder.geocode({'location': location},function(results,status){
        //
        if(status ==='OK'){
            var chatRoomName = results[0].formatted_address;
            var lat = results[0].geometry.location.lat();
            var lng = results[0].geometry.location.lng();
            createChatRoom(chatRoomName,lat,lng);
        }
    });

    markers.push(marker);
    

    marker.addListener("click", function() {
        changeChatRoom(this.position.lat(), this.position.lng());
    });
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
    setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = [];
}