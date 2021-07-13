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
function getVoyage() {
    //get pour recupere les messages
    fetch('http://localhost:3000/getDataTravel/')
        .then(response => response.json())
        .then(response => {
            console.log(response)
            let idOfLast = response.length - 1;
            console.log(idOfLast)
            let json = JSON.parse(response[idOfLast].voyData)

            console.log(json);

            document.getElementById("info").innerHTML = json.Ville;

         
        });
}