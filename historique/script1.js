function onload(){
    //getDate();
    getVoyage();  
    console.log(sessionStorage.getItem("user"))
    if(sessionStorage.getItem("user") == "view") {
        console.log(sessionStorage.getItem("user"))
        $(document).ready(function(){
            $("#btnAdd").hide();
        });
    }
}

function getDate() {
    fetch('http://localhost:3000/dateDuJour')
        .then(response => response.json())
        .then(response => {
            console.log("GET pour optenir la date du jour : ");
            console.log(response.date);
        })
}

function getVoyage(){
    console.log(sessionStorage.getItem("token"));
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

        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
            if(errorThrown == "Forbidden"){
                location.replace("http://localhost/WEB-InfoWorldTour/index.html")
            }
        }
    })

}