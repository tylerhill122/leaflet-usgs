var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// var url = "/static/data/all_week.geojson";
// var url = "/static/data/significant_month.geojson";

// earthquakes > 4.5 magnitude in the past 7 days
// var url = "/static/data/4.5_week.geojson";

d3.json(url).then(function(data) {

    // L.geoJson(data).addTo(myMap);

    var earthQuakes = [];

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

        // // Add circles to the map.
        // append to earthQuake array
        earthQuakes.push(
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
                        <h3>Magnitude:</h3> ${dF[i].properties.mag}
                        <h3>Depth:</h3> ${dF[i].geometry.coordinates[2]}
                        <div class="logo">
                        <a href="${dF[i].properties.url}" target="_blank"><img src="static/images/usgs-logo.png" id="usgs"><p>Learn more</p></a>
                        </div>
                    `)
        );
    };

    var eqLayer = L.layerGroup(earthQuakes);

    url2 = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json"
    d3.json(url2).then(function(data2) {
        var plates = L.geoJson(data2)
        var myMap = L.map("map", {
            // centered upon Hanoi, Vietnam
            center: [21.0142, 105.5115],
            zoom: 3
        });
    
        var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        })
    
        var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        });
    
        var baseMaps = {
            "Street": street,
            "Topography": topo
        };
    
        var overlayMaps = {
            "Earthquakes": eqLayer,
            "Plates" : plates
        };

    L.control.layers(baseMaps, overlayMaps).addTo(myMap);
    });



});