
function add() {

  if(sessionStorage.getItem("user")=="admin"){
    //console.log(sessionStorage.getItem("user"))
    let user = {
      name: document.getElementById("username").value,
      password: document.getElementById("password").value,
      role: document.getElementById("role").value,
    };
    console.log(user);
    if (
      (document.getElementById("username").value.length == 0) |
      (document.getElementById("password").value.length == 0)
    ) {
      console.log(document.getElementById("ville").value);
      alert("le champ ville est vide");
      $(document).ready(function () {
        $("#ville").css("border-color", "red");
      });
    } else {
      console.log(sessionStorage.getItem("token"));
      $.ajax({
        url: "http://localhost:3000/postUser",
        dataType: "json",
        type: "post",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        contentType: "application/json",
        data: JSON.stringify(user),
        processData: false,
        success: function (data, textStatus, jQxhr) {
          console.log(JSON.stringify(data));
          alert("Les données ont été envoyé avec succès");
        },
        error: function (jqXhr, textStatus, errorThrown) {
          console.log(errorThrown);
          alert("Les données n'ont pas été envoyé");
        },
      });
    }
  }else{
    alert("not admin")
  }
  getUsers();
}
//pour recuper les voyage
function getUsers() {
  // console.log(sessionStorage.getItem("token"));
  $.ajax({
    url: "http://localhost:3000/getUsers",
    dataType: "json",
    type: "get",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
    contentType: "application/json",
    processData: false,
    success: function (response, textStatus, jQxhr) {
      let html = "";
      document.getElementById("userData").innerHTML =
        "<tr><th>Id</th><th>username</th><th>role</th><tr>";
      response.forEach((element) => {
        html +=
          "<tr> <td>" +
          element.useId +
          "</td><td>" +
          element.useName +
          "</td><td>" +
          element.userole +
          "</td></tr>";
      });
      document.getElementById("userData").innerHTML =
        document.getElementById("userData").innerHTML + html;
    },
    error: function (jqXhr, textStatus, errorThrown) {
      console.log(errorThrown);
      if (errorThrown == "Forbidden") {
        location.replace("http://localhost/WEB-InfoWorldTour/index.html");
      }
    },
  });
}