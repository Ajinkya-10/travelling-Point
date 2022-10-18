import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const param = new URLSearchParams(search);
  return param.get('adventure');


  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const response = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
    const result = await response.json();
    return result;

  } catch (error) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

  // a. adding name of the adventure
  const adventureName = document.getElementById('adventure-name');
  adventureName.textContent = adventure["name"];

  // b. adding subtitle of the image 
  const adventureSubtitle = document.getElementById("adventure-subtitle");
  adventureSubtitle.textContent = adventure["subtitle"];

  // c. adding all images in the array
  const photoGallery = document.getElementById("photo-gallery");
  // const div = document.createElement('div');
  // div.setAttribute("id", "forEmpty");

  adventure["images"].forEach(image => {
    const img = document.createElement("img");
    img.setAttribute("class", "activity-card-image");
    img.setAttribute("src", image);
    // div.appendChild(img);
    photoGallery.appendChild(img);
  });

  // d. adding content of the image
  const adventureContent = document.getElementById("adventure-content");
  adventureContent.textContent = adventure["content"]

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images

  const photoGallery = document.getElementById("photo-gallery");
  photoGallery.innerHTML = "";

  const mainDiv = document.createElement("div");
  mainDiv.setAttribute("id", "carouselExampleIndicators")
  mainDiv.setAttribute("class", "carousel slide");
  mainDiv.setAttribute("data-bs-ride", "carousel");

  const carouselIndicators = document.createElement("div");
  carouselIndicators.setAttribute("class", "carousel-indicators");

  const carouselInner = document.createElement("div");
  carouselInner.setAttribute("class", "carousel-inner");

  let counter = 0;

  images.forEach(image => {

    const indicatorButton = document.createElement("button");
    indicatorButton.setAttribute("type", "button");
    indicatorButton.setAttribute("data-bs-target", "#carouselExampleIndicators");
    indicatorButton.setAttribute("data-bs-slide-to", `${counter}`);
    indicatorButton.setAttribute("aria-label", `Slide ${counter + 1}`);
    if (counter == 0) {
      indicatorButton.setAttribute("class", "active");
      indicatorButton.setAttribute("aria-current", "true");
    }

    carouselIndicators.appendChild(indicatorButton);

    const carouselItem = document.createElement("div");
    carouselItem.setAttribute("class", "carousel-item");
    carouselItem.innerHTML = `<img src="${image}" class="activity-card-image d-block w-100" alt="...">`;
    if (counter == 0) {
      carouselItem.setAttribute("class", "carousel-item active");
    }

    carouselInner.appendChild(carouselItem);
    counter++;

  });

  const buttonPrev = document.createElement('button');
  buttonPrev.setAttribute("class", "carousel-control-prev");

  buttonPrev.setAttribute("type", "button")
  buttonPrev.setAttribute("data-bs-target", "#carouselExampleIndicators")
  buttonPrev.setAttribute("data-bs-slide", "prev");
  buttonPrev.innerHTML =
    `
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  `;

  const buttonNext = document.createElement('button');
  buttonNext.setAttribute("class", "carousel-control-next");
  buttonNext.setAttribute("type", "button");
  buttonNext.setAttribute("data-bs-target", "#carouselExampleIndicators");
  buttonNext.setAttribute("data-bs-slide", "next");
  buttonNext.innerHTML =
    `
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  `;

  mainDiv.appendChild(carouselIndicators);
  mainDiv.appendChild(carouselInner);
  mainDiv.appendChild(buttonPrev);
  mainDiv.appendChild(buttonNext);

  // ('#photo-gallery').replaceWith("mainDiv");
  photoGallery.append(mainDiv);
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  // console.log(adventure);

  const soldOutPanel = document.getElementById("reservation-panel-sold-out");
  const availablePanel = document.getElementById("reservation-panel-available");
  const costPerHead = document.getElementById("reservation-person-cost");
  console.log("true or false", adventure["available"])

  if (adventure.available==true) {
    soldOutPanel.style.display = "none";
    availablePanel.style.display = "block";
    costPerHead.textContent = adventure["costPerHead"]
  }
  else {
    availablePanel.style.display = "none";
    soldOutPanel.style.display = "block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const total = adventure["costPerHead"] * persons;
  const reservationCost = document.getElementById("reservation-cost");
  reservationCost.innerHTML = total;
}

//Implementation of reservation form submission
function captureFormSubmit(adventures) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  // console.log("adventure in captureFormSubmit->", adventure)
  const myForm = document.getElementById("myForm")
  // console.log("name:->", myForm.elements["name"].value)

  myForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = myForm.elements["name"].value; //to get value from name attribute input tag
    const date = myForm.elements["date"].value;
    const person = myForm.elements["person"].value;
    const adventure = adventures.id;

    const data = {
      name,
      date,
      person,
      adventure
    };

    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    };

    try {
      let response = await fetch(`${config.backendEndpoint}/reservations/new`, options);
      if (!response.ok) {
        throw new Error("Failed!")
      } else {
        alert("sucess")
        window.location.reload();
      }
    } catch (er) {
      alert(er);
    }
  });

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  console.log("check->", adventure)
  if(adventure["reserved"]){
    document.getElementById("reserved-banner").style.display = 'block';
  } 
  else{
    document.getElementById("reserved-banner").style.display = 'none';
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
