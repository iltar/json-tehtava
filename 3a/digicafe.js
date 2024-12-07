fetch("https://iltar.github.io/json-tehtava/ticos.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(responseJson) {
    kerro(responseJson);
  })
  .catch(function(error) {
    document.getElementById("vastaus").innerHTML =
      "<p>Tietoa ei pystytä hakemaan</p>";
  });

function kerro(data) {
  let teksti = "<h1>" + data.yritys + "</h1>";
  teksti += "<h3>Yhteystiedot</h3>";
  teksti += "<ul><li>Osoite: " + data.yhteystiedot.osoite + "</li>";
  teksti += "<li>Puhelin: " + data.yhteystiedot.puhelin + "</li>";
  teksti += "<li>Sähköposti: " + data.yhteystiedot.email + "</li></ul>";
  teksti += "<h3>Tuotteet</h3>";
  teksti += "<ul>";
  for (var i = 0; i < data.tuotteet.length; i++) {
    teksti += "<li>" + data.tuotteet[i] + "</li>";
  }
  teksti += "</ul>";
  teksti += "<h3>Henkilökunta</h3>";
  teksti += "<ul>";
  for (var i = 0; i < data.henkilokunta.length; i++) {
    teksti += "<li>" + data.henkilokunta[i].nimi;
    teksti += ", " + data.henkilokunta[i].titteli + "</li>";
  }
  teksti += "</ul>";
  document.getElementById("vastaus").innerHTML = teksti;
}
