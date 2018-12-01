
const mymap = L.map("mapid").setView([-6.3015898, 106.6528262], 11);
L.tileLayer(
  "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken:
      "pk.eyJ1IjoiaWtlbGlzdGlhbmkiLCJhIjoiY2pvOWh3cDNhMGFndzN2b2ozZnBob3doYyJ9.9jvK2nuvcFiZOBZISOF5kQ"
  }
).addTo(mymap);


(async function() {
        const URL = "./data/ramen.json";
        try {
          const res = await fetch(URL);
          const data = await res.json();
          localStorage.setItem("places", JSON.stringify(data.places));
        } catch (err) {
          console.log(err);
        }
      
        const img = document.getElementById("gambar");
        const title = document.getElementById("title");
        const review = document.getElementById("review");
      
        let places;
        try {
          places = await JSON.parse(await localStorage.getItem("places"));
        } catch (err) {
          console.log(err);
        }
      
        const findLocation = (x, y) => {
          for (let i = 0; i < places.length; i++) {
            if (places[i].location[0] === x && places[i].location[1] === y) {
              return i;
            }
          }
          return -1;
        };
      
        const insertView = index => {
          img.src = places[index].gambar;
          img.alt = places[index].title;
          title.innerHTML = places[index].title;
          review.innerHTML = places[index].review;
        };
      
        const showLocation = e => {
          const index = findLocation(e.latlng.lat, e.latlng.lng);
          if (index >= 0) {
            insertView(index);
          }
        };
      
        if (places) {
          places.map((place, index) => {
            var marker = L.marker(place.location)
              .addTo(mymap)
              .bindPopup(`<b>${place.title}</b>`);
            marker.on("click", showLocation);
            if (index === 0) {
              marker.openPopup();
            }
          });
          // Init data
          insertView(0);
        }
      })();



/*var popup = L.popup()
.setLatLng([-6.3853923,106.8501977])
.setContent("Ramen Setan TerFavorit")
.openOn(mymap);*/

function onMapClick(e) {
        console.log("Peta diklik pada posisi " + e.latlng);
        }
        mymap.on('click', onMapClick);





