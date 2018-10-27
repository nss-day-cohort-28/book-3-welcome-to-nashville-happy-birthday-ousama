
const concerts_url = "https://api.songkick.com/api/3.0/metro_areas/11104/calendar.json?apikey=qxYE8Bnx5j7Stvgg"
const concerts_api = {
    getConcertSelection: function () {
        return fetch(concerts_url)
            .then(response => response.json())
    }
}

const createConcertSelectBox = (concerts) => {
    const concertSelectBox = document.createElement("select")
    concertSelectBox.setAttribute("id", "concerts_selection")
    for (let i = 0; i < concerts.resultsPage.results.event.length; i++) {
        const concertSelectOption = document.createElement("option")
        concertSelectOption.setAttribute("value", concerts.resultsPage.results.event[i].displayName)
        concertSelectOption.textContent = concerts.resultsPage.results.event[i].displayName
        concertSelectBox.appendChild(concertSelectOption)
    }
    return concertSelectBox
  }

concerts_api.getConcertSelection()
    .then((concerts) => {
        let concertSelectionFunction = createConcertSelectBox(concerts)
        document.getElementById("concerts_select").appendChild(concertSelectionFunction)
    })

