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
                <p class="entry_text">Have a date but can't think of anything?</p>
                <button  id="btn" class="btn itinerary__save">Submit Your Date Idea</button>
            </div>
            `
        } else {
            return `
            <div class="form-post">
                <h1>Park:</h1>
                <p class="entry">${entry.park_choice}</p>
                <h1>Resaurant:</h1>
                <p class="entry">${entry.restaurants_choice}</p>
                <h1>Concert:</h1>
                <p class="entry">${entry.concert_name}</p>
                <br/>
                <button id="btn" class="btn itinerary__update">Update Your Date</button>
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

