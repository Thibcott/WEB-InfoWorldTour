let i = true;

function btnSend() {
    let message = {
        "text": document.getElementById("myText").value,
        "user": sessionStorage.getItem("user")
    }
    if(document.getElementById("myText").value == ""){
        console.log(document.getElementById("myText").value)
        alert("La textbox est vide")
        $(document).ready(function(){
            $("#myText").css("border-color", "red");

        });
    } else {
        console.log(JSON.stringify(message));
        $.ajax({
            url: 'http://localhost:3000/postMessage',
            dataType: 'json',
            type: 'post',
            headers: {
                "Authorization" : "Bearer " + sessionStorage.getItem("token")
            },
            contentType: 'application/json',
            data: JSON.stringify(message),
            processData: false,
            success: function (data, textStatus, jQxhr) {
                //console.log(JSON.stringify(data));
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
    }
}

function onload() {
    //getMessage();
    setInterval(function () {
        getMessage();
        //console.log(sessionStorage.getItem("user"))
       
    }, 2000);


    // User = prompt("Please enter your name:", "defuser");
    //GET pour optennir la date du jour
    fetch('http://localhost:3000/dateDuJour')
        .then(response => response.json())
        .then(response => {
           console.log("GET pour optenir la date du jour : "+response.date);
        })
}


function getMessage() {
    //console.log(sessionStorage.getItem("token"));
    $.ajax({
        url: 'http://localhost:3000/getMessage',
        dataType: 'json',
        type: 'get',
        headers: {
            "Authorization" : "Bearer " + sessionStorage.getItem("token")
        },
        contentType: 'application/json',
        processData: false,
        success: function (response, textStatus, jQxhr) {

            //console.log(response);
            let html = "" ;
            response.forEach(element => {
                let message = "Message : " + element.mesText + " | ecrit par " + element.mesUser
                // html += "<tr> <td> " + element.mesText + "</td><td> " + element.mesUser + "</td></tr>";
                html += "<div class='container'><label class='right'>de : " + element.mesUser +
                    "</label><p>" +
                    element.mesText +
                    "</p><span class='time-left'>" +
                    element.mesDate +
                    "</span></div>";
                
            });    
            //console.log(html)
            document.getElementById("conv").innerHTML = html;

        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
}

