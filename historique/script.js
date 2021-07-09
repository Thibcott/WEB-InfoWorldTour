function getDate() {
    fetch('http://localhost:3000/dateDuJour')
        .then(response => response.json())
        .then(response => {
            console.log("GET pour optenir la date du jour : ");
            console.log(response.date);
        })
}


//GET pour recupere l'historique des données de la db concernant les voyages 
function getVoyage() {
    alert()
    //get pour recupere les messages
    fetch('http://localhost:3000/getDataTravel/')
        .then(response => response.json())
        .then(response => {
            console.log(response);
            let html
            //sortie affichage
            // document.getElementById("conv").innerHTML = html;
        });
}