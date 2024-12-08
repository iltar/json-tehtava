fetch("https://tie.digitraffic.fi/api/weathercam/v1/stations")
  .then(function (response) {
    return response.json();
  })
  .then(function (responseJson) {
    kerro(responseJson);
  })
  .catch(function (error) {
    document.getElementById("vastaus").innerHTML =
      "<p>Tietoa ei pystytä hakemaan</p>";
  });

function kerro(data) {
  let teksti = "<h1>Autolla Tampereelle</h1>";
  let lista = data.features;
  lista.forEach((kamera) => {
    let k = kamera.properties;

    // ainoastaan valtatie 3:n kamerat jotka ovat tamperetta etelämpänä
    if (k.name.substr(0, 4) == "vt3_" && kamera.geometry.coordinates[1] < 62) {
      teksti += "<h3>" + k.dataUpdatedTime + "</h3>";

      // kuvat kaikista aseman kameroista, jotka ovat käytössä
      k.presets.forEach((e) => {
        if (e.inCollection) {
          teksti +=
            "<p><img class='trafficCam' src='https://weathercam.digitraffic.fi/" +
            e.id +
            ".jpg' alt='liikennekamerakuva'></img></p>";
        }
      });
    }
  });
  document.getElementById("vastaus").innerHTML = teksti;
}
