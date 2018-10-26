const parks_url = "https://data.nashville.gov/resource/xbru-cfzi.json?$$app_token=V5OFRJzFtF6fJPiVjgSOPMPNO"
const local_api = "http://localhost:8088/savedItinerary"
const parks_api = {
  getParksSelection: function () {
    return fetch(parks_url)
      .then(response => response.json())
  }
}

const createParksSelectBox = (parks) => {
  const parksSelectBox = document.createElement("select")
  parksSelectBox.setAttribute("id", "park_selection")
  for (let i = 0; i < parks.length; i++) {
    //pulling dog parks
    if (parks[i].dog_park === "Yes") {
      const parksSelectOption = document.createElement("option")
      parksSelectOption.setAttribute("value", parks[i].park_name)
      parksSelectOption.textContent = `Dog Park - ${parks[i].park_name}`
      parksSelectBox.appendChild(parksSelectOption)
      // pulling hiking trails
    } else if (parks[i].hiking_trails === "Yes") {
        const parksSelectOption = document.createElement("option")
        parksSelectOption.setAttribute("value", parks[i].park_name)
        parksSelectOption.textContent = `Hiking Trail - ${parks[i].park_name}`
        parksSelectBox.appendChild(parksSelectOption)
      // pulling disc golf
    } else if (parks[i].disc_golf === "Yes") {
        const parksSelectOption = document.createElement("option")
        parksSelectOption.setAttribute("value", parks[i].park_name)
        parksSelectOption.textContent = `Disc Golf - ${parks[i].park_name}`
        parksSelectBox.appendChild(parksSelectOption)
    }
  }
  return parksSelectBox
}

parks_api.getParksSelection()
  .then((parks) => {
    let parksSelectionFunction = createParksSelectBox(parks)
    document.getElementById("parks_select").appendChild(parksSelectionFunction)
  })

document.querySelector(".itinerary__save").addEventListener("click", event => {
  const parkInput = document.querySelector("#park_selection").value

  const savedItinerary = {
    park_choice: parkInput
  }
  let fetchData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(savedItinerary)
  }
  fetch(local_api, fetchData)
})
