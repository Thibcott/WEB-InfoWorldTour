
function onload() {

  getDate();
  getVoyage();
  
}

function getDate() {
  //GET pour optennir la date du jour
  fetch('http://localhost:3000/dateDuJour')
  .then(response => response.json())
  .then(response => {
     console.log("GET pour optenir la date du jour : "+response.date);
  });
}

function getVoyage(){
  //console.log(sessionStorage.getItem("token"));
  $.ajax({
      url: 'http://localhost:3000/getDataTravel',
      dataType: 'json',
      type: 'get',
      headers: {
          "Authorization" : "Bearer " + sessionStorage.getItem("token")
      },
      contentType: 'application/json',
      processData: false,
      success: function (response, textStatus, jQxhr) {

        let idOfLast = response.length - 1;
        //console.log(idOfLast)
        let json = JSON.parse(response[idOfLast].voyData);
        //location
        let location = json.Ville+", "+json.Pays;
        document.getElementById("location").innerHTML = "<h2>"+location+"</h2>";
        getMap(location);
        //hebergement
        let hebergementhtml = "<h3>Hebergement : " + json.NomHebergement + "<br>tel : " + json.TelHebergement+"<h3>";
        document.getElementById("hebergement").innerHTML = hebergementhtml;
        //date
        let dArriver = json.DateArriver; 
        let dDepart = json.DateDepart;
        let diff = (Date.parse(dDepart) - Date.parse(dArriver))/1000/60/60/24;
        
        let datehtml =  "<h3>Date d'arriver  : " + dArriver + 
                        "<br>Date de depart  : " + dDepart +
                        "<br>Nombre de jours : " + diff +
                        "</h3>" ;
        document.getElementById("date").innerHTML = datehtml;
        //divers
        let divershtml = "<h3>Divers : </h3><p>"+json.Divers+"</p>";
        document.getElementById("divers").innerHTML =divershtml;

      },
      error: function (jqXhr, textStatus, errorThrown) {
          console.log(errorThrown);
          if(errorThrown == "Forbidden"){
              location.replace("http://localhost/WEB-InfoWorldTour/index.html")
          }
      }
  })

}
function getMap(location) { 
    //console.log(location);
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
          zoom:7 ,
        });

        // Create a marker and add it to the map.
        new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
      }
    });
}

function logout() {
    console.log(sessionStorage.getItem("token"));
    sessionStorage.clear()
}