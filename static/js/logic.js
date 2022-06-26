// var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
var url = "/static/data/all_week.geojson";
// var url = "/static/data/significant_month.geojson";

// earthquakes > 4.5 magnitude in the past 7 days
// var url = "/static/data/4.5_week.geojson";

d3.json(url).then(function(data) {

    // L.geoJson(data).addTo(myMap);

    function marker() {
        let dF = data.features;
        // let depth = dF[i].geometry.coordinates[2]
    
        for (var i = 0; i < dF.length; i++) {
            // Conditionals for EQ depth to set color
            var color = "";
            if (dF[i].geometry.coordinates[2] > 400) {
              color = "#2a4858";
            }
            else if (dF[i].geometry.coordinates[2] < 400 && dF[i].geometry.coordinates[2] > 300) {
              color = "#23596a";
            }
            else if (dF[i].geometry.coordinates[2] < 300 && dF[i].geometry.coordinates[2] > 200) {
              color = "#146b79";
            }
            else if (dF[i].geometry.coordinates[2] < 300 && dF[i].geometry.coordinates[2] > 200) {
                color = "#007d85";
            }
            else if (dF[i].geometry.coordinates[2] < 200 && dF[i].geometry.coordinates[2] > 100) {
                color = "#008f8c";
            }
            else if (dF[i].geometry.coordinates[2] < 100 && dF[i].geometry.coordinates[2] > 50) {
                color = "#0ea18f";
            }
            else if (dF[i].geometry.coordinates[2] < 50 && dF[i].geometry.coordinates[2] > 30) {
                color = "#35b28e";
            }
            else if (dF[i].geometry.coordinates[2] < 30 && dF[i].geometry.coordinates[2] > 20) {
                color = "#58c389";
            }
            else if (dF[i].geometry.coordinates[2] < 20 && dF[i].geometry.coordinates[2] > 10) {
                color = "#7dd382";
            }
            else if (dF[i].geometry.coordinates[2] < 10 && dF[i].geometry.coordinates[2] > 5) {
                color = "#a4e27a";
            }
            else if (dF[i].geometry.coordinates[2] < 5 && dF[i].geometry.coordinates[2] > 2) {
                color = "#cdef72";
            }
            else if (dF[i].geometry.coordinates[2] < 2 && dF[i].geometry.coordinates[2] > 0) {
                color = "#fafa6e";
            }
            else {
              color = "#fafa6e";
            }
            
            let lat = dF[i].geometry.coordinates[0];
            let lon = dF[i].geometry.coordinates[1];
            let lonlat = [lon, lat];

            // console.log(dF[i].properties.url)

            // // Add circles to the map.
            L.circle(lonlat, {
              fillOpacity: 0.75,
              color: "white",
              fillColor: color,
              // Adjust the radius.
              radius: (dF[i].properties.mag * dF[i].properties.mag * dF[i].properties.mag) * 3000,
              weight: 0
            })
                .bindPopup(`
                    <h2>${dF[i].properties.place}</h2><hr>
                    <h3>Magnitude: ${dF[i].properties.mag}</h3>
                    <h3>Depth: ${dF[i].geometry.coordinates[2]}</h3>
                    <p><a href="${dF[i].properties.url}" target="_blank">Learn More</a></p>
                `)
                .addTo(myMap);

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