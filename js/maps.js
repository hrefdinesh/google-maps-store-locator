 function initialize() {
     var markers = new Array();

     var mapOptions = {
         zoom: 14,
         mapTypeId: google.maps.MapTypeId.ROADMAP,
         center: new google.maps.LatLng(-33.890542, 151.274856)
     };


     var locations = [
         [new google.maps.LatLng(-33.890542, 151.274856), 'Bondi Beach', 'Infowindow content for Marker 1'],
         [new google.maps.LatLng(-33.923036, 151.259052), 'Coogee Beach', 'Infowindow content for Marker 2'],
         [new google.maps.LatLng(-34.028249, 151.157507), 'Cronulla Beach', 'Infowindow content for Marker 3'],
         [new google.maps.LatLng(-33.80010128657071, 151.28747820854187), 'Manly Beach', 'Infowindow content for Marker 4'],
         [new google.maps.LatLng(-33.950198, 151.259302), 'Maroubra Beach', 'Infowindow content for Marker 5'],
         [new google.maps.LatLng(-33.950198, 151.159302), 'Beach 6', 'Infowindow content for Marker 6']
     ];

     var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

     var infowindow = new google.maps.InfoWindow();

     var bounds = new google.maps.LatLngBounds();

     for (var i = 0; i < locations.length; i++) {

         var pos = locations[i][0];
         bounds.extend(pos);
         var marker = new google.maps.Marker({
             position: locations[i][0],
             map: map,
             title: locations[i][1],
         });

         // Register a click event listener on the marker to display the corresponding infowindow content
         google.maps.event.addListener(marker, 'click', (function(marker, i) {

             return function() {
                 infowindow.setContent(locations[i][2]);
                 infowindow.open(map, marker);
             }

         })(marker, i));

         // Add marker to markers array
         markers.push(marker);
     }

     map.fitBounds(bounds);

     // Trigger a click event on each marker when the corresponding marker link is clicked
     $('.marker-link').on('click', function() {
         google.maps.event.trigger(markers[$(this).data('markerid')], 'click');
          map.fitBounds(bounds);
     });
 }

 initialize();
