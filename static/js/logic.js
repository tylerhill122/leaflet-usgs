// var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// var url = "/static/data/all_week.geojson";
// var url = "/static/data/significant_month.geojson";

// earthquakes > 4.5 magnitude in the past 7 days
var url = "/static/data/4.5_week.geojson";

d3.json(url).then(function(data) {

    // finding magnitude values
    // console.log(data.features[100].properties[0]);

    // // finding depth values
    // console.log(data.features[100].geometry.coordinates[2]);

    // L.geoJson(data).addTo(myMap);

    function marker() {
        let dF = data.features;
        // let depth = dF[i].geometry.coordinates[2]
    
        for (var i = 0; i < dF.length; i++) {
            
            // console.log(dF[i]);

            // Conditionals for EQ depth
            var color = "";
            if (dF[i].geometry.coordinates[2] > 100) {
              color = "red";
            }
            else if (dF[i].geometry.coordinates[2] < 100 && dF[i].geometry.coordinates[2] > 75) {
              color = "blue";
            }
            else if (dF[i].geometry.coordinates[2] < 75 && dF[i].geometry.coordinates[2] > 50) {
              color = "green";
            }
            else {
              color = "violet";
            }
            
            let lat = dF[i].geometry.coordinates[0];
            let lon = dF[i].geometry.coordinates[1];
            let lonlat = [lon, lat];

            // // Add circles to the map.
            L.circle(lonlat, {
              fillOpacity: 0.75,
              color: "white",
              fillColor: color,
              // Adjust the radius.
              radius: Math.sqrt(dF[i].properties.mag) * 90000
            }).addTo(myMap);
          }
    };

    marker();
});

var myMap = L.map("map", {
    // centered upon Hanoi, Vietnam
    center: [21.0142, 105.5115],
    zoom: 3
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);