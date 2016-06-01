# google-maps-store-locator
Google Maps Simple Store Locator - Click the external link to trigger the infowindow in google maps.
### Js files
```
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<script src="http://maps.google.com/maps/api/js?sensor=false"></script>
<script src="js/maps.js"></script>
```
### Demo
http://jsfiddle.net/hrefdinesh/3cbk2wd5/

### maps.js
```
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

```
### Example HTML
```
<div id="map-canvas"></div>
<div id="markers">
  <a class="marker-link" data-markerid="0" href="#">Place 1</a> 
  <a class="marker-link" data-markerid="1" href="#">Place 2</a> 
  <a class="marker-link" data-markerid="2" href="#">Place 3</a> 
  <a class="marker-link" data-markerid="3" href="#">Place 4</a> 
  <a class="marker-link" data-markerid="4" href="#">Place 5</a> 
  <a class="marker-link" data-markerid="5" href="#">Place 6</a> 
</div>
```
### Example CSS
```
@import url(https://fonts.googleapis.com/css?family=Raleway);
body {
    padding: 0px;
    margin: 0px;
    font-family: 'Raleway', sans-serif;
}

#map-canvas {
    width: 100%;
    height: 400px;
    float: left;
}

#map-holder {
    position: relative;
    width: 100%;
    float: left;
}

#markers {
    position: absolute;
    right: 10px;
    top: 10px;
}

#markers a {
    background: #fff;
    padding: 5px 15px;
    margin-bottom: 2px;
    display: block;
    color: #000;
    text-decoration: none;
}
```
