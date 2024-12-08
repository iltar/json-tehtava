fetch("https://api.visittampere.com/api/v1/visittampere/event/all/")
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
    let teksti = "<h1>Tampereella tapahtuu</h1>";
    data.forEach(t => {
        let tiedot = t.pirkanmaaevents_event;
        let linkki = tiedot.provider_link;

        teksti += "<h3>" + tiedot.name[1].text +"</h3>";
        teksti += "<p>" + tiedot.description[1].text +"</p>";
        if (linkki != "") {
            teksti += "<p><a href=" + linkki + ">" + linkki + "</a></p>";
        }
    });
    document.getElementById("vastaus").innerHTML = teksti;
}