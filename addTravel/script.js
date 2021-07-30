function add() {
    let travel = {
        "user":sessionStorage.getItem("user"),
        "data": {
            "Ville":document.getElementById("ville").value,
            "Pays":document.getElementById("pays").value,
            "NomHebergement":document.getElementById("hebergement").value,
            "TelHebergement":document.getElementById("tel").value,
            "DateArriver":document.getElementById("arriver").value,
            "DateDepart":document.getElementById("depart").value,
            "Divers":document.getElementById("divers").value
        }
        
    }
    if(document.getElementById("ville").value.length == 0){
        console.log(document.getElementById("ville").value)
        alert("le champ ville est vide")
        $(document).ready(function(){
            $("#ville").css("border-color", "red");

        });
    }else{
        console.log(sessionStorage.getItem("token"))
        $.ajax({
            url: 'http://localhost:3000/postDataTravel',
            dataType: 'json',
            type: 'post',
            headers: {
                "Authorization" : "Bearer " + sessionStorage.getItem("token")
            },
            contentType: 'application/json',
            data: JSON.stringify(travel),
            processData: false,
            success: function (data, textStatus, jQxhr) {
                console.log(JSON.stringify(data));
                alert("Les données ont été envoyé avec succès");
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
                alert("Les données n'ont pas été envoyé");
                
            }
        })
    }
}