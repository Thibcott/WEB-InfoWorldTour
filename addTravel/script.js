function add() {
    let travel = {
        "user":"front",
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
    console.log(JSON.stringify(travel));
    $.ajax({
        url: 'http://localhost:3000/postDataTravel',
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(travel),
        processData: false,
        success: function (data, textStatus, jQxhr) {
            console.log(JSON.stringify(data));
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
}