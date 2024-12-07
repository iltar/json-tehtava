fetch("https://gis.vantaa.fi/rest/tyopaikat/v1/Tekninen%20ala")
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
    let teksti = "<h1>Työpaikat</h1><ul>";
    data.forEach(t => {
        teksti += "<li><b>" + t.tyotehtava + "</b>, " + t.osoite;
        teksti += ", <a href=" + t.linkki + ' target="_blank"> Hae tästä</a>';
    });
    teksti += "</ul>";
    document.getElementById("vastaus").innerHTML = teksti;
}