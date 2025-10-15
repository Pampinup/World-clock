function updateTime() {
  // Los Angeles
  let losAngelesElement = document.querySelector("#los-angeles");
  if (losAngelesElement) {
    let losAngelesDate = losAngelesElement.querySelector(".date");
    let losAngelesTime = losAngelesElement.querySelector(".time");
    losAngelesDate.innerHTML = moment
      .tz("America/Los_Angeles")
      .format("MMMM Do YYYY");
    losAngelesTime.innerHTML = moment
      .tz("America/Los_Angeles")
      .format("hh:mm:ss [<small>]A[</small>]");
  }
  // Beijing
  let beijingElement = document.querySelector("#beijing");
  if (beijingElement) {
    let beijingDate = beijingElement.querySelector(".date");
    let beijingTime = beijingElement.querySelector(".time");
    beijingDate.innerHTML = moment.tz("Asia/Shanghai").format("MMMM Do YYYY");
    beijingTime.innerHTML = moment
      .tz("Asia/Shanghai")
      .format("hh:mm:ss [<small>]A[</small>]");
  }
  // Barcelona
  let barcelonaElement = document.querySelector("#barcelona");
  if (barcelonaElement) {
    let barcelonaDate = barcelonaElement.querySelector(".date");
    let barcelonaTime = barcelonaElement.querySelector(".time");
    barcelonaDate.innerHTML = moment.tz("Europe/Madrid").format("MMMM Do YYYY");
    barcelonaTime.innerHTML = moment
      .tz("Europe/Madrid")
      .format("hh:mm:ss [<small>]A[</small>]");
  }
}

function updateCountry(event) {
  let countryTimezone = event.target.value;
  let cityName = countryTimezone.replace("_", " ").split("/")[1];
  let countryTime = moment().tz(countryTimezone);
  let citySelect = document.querySelector("#cities");
  citySelect.innerHTML = `
  <div class="display-city">
          <div>
            <h2>${cityName}</h2>
            <div class="date">${countryTime.format("MMMM Do YYYY")}</div>
          </div>
          <div class="time">${countryTime.format(
            "hh:mm:ss [<small>]A[</small>]"
          )}</div>
        </div>`;
}
function getYourLocation() {
  let localTime = document.querySelector("#cities");
  let timezone = moment.tz.guess();
  let cityName = timezone.replace("_", " ").split("/")[1];
  let here = moment.tz(timezone);
  localTime.innerHTML = `
  <div class="display-city">
          <div>
            <h2>In ${cityName} timezone <span class="material-symbols-outlined"> home_pin </span></h2>
            <div class="date">${here.format("MMMM Do YYYY")}</div>
          </div>
          <div class="time">${here.format(
            "hh:mm:ss [<small>]A[</small>]"
          )}</div>
        </div>`;
}
function updateBackground(event) {
  let countryTimezone = event.target.value;
  let containerElement = document.querySelector("#container-background");
  let nameCountry = countryTimezone
    .split("/")[1]
    .replace("_", " ")
    .toLowerCase();
  let nameCountryClass = nameCountry.replace(" ", "-");
  containerElement.classList.add(nameCountryClass);
}
updateTime();
setInterval(updateTime, 1000);
// Dropdown menu
let selectCountryElement = document.querySelector("#select-country");
selectCountryElement.addEventListener("change", updateCountry);
selectCountryElement.addEventListener("change", updateBackground);
// Your location
let yourLocationButton = document.querySelector("#get-your-location");
yourLocationButton.addEventListener("click", getYourLocation);
