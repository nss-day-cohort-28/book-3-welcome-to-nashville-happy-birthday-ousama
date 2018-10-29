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
    if (parks[i].dog_park === "Yes") {
      const parksSelectOption = document.createElement("option")
      parksSelectOption.setAttribute("value", parks[i].park_name)
      parksSelectOption.textContent = `Dog Park - ${parks[i].park_name}`
      parksSelectBox.appendChild(parksSelectOption)
    } else if (parks[i].hiking_trails === "Yes") {
        const parksSelectOption = document.createElement("option")
        parksSelectOption.setAttribute("value", parks[i].park_name)
        parksSelectOption.textContent = `Hiking Trail - ${parks[i].park_name}`
        parksSelectBox.appendChild(parksSelectOption)
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
