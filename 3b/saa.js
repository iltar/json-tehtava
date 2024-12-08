fetch(
  "https://api.openweathermap.org/data/2.5/weather?lang=fi&q=helsinki&units=metric&APPID=665ecd56dfc08dbb50feb8b8f5034e28"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (responseJson) {
    kerro(responseJson, "helsinki");
  })
  .catch(function (error) {
    document.getElementById("vastaus").innerHTML =
      "<p>Tietoa ei pystytä hakemaan</p>";
  });

fetch(
  "https://api.openweathermap.org/data/2.5/weather?lang=fi&q=tampere&units=metric&APPID=665ecd56dfc08dbb50feb8b8f5034e28"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (responseJson) {
    kerro(responseJson, "tampere");
  })
  .catch(function (error) {
    document.getElementById("vastaus").innerHTML =
      "<p>Tietoa ei pystytä hakemaan</p>";
  });

function kerro(data, field) {
  let teksti = "<h3>" + data.name + "</h3>";
  teksti += "<ul><li><b>Sää:</b> " + data.weather[0].description;
  teksti += "</li><li><b>Lämpötila: </b> " + data.main.temp + " °C";
  teksti += "</li><li><b>Tuulen nopeus: </b> " + data.wind.speed + " m/s";
  teksti += "</li></ul>";
  let kuva = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
  teksti += "<p class='image'><img src='" + kuva + "'alt='sää ikoni'></img></p>";
  teksti += document.getElementById(field).innerHTML = teksti;
}
