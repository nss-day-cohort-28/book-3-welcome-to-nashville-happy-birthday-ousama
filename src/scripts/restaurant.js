const restaurants_url = "https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city"
// const local_api = "http://localhost:8088/savedItinerary"

const restaurants_api = {
  getRestaurantSelection: function () {
    return fetch(restaurants_url, {
      headers: {
        "Content-Type": "application/json",
        "user-key": "c88f5029b90f29c1ea892dbddc8ed9ac"
      }
    })
    .then(response => response.json())
  }
}

const createRestaurantSelectBox = (restaurants) => {
  const restaurantSelectBox = document.createElement("select")
  restaurantSelectBox.setAttribute("id", "restaurants_selection")
  for (let i = 0; i < restaurants.restaurants.length; i++) {
    const restaurantSelectOption = document.createElement("option")
    //  needs options
    let restaurantChoice = restaurants.restaurants[i].restaurant.name
    restaurantSelectOption.setAttribute("value", restaurantChoice)
    console.log(restaurantChoice)
    restaurantSelectOption.textContent = restaurantChoice 
    restaurantSelectBox.appendChild(restaurantSelectOption)
  }
  return restaurantSelectBox
}

restaurants_api.getRestaurantSelection()
  .then((restaurants) => {
    let restaurantsSelectionFunction = createRestaurantSelectBox(restaurants)
    document.getElementById("restaurants_select").appendChild(restaurantsSelectionFunction)
  })


  document.querySelector(".itinerary__save").addEventListener("click", event => {
    const restaurantsInput = document.querySelector("#restaurants_selection").value

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