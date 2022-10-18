import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{const response = await fetch(`${config.backendEndpoint}/reservations/`);
  const result = await response.json();
  console.log("s->", result);
  return result;}
  catch(err){
    return null;
  }

  // Place holder for functionality to work in the Stubs
  
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  // console.log("hello");
  
  console.log("reser->", reservations);

  //Conditionally render the no-reservation-banner and reservation-table-parent
  const noResevation = document.getElementById("no-reservation-banner");
  const yesReservation = document.getElementById("reservation-table-parent");
  const reservationTableDom = document.getElementById("reservation-table");

  if(reservations.length == 0){
    noResevation.style.display = "block";
    yesReservation.style.display = "none";
  }
  else {
    // console.log("hello",)
    yesReservation.style.display = "block";
    noResevation.style.display = "none";

    reservations.forEach(item => {
      
      const d = new Date(item.time);
      let options = {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
      }
      let textDate = d.toLocaleString('en-IN', options);
      
      const tr = document.createElement("tr");
      tr.innerHTML =
        `
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.adventureName}</td>
        <td>${item.person}</td>
        <td>${new Date(item.date).toLocaleDateString("en-IN")}</td>
        <td>${item.price}</td>
        <td>${textDate}</td>
        <td><div class="reservation-visit-button" id="${item.id}"><a href="../detail/?adventure=${item.adventure}">Visit Adventure</a></div></td>
        `
      reservationTableDom.appendChild(tr)
    })
  }
  

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
