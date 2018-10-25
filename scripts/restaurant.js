fetch("https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city", {
  headers: {
    "Content-Type": "application/json",
    "user-key": "c88f5029b90f29c1ea892dbddc8ed9ac"
  }
})
.then(response => response.json())
.then(response => console.log(response))


const restaurants_url = "https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city"
const local_api = "http://localhost:8088/savedItinerary"

const restaurants_api = {
  getRestaurantSelection: function () {
    return fetch(restaurants_url)
    .then(response => response.json())
  }
}

const createRestaurantSelectBox = (restaurants) => {
  const restaurantSelectBox = document.createElement("select")
  for (let i = 0; i < restaurants.length; i++) {
    const restaurantSelectOption = document.createElement("restaurant_option")
    //  needs options
    restaurantSelectOption.setAttribute("value", restaurants[i])

    restaurantsSelectBox.appendChild(restaurantSelectOption)
  }
  return restaurantSelectBox
}

restaurants_api.getRestaurantSelection()
  .then((restaurants) => {
    console.table(restaurants)
    let restaurantSelectBox = createRestaurantSelectBox(restaurants)
    document.getElementById("restaurants_select").appendChild(restaurantsSelectionFunction)
  })


  document.querySelector(".itinerary__save").addEventListener("click", event => {
    const restaurantsInput = document.querySelector("#restaurants_select").value

    const savedItinerary = {
      restaurants_choice: restaurantsInput
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