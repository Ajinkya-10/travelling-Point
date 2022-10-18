import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let searchParams = new URLSearchParams(search);
  // console.log(searchParams.get('city'))
  return searchParams.get('city');


}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  console.log(city)
  try {
    const adventuresData = await fetch(`${config.backendEndpoint}/adventures?city=${city}`);
    const data = await adventuresData.json();
    // console.log(data)
    return data;
  }
  catch{
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.map((element) => {
    const domElement = document.getElementById("data");
    domElement.setAttribute("class", "row");
    const div = document.createElement("div");
    div.setAttribute("class", "col-6 col-lg-3 mb-4");
    div.setAttribute("style", "position:relative")
    div.innerHTML =
      `
   
      <div class = 'category-banner'>${element.category}</div>
      <a href='detail/?adventure=${element.id}' id=${element.id}>
        <div class = "activity-card">
            <img src = '${element.image}'/>
            <div class='d-flex flex-wrap justify-content-between px-2'>
              <p>${element.name}</p>
              <p>${element.costPerHead}</p>
            </div>
            <div class= 'd-flex flex-wrap justify-content-between px-2'>
              <p>DURATION</p>
              <p>${element.duration}</p>
            </div>
        </div>
      </a>
      </div>
    `;
    domElement.append(div)
  })

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  return list.filter(obj =>{
    return obj.duration <= high && obj.duration >= low
  })

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

  let filteredCategoryList = [];
  categoryList.forEach(cat =>{
    list.forEach(item =>{
      if(item.category == cat){
        filteredCategoryList.push(item);
      }
    })
  })
  return filteredCategoryList;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if(filters.duration !== "" && filters["category"].length == 0){
    const durationValues = filters.duration;
    const values = durationValues.split('-');
    const low = values[0];
    const high = values[1]; 
    return filterByDuration(list,low,high);
  }
  else if(filters["category"].length > 0 && filters['duration'] == ""){
    return filterByCategory(list,filters['category']);
  }
  else if(filters["category"].length > 0 && filters['duration'] !== ""){
    let catFilList = filterByCategory(list,filters['category']);
    const durationValues = filters.duration;
    const values = durationValues.split('-');
    const low = values[0];
    const high = values[1]; 
    return filterByDuration(catFilList,low,high);
  }
  else{
    return list;
  }


  // Place holder for functionality to work in the Stubs

  // return categoryInputList.length > 0 ? categoryInputList : list;
  // return list;



}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem('filters',JSON.stringify(filters));
  return true;

 
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  return JSON.parse(localStorage.getItem('filters'))

  // Place holder for functionality to work in the Stubs
 
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let categoryList = filters['category'];
  categoryList.forEach(cat=>{
    const catPil = document.createElement('div');
    catPil.setAttribute('class','category-filter');
    catPil.innerText = cat;
    document.getElementById('category-list').append(catPil);
  });

  let durationElement = document.getElementById("duration-select");
  let inputDuration = filters.duration;
  durationElement.value = inputDuration;

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
