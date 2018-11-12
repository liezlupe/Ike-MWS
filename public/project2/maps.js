

let mymap = L.map('mapid').setView([-6.3853923,106.8501977],17);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <ahref="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',maxZoom: 20,id: 'mapbox.streets',accessToken:
'pk.eyJ1IjoiaWtlbGlzdGlhbmkiLCJhIjoiY2pvOWh3cDNhMGFndzN2b2ozZnBob3doYyJ9.9jvK2nuvcFiZOBZISOF5kQ'}).addTo(mymap);

var marker = L.marker([-6.3853923,106.8501977],{
        width: '25px',
        height: '41px',
}).addTo(mymap);



marker.bindPopup("<b>Warung Jepang MOJO</b><br>Tempat Favorite Nge 'Ramen' ").openPopup();

/*var popup = L.popup()
.setLatLng([-6.3853923,106.8501977])
.setContent("Ramen Setan TerFavorit")
.openOn(mymap);*/

function onMapClick(e) {
        console.log("Peta diklik pada posisi " + e.latlng);
        }
        mymap.on('click', onMapClick);



