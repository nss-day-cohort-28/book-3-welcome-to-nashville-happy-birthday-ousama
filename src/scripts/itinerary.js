document.querySelector(".itinerary__save").addEventListener("click", event => {
    const restaurantsInput = document.querySelector("#restaurants_selection").value
    const parkInput = document.querySelector("#park_selection").value
    const concertInput = document.querySelector("#concerts_selection").value

    const savedItinerary = {
        park_choice: parkInput,
        restaurants_choice: restaurantsInput,
        concert_name: concertInput
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

const API = {
    getItineraryEntries: function () {
        return fetch("http://localhost:8088/savedItinerary")
            .then(response => response.json())
    }
}

const itineraryEntryComponentObject = {
    itineraryEntryComponent: (entry) => {
        return `
        <div class="form-post">
            <p>${entry.park_choice}</p>
            <p>${entry.restaurants_choice}</p>
            <p>${entry.concert_name}</p>
        </div>
        `
    }
}

const itineraryEntryComponentObjectManager = Object.create(itineraryEntryComponentObject);

const componentMakerObjectManager = Object.create(componentMakerObject);

API.getItineraryEntries()
    .then((itineraryEntries) => {
        document.querySelector(".entryLog").innerHTML += itineraryEntryComponentObjectManager.itineraryEntryComponent(itineraryEntries.slice(-1)[0]);
    })
