function onload() {
    getDate();
    getVoyage();
    // getMap();
    
}

function getDate() {
      //GET pour optennir la date du jour
      fetch('http://localhost:3000/dateDuJour')
      .then(response => response.json())
      .then(response => {
         console.log("GET pour optenir la date du jour : "+response.date);
      });
}
function getVoyage() {
    let location;
    //get pour recupere les messages
    fetch('http://localhost:3000/getDataTravel/')
        .then(response => response.json())
        .then(response => {
            console.log(response)
            let idOfLast = response.length - 1;
            console.log(idOfLast)
            let json = JSON.parse(response[idOfLast].voyData)
            console.log(json);
            location = json.Ville+", "+json.Pays;
            document.getElementById("location").innerHTML = "<h2>"+location+"</h2>";
            getMap(location);
        });

}
function getMap(location) { 
    console.log(location);
    mapboxgl.accessToken =
    "pk.eyJ1IjoidGhpYmNvdHQiLCJhIjoiY2tkN2htcmJhMDV4bjJ4bXM1cGhvb2U5byJ9.q0SeEGAvzniKSdicQpbxlA";
     var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
    mapboxClient.geocoding
    .forwardGeocode({
      query: location,
      autocomplete: false,
      limit: 1,
    })
    .send()
    .then(function (response) {
      if (
        response &&
        response.body &&
        response.body.features &&
        response.body.features.length
      ) {
        var feature = response.body.features[0];

        var map = new mapboxgl.Map({
          container: "map",
          style: "mapbox://styles/mapbox/streets-v11",
          center: feature.center,
          zoom: 7,
        });

        // Create a marker and add it to the map.
        new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
      }
    });
}