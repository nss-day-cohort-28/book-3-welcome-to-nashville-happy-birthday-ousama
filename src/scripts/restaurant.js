const restaurants_url = "https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city"

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
    let restaurantChoice = restaurants.restaurants[i].restaurant.name
    restaurantSelectOption.setAttribute("value", restaurantChoice)
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