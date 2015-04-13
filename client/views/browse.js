Template.Browse.rendered = function() {
    //Start datepicker and move it to the body so it isnt blocked by "overflow: hidden"
    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 5
    });
    jQuery("#start_root").detach().appendTo('body');
    jQuery("#end_root").detach().appendTo('body');

    // Create a map in the "map" div, set the view to a given place and zoom
    // Tie map to location input
    var mapOptions = {
        /*center: new google.maps.LatLng(33.962409 , 117.423066),*/
        minZoom: 12,
        maxZoom: 18,
        panControl: false,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: true,
        overviewMapControl: false,
        rotateControl: false

    };
    $("#location").geocomplete({
            map: "#map",
            mapOptions: mapOptions,
            maxZoom: 14,
            markerOptions: {
                disabled: true
            }
        })
        .bind("geocode:result", function(event, result) {
            console.log(result);
        });

    //Set map center to current position
    var map = $("#location").geocomplete('map');
    navigator.geolocation.getCurrentPosition(function(position) {
        var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        map.setCenter(pos);
    });
    //Update map bounds on zoom or move
    google.maps.event.addListener(map, 'idle', function() {
        var bounds = map.getBounds();
        if (bounds) {
            var ne = bounds.getNorthEast();
            var sw = bounds.getSouthWest();
            Session.set('topRight', [ne.lng(), ne.lat()]);
            Session.set('bottomLeft', [sw.lng(), sw.lat()]);

        }
    });
    //Should change to autosubscribe but autorun works as well. Updates subscription 
    Tracker.autorun(function() {
        Meteor.subscribe('nearbyListings', Session.get('bottomLeft'), Session.get('topRight'));
    });
    //The Listings collection is bassed of off the subscription from above 
    //It only contains part of the collection of the same name on the server
    //This is slightly confusing but it works
    //data will latter be used for filtering
    var data = Listings.find();
    //Updates markers when data changes
    //Does not remove markers (only adds them). Will change latter.
    Tracker.autorun(function() {
        console.log(data.fetch())
        data.forEach(function(place) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(place.lat, place.lng),
                map: map
            });
        });
    });
};