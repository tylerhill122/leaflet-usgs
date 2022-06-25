// var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// var url = "/static/data/all_week.geojson";
// var url = "/static/data/significant_month.geojson";

// earthquakes > 4.5 magnitude in the past 7 days
var url = "/static/data/4.5_week.geojson";

d3.json(url).then(function(data) {
    console.log(data.features);
    L.geoJson(data).addTo(myMap);
  });

var myMap = L.map("map", {
    // centered upon Hanoi, Vietnam
    center: [21.0142, 105.5115],
    zoom: 3
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);