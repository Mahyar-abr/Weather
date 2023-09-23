document.addEventListener("DOMContentLoaded", function () {
  window.onload = function () {
    const today = new Date();
    let date = document.querySelector(".today");
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = daysOfWeek[today.getDay()];
    date.textContent = `${dayOfWeek}`;

    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-based, so add 1
    const day = today.getDate();

    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
    let weekDayElement = document.getElementById("weekDay");
    weekDayElement.textContent = formattedDate;
  };

  let dropDown = document.querySelector(".countryDropdown");

  dropDown.addEventListener("change", function () {
    let selectedCountry = this.value;

    // let apiUrl = `https://api.weatherapi.com/v1/current.json?key=190e2717cf5f408e890130520231109&q=${selectedCountry}&aqi=yes`;

    // fetch(apiUrl)
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error(
    //         `Network response was not ok. Status: ${response.status} - ${response.statusText}`
    //       );
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     let weatherDataElement = document.getElementById("weather");
    //     const temperature = data.current.temp_c;
    //     const condition = data.current.condition.text;

    //     weatherDataElement.textContent = `Temperature: ${temperature}°C, Condition: ${condition}`;

    //     let weatherDegreeElement = document.querySelector(".degree");

    //     const weatherDegree = data.current.temp_c;
    //     const formattedWeatherDegree = weatherDegree
    //       .toFixed()
    //       .replace(/\.0+$/, "");

    //     weatherDegreeElement.textContent = formattedWeatherDegree;
    //   })
    //   .catch((error) => {
    //     console.error("Fetch error:", error);
    //   });

    fetch(`https://countriesnow.space/api/v0.1/countries`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming you have a dropdown element with class "cityDropdown"
        let cityDropdown = document.querySelector(".cityDropdown");
        cityDropDown.innerHTML = "";

        let selectedCountryData = data.data.find(
          (countryData) => countryData.country === selectedCountry
        );

        if (selectedCountryData && selectedCountryData.cities) {
          selectedCountryData.cities.forEach((city) => {
            const option = document.createElement("option");
            option.value = city;
            option.textContent = city;
            cityDropdown.appendChild(option);
          });
        } else {
          const option = document.createElement("option");
          option.textContent = "No cities found";
          cityDropdown.appendChild(option);
        }

        cityDropdown.addEventListener("change", function () {
          let selectedCity = this.value;
          console.log("Selected city:", selectedCity);

          let apiUrl = `https://api.weatherapi.com/v1/current.json?key=190e2717cf5f408e890130520231109&q=${selectedCity}&aqi=yes`;

          fetch(apiUrl)
            .then((response) => {
              if (!response.ok) {
                throw new Error(
                  `Network response was not ok. Status: ${response.status} - ${response.statusText}`
                );
              }
              return response.json();
            })
            .then((data) => {
              let weatherDataElement = document.getElementById("weather");
              const temperature = data.current.temp_c;
              const condition = data.current.condition.text;

              weatherDataElement.textContent = `Temperature: ${temperature}°C, Condition: ${condition}`;

              let weatherDegreeElement = document.querySelector(".degree");

              const weatherDegree = data.current.temp_c;
              const formattedWeatherDegree = Math.round(weatherDegree) + "°C";

              weatherDegreeElement.textContent = formattedWeatherDegree;
            })
            .catch((error) => {
              console.error("Fetch error:", error);
            });
          // Use the selectedCity value here for further processing
        });
      })

      .catch((error) => {
        console.error("Fetch Error:", error);
      });
  });

  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      let dropDown = document.querySelector(".countryDropdown");
      data.forEach((country) => {
        const option = document.createElement("option");
        option.value = country.name.common;
        option.textContent = country.name.common;
        dropDown.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Fetch Error:", error);
    });

  const chooseCountry = document.querySelector("#chooseCountry");
  const popupcontent = document.querySelector("#popupcontent");
  const save = document.querySelector("#save");

  function openPopup() {
    document.querySelector(".popup").style.display = "flex";
  }

  function closePopUp() {
    document.querySelector(".popup").style.display = "none";
  }

  let cityDropDown = document.querySelector(".cityDropdown");
  document.addEventListener("click", function (event) {
    if (
      event.target !== dropDown &&
      event.target !== chooseCountry &&
      event.target !== popupcontent &&
      event.target !== save &&
      event.target !== cityDropDown
    ) {
      event.preventDefault();
      closePopUp();
    }
  });

  chooseCountry.addEventListener("click", openPopup);
});
