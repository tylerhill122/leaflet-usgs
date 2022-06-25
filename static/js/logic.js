// var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// var url = "/static/data/all_week.geojson";
// var url = "/static/data/significant_month.geojson";

// earthquakes > 4.5 magnitude in the past 7 days
var url = "/static/data/4.5_week.geojson";

// var mag = data.properties.mag;
// var depth = data.properties.coordinates[2];

d3.json(url).then(function(data) {

    // finding magnitude values
    console.log(data.features[100].properties[0]);

    // finding depth values
    console.log(data.features[100].geometry.coordinates[2]);

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