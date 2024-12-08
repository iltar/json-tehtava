fetch(
  "https://rata.digitraffic.fi/api/v1/live-trains/station/HKI?departing_trains=100&include_nonstopping=false"
)
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
  let teksti = "<h1>Junalla Tampereelle</h1>";
  teksti += "<p>Juna-aikataulut Helsingistä Tampereelle</p>";
  data.forEach((train) => {
    // ei peruttu ja ei ole vielä lähtenyt ja on pitkän matkan
    if (
      !train.cancelled &&
      !train.runningCurrently &&
      train.trainCategory == "Long-distance"
    ) {
      // lähtee helsingistä
      if (train.timeTableRows[0].stationShortCode == "HKI") {
        let h = train.timeTableRows[0];
        let t;
        let i = 1;
        // etsitään tampereella pysähtymisen kohta
        while (t == null && i < train.timeTableRows.length) {
          if (
            train.timeTableRows[i].stationShortCode == "TPE" &&
            train.timeTableRows[i].type == "ARRIVAL"
          ) {
            t = train.timeTableRows[i];

            teksti += "</hr><h3>" + "tyyppi" + "nro" + "</h3>";
            teksti +=
              "<p>Lähtöaika Helsingistä: " +
              "pvm" +
              " kello " +
              "klo" +
              ". Saapumisaika Tampereelle: " +
              "pvm" +
              " kello " +
              "klo" +
              "</p>";
          }
          i++;
        }
      }
    }
  });
  document.getElementById("vastaus").innerHTML = teksti;
}
