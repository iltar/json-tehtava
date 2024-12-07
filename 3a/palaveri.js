fetch("https://iltar.github.io/json-tehtava/palaveri.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(responseJson) {
    kerro(responseJson);
  })
  .catch(function(error) {
    document.getElementById("palaveri").innerHTML =
      "<p>Tietoa ei pystytä hakemaan</p>";
  });

function kerro(data) {
  let teksti = "<h1> Palaveri: " + data.aihe + "</h1>";
  teksti += "<h3>Osallistujat (" + data.osallistujia + ")</h3>";
  teksti += "<ul>";
  for (var i = 0; i < data.osallistujat.length; i++) {
    teksti += "<li>" + data.osallistujat[i] + "</li>";
  }
  teksti += "</ul>";
  teksti += "<h3>Paikka</h3>";
  teksti += "<p>" + data.paikka + "</p>";
  teksti += "<h3>Aika</h3>";
  teksti += "<p> Aloitus: " + data.aloitus + "</p>";
  teksti += "<p> Kesto: " + data.kesto + "</p>";
  document.getElementById("palaveri").innerHTML = teksti;
}
