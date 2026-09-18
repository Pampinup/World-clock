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

function updateCountry(countryTimezone) {
  let cityName = countryTimezone.split("/").pop().replace(/_/g, " ");

  let countryTime = moment().tz(countryTimezone);

  let citySelect = document.querySelector("#cities");

  citySelect.innerHTML = `
    <div class="display-city">
      <div>
        <h2>${cityName}</h2>

        <div class="date">
          ${countryTime.format("MMMM Do YYYY")}
        </div>
      </div>

      <div class="time">
        ${countryTime.format("hh:mm [<small>]A[</small>]")}
      </div>
    </div>
  `;
}

function getYourLocation() {
  const citiesElement = document.querySelector("#cities");

  if (!navigator.geolocation) {
    showTimezoneLocation();
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const timezone = moment.tz.guess();
      const localTime = moment.tz(timezone);

      try {
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
        );

        const data = await response.json();

        const city =
          data.city ||
          data.locality ||
          data.principalSubdivision ||
          getCityFromTimezone(timezone);

        citiesElement.innerHTML = `
          <div class="display-city">
            <div>
              <h2>
                ${city}

                <span class="material-symbols-outlined">
                  location_on
                </span>
              </h2>

              <div class="date">
                ${localTime.format("MMMM Do YYYY")}
              </div>
            </div>

            <div class="time">
              ${localTime.format("hh:mm [<small>]A[</small>]")}
            </div>
          </div>
        `;
      } catch (error) {
        showTimezoneLocation();
      }
    },

    function () {
      showTimezoneLocation();
    },
  );
}

function showTimezoneLocation() {
  const citiesElement = document.querySelector("#cities");

  const timezone = moment.tz.guess();
  const city = getCityFromTimezone(timezone);
  const localTime = moment.tz(timezone);

  citiesElement.innerHTML = `
    <div class="display-city">
      <div>
        <h2>
          ${city}

          <span class="material-symbols-outlined">
            location_on
          </span>
        </h2>

        <div class="date">
          ${localTime.format("MMMM Do YYYY")}
        </div>
      </div>

      <div class="time">
        ${localTime.format("hh:mm [<small>]A[</small>]")}
      </div>
    </div>
  `;
}

function getCityFromTimezone(timezone) {
  const timezoneCities = {
    "Europe/London": "London",
    "Europe/Brussels": "Brussels",
    "Europe/Dublin": "Dublin",
    "Europe/Paris": "Paris",
    "Europe/Madrid": "Madrid",
    "America/Toronto": "Toronto",
    "America/New_York": "New York",
    "America/Chicago": "Texas",
    "Pacific/Honolulu": "Honolulu",
    "America/Caracas": "Caracas",
    "Australia/Sydney": "Sydney",
    "Asia/Seoul": "Seoul",
    "Asia/Tokyo": "Tokyo",
    "Asia/Singapore": "Singapore",
    "Asia/Kuala_Lumpur": "Kuala Lumpur",
  };

  return (
    timezoneCities[timezone] || timezone.split("/").pop().replace(/_/g, " ")
  );
}

/* =========================================
   CUSTOM CITY SELECTOR
   ========================================= */

const citySelector = document.querySelector("#city-selector");
const citySelectorButton = document.querySelector("#city-selector-button");
const citySelectorMenu = document.querySelector("#city-selector-menu");
const selectedCity = document.querySelector("#selected-city");
const citySelectorArrow = document.querySelector("#city-selector-arrow");

const cityOptions = document.querySelectorAll(".city-option");

function toggleCitySelector() {
  const isOpen = citySelector.classList.contains("open");

  if (isOpen) {
    closeCitySelector();
  } else {
    openCitySelector();
  }
}

function openCitySelector() {
  citySelector.classList.add("open");

  citySelectorButton.setAttribute("aria-expanded", "true");

  citySelectorArrow.textContent = "expand_less";
}

function closeCitySelector() {
  citySelector.classList.remove("open");

  citySelectorButton.setAttribute("aria-expanded", "false");

  citySelectorArrow.textContent = "expand_more";
}

function selectCity(option) {
  const timezone = option.dataset.value;

  if (!timezone) {
    selectedCity.textContent = "Select a city...";
    closeCitySelector();
    return;
  }

  const cityName = option.textContent.trim();

  selectedCity.textContent = cityName;

  cityOptions.forEach(function (cityOption) {
    cityOption.classList.remove("selected");
    cityOption.setAttribute("aria-selected", "false");
  });

  option.classList.add("selected");
  option.setAttribute("aria-selected", "true");

  updateCountry(timezone);

  closeCitySelector();
}

/* Open / close dropdown */

citySelectorButton.addEventListener("click", toggleCitySelector);

/* Select a city */

cityOptions.forEach(function (option) {
  option.addEventListener("click", function () {
    selectCity(option);
  });
});

/* Close when clicking outside */

document.addEventListener("click", function (event) {
  if (!citySelector.contains(event.target)) {
    closeCitySelector();
  }
});

/* Close with Escape */

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeCitySelector();
  }
});

/* =========================================
   INITIALIZE CLOCK
   ========================================= */

updateTime();

setInterval(updateTime, 1000);

/* =========================================
   YOUR LOCATION
   ========================================= */

let yourLocationButton = document.querySelector("#get-your-location");

yourLocationButton.addEventListener("click", getYourLocation);
