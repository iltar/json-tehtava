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
  teksti += "<p>Juna aikataulut Helsingistä Tampereelle</p>";
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

            teksti +=
              "</hr><h3>" + train.trainType + train.trainNumber + "</h3>";
            teksti +=
              "<p>Lähtöaika Helsingistä: " + muotoileAika(h.scheduledTime);
            if (h.commercialTrack != "") {
                teksti += " raiteelta " + h.commercialTrack;
            }
            teksti +=
              ". Saapumisaika Tampereelle: " +
              muotoileAika(t.scheduledTime)
              if (t.commercialTrack != "") {
                teksti += " raiteelle " + t.commercialTrack;
            }
            teksti += ".</p>";
          }
          i++;
        }
      }
    }
  });
  document.getElementById("vastaus").innerHTML = teksti;
}

function muotoileAika(aika) {
  pvm = new Date(aika);
  let kuu = Number(pvm.getMonth()) + 1;
  let teksti = pvm.getDate() + "." + kuu + "." + pvm.getFullYear();
  let min = pvm.getMinutes();
  if (min == 0) {
    min = "00";
  }
  teksti += " klo " + pvm.getHours() + ":" + min;
  return teksti;
}
