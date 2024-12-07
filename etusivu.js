fetch("https://jaakkola.github.io/json/digitekniikat.json")
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
  let teksti = "<h1>" + data.otsikko + "</h1>";
  teksti += "<p>" + data.kuvaus + "</p>";
  teksti += "<p><img src='" + data.kuva + "' alt='kuva' ></p>";
  teksti +=
    "<h3>Opintojakso: " +
    data.opintojakso.nimi +
    " " +
    data.opintojakso.tunnus +
    " " +
    data.opintojakso.opintopisteet +
    "op</h3>";
  teksti += "<ul>";
  for (var i = 0; i < data.sisalto.length; i++) {
    teksti += "<li>" + data.sisalto[i] + "</li>";
  }
  teksti += "</ul>";
  teksti += "<h3>Linkit</h3>";
  teksti += "<ul>";
  for (var i = 0; i < data.tekniikat.length; i++) {
    teksti += "<li>" + data.tekniikat[i].aihe;
    teksti +=
      " <a target='_blank' href=" +
      data.tekniikat[i].linkki +">" 
      + data.tekniikat[i].linkki + "</a></li>";
  }
  teksti += "</ul>";
  document.getElementById("vastaus").innerHTML = teksti;
}
