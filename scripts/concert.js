
const concerts_url = "https://api.songkick.com/api/3.0/metro_areas/11104/calendar.json?apikey=qxYE8Bnx5j7Stvgg"
const local_api1 = "http://localhost:8088/saveItinerary"
const concerts_api = {
    getConcertSelection: function () {
        return fetch(concerts_url)
            .then(response => response.json())
    }
}

// const createConcertSelectBox = (concerts) => {
//     const concertSelectBox = document.createElement('select');
//     concertSelectBox.setAttribute('id', 'concert_select')
//     for (let i = 0; i < concerts.length; i++) {
//         const concertSelectOption = document.createElement('option');
//         concertSelectOption.setAttribute('value', concerts[i].resultsPage.results.event)
//         concertSelectOption.textContent = concerts[i].Artist;
//         concertSelectBox.add(concertSelectOption)
//     }
//     return concertSelectBox;
// }

const createConcertSelectBox = (concerts) => {
    const concertSelectBox = document.createElement("select")
    concertSelectBox.setAttribute("id", "concert_selection")
    for (let i = 0; i < concerts.length; i++) {
        const concertSelectOption = document.createElement("option")
        concertSelectOption.setAttribute("value", concerts[0].resultsPage)
        concertSelectOption.textContent = concerts
        concertSelectBox.appendChild(concertSelectOption)
    }
    return concertSelectBox
  }
  
  

concerts_api.getConcertSelection()
    .then((concerts) => {
        console.table(concerts)

        let concertSelectionFunction = createConcertSelectBox(concerts)
        // console.log(concertSelectionFunction)
        document.getElementById("concerts_select").appendChild(concertSelectionFunction)
    })

document.querySelector(".itinerary__save").addEventListener("click", event => {

    const concertInput = document.querySelector("#concerts_selection").value

    const saveItinerary = {
        concert_name: concertInput
    }

    let fetchData = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(saveItinerary)
    }

    fetch(local_api1, fetchData)
})

