import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
 

  let cities = await fetchCities();
  // console.log(cities);
  // Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });

}
//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const dataCities = await fetch(`${config.backendEndpoint}/cities`);
    const jsonDataCities = await dataCities.json();
    console.log(jsonDataCities)
    return jsonDataCities;
  }
  catch {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

  const row = document.getElementById("data");
  const div = document.createElement("div");
  div.setAttribute("class", "col-sm-6 col-lg-3 mb-4");

  const tile = document.createElement("div");
  tile.setAttribute("class", "tile");

  const a = document.createElement("a");
  a.setAttribute("id", id);
  a.setAttribute("href", `pages/adventures/?city=${id}`)

  const img = document.createElement("img");
  img.setAttribute("src", image);

  const tileTextDiv = document.createElement("div");
  tileTextDiv.setAttribute("class", "tile-text text-center");

  const tileTextCityName = document.createElement("div");
  tileTextCityName.append(city);

  const tileTextDesc = document.createElement("div");
  tileTextDesc.append(description);

  tileTextDiv.append(tileTextCityName, tileTextDesc);
  tile.append(img, tileTextDiv);
  a.append(tile)
  div.append(a);
  row.append(div);

}

export { init, fetchCities, addCityToDOM };
