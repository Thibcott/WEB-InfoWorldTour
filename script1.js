function connect(){
    
    let data = {
        "username": document.getElementById("username").value,
        "password":  document.getElementById("password").value
    }
    //console.log(data)
    sessionStorage.setItem('user', data.username);
    
    $.ajax({
        url: 'http://localhost:3000/login',
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(data),
        processData: false,
        success: function (result, textStatus, jQxhr) {
            console.log(result);
            sessionStorage.setItem('token', result.accessToken);
            sessionStorage.setItem('role', result.role)
            // alert("connecter")
            location.replace("http://localhost/WEB-InfoWorldTour/home/index.html")
        },
        error: function (jqXhr, textStatus, errorThrown) {
            $(document).ready(function(){
                $("#password").css("border-color","red")
                $("#username").css("border-color","red")
                $("#status").text("Données incorrect !");
              });
            console.log(errorThrown);
       
        }
    })
}

function getDate() {
    //GET pour optennir la date du jour
    fetch('http://localhost:3000/dateDuJour')
    .then(response => response.json())
    .then(response => {
       console.log("GET pour optenir la date du jour : "+response.date);
    });
    $.ajax({
        url: 'http://localhost:3000/dateDuJour',
        dataType: 'json',
        type: 'get',
        contentType: 'application/json',
        processData: false,
        success: function (result, textStatus, jQxhr) {
            console.log(result);
            
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
}
