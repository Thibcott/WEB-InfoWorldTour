function onload(){
    getDate();
    getVoyage();   
}

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
    //get pour recupere les messages
    fetch('http://localhost:3000/getDataTravel/')
        .then(response => response.json())
        .then(response => {
            let html = "" ;
            let i = 0;
            // console.log(response)
            response.forEach(element => {
                let json = JSON.parse(element.voyData)
                html =  "<tr><td>"+json.Ville +
                        "</td><td>"+json.Pays +
                        "</td><td>"+json.NomHebergement +
                        "</td><td>"+json.TelHebergement +
                        "</td><td>"+json.DateArriver +
                        "</td><td>"+json.DateDepart +
                        "</td><td>"+json.Divers +
                        "</td><td>"+element.voyDate +                        
                        "</td></tr>"
                        +html ;
                i++;
                // console.log(json)
            });
            // console.log(response.length);
            document.getElementById("historic").innerHTML =
            document.getElementById("historic").innerHTML + html;

        });
}
// <textarea disabled></textarea>