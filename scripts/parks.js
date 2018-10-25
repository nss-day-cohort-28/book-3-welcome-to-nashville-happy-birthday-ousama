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
  parksSelectBox.setAttribute("id", "parks_select")
  for (let i = 0; i < parks.length; i++) {
    if (parks[i].dog_park === "Yes") {
      console.log(parks[i])
      
      const parksSelectOption = document.createElement("parks_option")
      // come back and refine
      parksSelectOption.setAttribute("value", parks[i])
      // parksSelectOption.textContent = parks name
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
  const parkInput = document.querySelector("#parks_select").value

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