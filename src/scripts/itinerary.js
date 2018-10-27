const API = {
    getItineraryEntries: function () {
        return fetch("http://localhost:8088/savedItinerary")
            .then(response => response.json())
    }
}

const itineraryEntryComponentObject = {
    itineraryEntryComponent: (entry) => {
        if(!entry) {
            return `
            <div class="form-post">
                <p>Submit Your First Entry</p>
                <button class="btn itinerary__save">Save Your Itinerary</button>
            </div>
            `
        } else {
            return `
            <div class="form-post">
                <p>${entry.park_choice}</p>
                <p>${entry.restaurants_choice}</p>
                <p>${entry.concert_name}</p>
                <button class="btn itinerary__update">Update Your Itinerary</button>
            </div>
            `
        }
    }
}

const itineraryEntryComponentObjectManager = Object.create(itineraryEntryComponentObject);

API.getItineraryEntries()
    .then((itineraryEntries) => {
        document.querySelector(".entryLog").innerHTML += itineraryEntryComponentObjectManager.itineraryEntryComponent(itineraryEntries.slice(-1)[0]);
        if(!itineraryEntries || itineraryEntries.length === 0) {
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
                fetch(local_api, fetchData).then(() => {
                    window.location.reload()
                })
            })

        } else {
            document.querySelector(".itinerary__update").addEventListener("click", event => {
                const restaurantsInput = document.querySelector("#restaurants_selection").value
                const parkInput = document.querySelector("#park_selection").value
                const concertInput = document.querySelector("#concerts_selection").value
            
                const savedItinerary = {
                    park_choice: parkInput,
                    restaurants_choice: restaurantsInput,
                    concert_name: concertInput
                }
                let fetchData = {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(savedItinerary)
                }
                fetch("http://localhost:8088/savedItinerary/1", fetchData).then(() => {
                    window.location.reload()
                })
            })
        }
    })

