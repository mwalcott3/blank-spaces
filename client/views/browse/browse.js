Template.Browse.rendered = function() {
    //Start datepicker and move it to the body so it isnt blocked by "overflow: hidden"
    //This causes a memory poblem. It adds things to the body but never gets rid of them unless you refresh
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
        var center = map.getCenter();
        Session.set("pos", [center.lng(), center.lat()])
        var bounds = map.getBounds();
        if (bounds) {
            var ne = bounds.getNorthEast();
            var sw = bounds.getSouthWest();
            Session.set('topRight', [ne.lng(), ne.lat()]);
            Session.set('bottomLeft', [sw.lng(), sw.lat()]);

        }
    });
    //Should change to autosubscribe but autorun works as well. Updates subscription
    //Should get rid of subscription when template is closed/gotten rid of
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
    data.observe({
        added: function(place) {
            console.log(place);
            data.forEach(function(place) {
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(place.lat, place.lng),
                    map: map
                });
                var temp = '<div class="listing-div"><img class="listing-div-img" src="' + place.image + '"></img><div class="listing-div-top"><div class="listing-div-price">$' + place.price.toString() + '</div><div class="flex"></div></div><div class="listing-div-info"><div class="listing-div-title">' + place.title + '-' + place["length"].toString() + 'x' + place.width.toString() + "'" + '</div><div class="listing-div-adress">' + place.adress + '</div></div></div><button class="btn waves-effect waves-light full-width" onclick="alert(\'Not implemented yet\');">Learn More</button>';
                var infowindow = new google.maps.InfoWindow({
                    content: temp

                });
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.open(map, marker);
                });

            });

        }
    });
    // Session.set('price_range', $("#price_range").val());
    // $("#price_range").change(function(e) {
    //     Session.set('price_range', $("#price_range").val());
    // });
    // Session.set('price_range', $("#area_range").val());
    // $("#area_range").change(function(e) {
    //     Session.set('price_range', $("#area_range").val());
    // });
    // Session.set('price_range', $("#distance_range").val());
    // $("#distance_range").change(function(e) {
    //     Session.set('price_range', $("#distance_range").val());
    // });
    // Tracker.autorun(function() {
    //     var price = Session.get("price_range")
    //     var area = Session.get("area_range")
    //     var distance = Session.get("distance_range")
    //     distance = 1.6 * distance;
    //     var pos = Session.get("pos")
    //     data = Listings.find({
    //         $and: [{
    //                 price: {
    //                     $lt: price
    //                 }
    //             }, {
    //                 area: {
    //                     $gt: area
    //                 }
    //             }, {
    //                 loc: {
    //                     $near: pos,
    //                     $maxDistance: distance
    //                 }
    //             }


    //         ]
    //     })


    // });
};
