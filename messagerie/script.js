let i = true;
let User = "defuser";

function btnSend() {
    let message = {
        "text": document.getElementById("myText").value,
        "user": User
    }
    console.log(JSON.stringify(message));
    $.ajax({
        url: 'http://localhost:3000/postMessage',
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(message),
        processData: false,
        success: function (data, textStatus, jQxhr) {
            console.log(JSON.stringify(data));
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
}
function onload() {

    setInterval(function () {
        getMessage();
        $(function () {
            console.log("JQ");
            $('html, body').animate({ scrollTop: $(document).height() }, 5);
        });
        console.log("JS");
    }, 2000);


    User = prompt("Please enter your name:", "defuser");
    //GET pour optennir la date du jour
    fetch('http://localhost:3000/dateDuJour')
        .then(response => response.json())
        .then(response => {
           console.log("GET pour optenir la date du jour : "+response.date);
        })
}

function getMessage() {
    //get pour recupere les messages
    fetch('http://localhost:3000/getMessage')
        .then(response => response.json())
        .then(response => {
            let html = "" ;
            response.forEach(element => {
                let message = "Message : " + element.mesText + " | ecrit par " + element.mesUser
                // html += "<tr> <td> " + element.mesText + "</td><td> " + element.mesUser + "</td></tr>";
                html += "<div class='container'><label class='right'>de : " + element.mesUser +
                    "</label><p>" +
                    element.mesText +
                    "</p><span class='time-left'>" +
                    element.mesDate +
                    "</span></div>"
            });
            //console.log(html);
            //sortie affichage
            document.getElementById("conv").innerHTML = html;
        });
}

