document.addEventListener("DOMContentLoaded", function () {
  window.onload = getTimeAndDay();

  function getTimeAndDay() {
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

    return { formattedDate, day: day };
  }

  let dropDown = document.querySelector(".countryDropdown");

  dropDown.addEventListener("change", function () {
    let selectedCountry = this.value;

    fetch(`https://countriesnow.space/api/v0.1/countries`)
      .then((response) => response.json())
      .then((data) => {
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
          let apiTimeout;
          apiTimeout = setTimeout(function () {
            alert("Check your VPN connection. The request is taking too long.");
            // Optionally, you can cancel the ongoing request here if needed
          }, 5000);
          let selectedCity = this.value;
          console.log("Selected city:", selectedCity);

          let apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=8e3a2a46298b4259a1661406231109&q=${selectedCity}&days=2&aqi=yes&alerts=no`;

          fetch(apiUrl)
            .then((response) => {
              if (!response.ok) {
                console.log("none");
                let notfoundError = (document.querySelector(
                  ".not-found"
                ).style.display = "block");

                throw new Error(
                  `Network response was not ok. Status: ${response.status} - ${response.statusText}`
                );
              }
              return response.json();
            })
            .then((data) => {
              if (apiTimeout) {
                clearTimeout(apiTimeout); // Clear the timeout if there's an error
              }
              let notfoundError = (document.querySelector(
                ".not-found"
              ).style.display = "none");
              let weatherDataElement = document.getElementById("weather");
              const temperature = data.current.temp_c;
              const condition = data.current.condition.text;
              let name = data.location.name;
              let country = data.location.country;

              let nameElement = document.querySelector(".city");
              nameElement.textContent = name;

              let countryElement = document.querySelector(".country");
              countryElement.textContent = country;

              weatherDataElement.textContent = `Temperature: ${temperature}°C, Condition: ${condition}`;

              let weatherDegreeElement = document.querySelector(".degree");

              const weatherDegree = data.current.temp_c;
              const formattedWeatherDegree = Math.round(weatherDegree) + "°C";

              weatherDegreeElement.textContent = formattedWeatherDegree;

              //Day Degree

              let dayDegree = document.querySelector("#degreeDay");
              let dayDegreeImage = document.querySelector("#degreeDayImage");

              const { formattedDate } = getTimeAndDay();
              console.log(`${formattedDate} 09:00`);

              let specificTimeDay = `${formattedDate} 09:00`;
              let hourDataDay = data.forecast.forecastday[0].hour.find(
                (data) => data.time === specificTimeDay
              );

              if (hourDataDay) {
                let tommorowTemperature = hourDataDay.temp_c;
                let formattedWeatherForecast = Math.round(tommorowTemperature);
                console.log(`Temperature (Celsius): ${hourDataDay.temp_c}`);
                console.log(`Condition is: ${hourDataDay.condition.text}`);
                dayDegree.textContent = `${formattedWeatherForecast}°C`;
                dayDegreeImage.src = hourDataDay.condition.icon;
              } else {
                console.log(`Nothing found!`);
              }

              //Night Degree

              let nightDegree = document.querySelector("#degreeNight");
              let nightDegreeImage =
                document.querySelector("#degreeNightImage");

              console.log(`${formattedDate} 21:00`);

              let specificTimeNight = `${formattedDate} 21:00`;
              let hourDataNight = data.forecast.forecastday[0].hour.find(
                (data) => data.time === specificTimeNight
              );

              if (hourDataNight) {
                let tommorowTemperatureNight = hourDataNight.temp_c;
                let formattedWeatherForecastNight = Math.round(
                  tommorowTemperatureNight
                );
                console.log(`Temperature (Celsius): ${hourDataNight.temp_c}`);
                console.log(`Condition is: ${hourDataNight.condition.text}`);
                nightDegree.textContent = `${formattedWeatherForecastNight}°C`;
                nightDegreeImage.src = hourDataNight.condition.icon;
              } else {
                console.log(`Nothing found!`);
              }

              // Tommorow Degree

              let tomorrowDegree = document.querySelector("#degreeTommorow");
              let tomorrowDegreeImage = document.querySelector(
                "#degreeTommorowImage"
              );

              const { day } = getTimeAndDay();

              const tomorrow = new Date();
              tomorrow.setDate(day + 1);

              const year = tomorrow.getFullYear();
              const month = tomorrow.getMonth() + 1;
              const formattedDateTomorrow = `${year}-${month
                .toString()
                .padStart(2, "0")}-${tomorrow
                .getDate()
                .toString()
                .padStart(2, "0")}`;

              console.log(`${formattedDateTomorrow} 16:00`);

              let specificTimeTomorrow = `${formattedDateTomorrow} 16:00`;
              let hourDataTomorrow = data.forecast.forecastday[1].hour.find(
                (data) => data.time === specificTimeTomorrow
              );

              if (hourDataTomorrow) {
                let tommorowTemperatureNight = hourDataTomorrow.temp_c;
                let formattedWeatherForecastTomorrow = Math.round(
                  tommorowTemperatureNight
                );
                console.log(
                  `Temperature (Celsius): ${hourDataTomorrow.temp_c}`
                );
                console.log(`Condition is: ${hourDataTomorrow.condition.text}`);
                tomorrowDegree.textContent = `${formattedWeatherForecastTomorrow}°C`;
                tomorrowDegreeImage.src = hourDataTomorrow.condition.icon;
              } else {
                console.log(`Nothing found!`);
              }

              closePopUp();
            })
            .catch((error) => {
              console.error("Fetch error:", error);
              if (apiTimeout) {
                clearTimeout(apiTimeout); // Clear the timeout if there's an error
              }
              // alert("Please check your connection and use a VPN");

              selectBox.appendChild(connectionError);
            });
        });
      })

      .catch((error) => {
        console.error("Fetch Error:", error);
      });
  });

  fetch("https://countriesnow.space/api/v0.1/countries")
    .then((response) => response.json())
    .then((data) => {
      let dropDown = document.querySelector(".countryDropdown");

      let countryName = [];
      data.data.forEach((country) => {
        countryName.push(country.country);
      });

      countryName.sort();

      countryName.forEach((name) => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name.charAt(0).toUpperCase() + name.slice(1);
        dropDown.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Fetch Error:", error);
    });

  const chooseCountry = document.querySelector("#chooseCountry");
  const popupcontent = document.querySelector("#popupcontent");
  const save = document.querySelector("#save");

  save.addEventListener("click", function () {
    let searchCity = document.querySelector("#searchCity").value;

    let selectedCity = searchCity;

    if (searchCity === "") {
      alert("Please enter a name of city");
    }

    let apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=8e3a2a46298b4259a1661406231109&q=${selectedCity}&days=2&aqi=yes&alerts=no`;

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
        let temperature = data.current.temp_c;
        let condition = data.current.condition.text;
        let name = data.location.name;
        let country = data.location.country;

        let nameElement = document.querySelector(".city");
        nameElement.textContent = name;

        let countryElement = document.querySelector(".country");
        countryElement.textContent = country;

        weatherDataElement.textContent = `Temperature: ${temperature}°C, Condition: ${condition}`;

        let weatherDegreeElement = document.querySelector(".degree");

        let weatherDegree = data.current.temp_c;
        let formattedWeatherDegree = Math.round(weatherDegree) + "°C";

        weatherDegreeElement.textContent = formattedWeatherDegree;

        //Day Degree

        let dayDegree = document.querySelector("#degreeDay");
        let dayDegreeImage = document.querySelector("#degreeDayImage");

        const { formattedDate } = getTimeAndDay();
        console.log(`${formattedDate} 09:00`);

        let specificTimeDay = `${formattedDate} 09:00`;
        let hourDataDay = data.forecast.forecastday[0].hour.find(
          (data) => data.time === specificTimeDay
        );

        if (hourDataDay) {
          let tommorowTemperature = hourDataDay.temp_c;
          let formattedWeatherForecast = Math.round(tommorowTemperature);
          console.log(`Temperature (Celsius): ${hourDataDay.temp_c}`);
          console.log(`Condition is: ${hourDataDay.condition.text}`);
          dayDegree.textContent = `${formattedWeatherForecast}°C`;
          dayDegreeImage.src = hourDataDay.condition.icon;
        } else {
          console.log(`Nothing found!`);
        }

        //Night Degree

        let nightDegree = document.querySelector("#degreeNight");
        let nightDegreeImage = document.querySelector("#degreeNightImage");

        console.log(`${formattedDate} 21:00`);

        let specificTimeNight = `${formattedDate} 21:00`;
        let hourDataNight = data.forecast.forecastday[0].hour.find(
          (data) => data.time === specificTimeNight
        );

        if (hourDataNight) {
          let tommorowTemperatureNight = hourDataNight.temp_c;
          let formattedWeatherForecastNight = Math.round(
            tommorowTemperatureNight
          );
          console.log(`Temperature (Celsius): ${hourDataNight.temp_c}`);
          console.log(`Condition is: ${hourDataNight.condition.text}`);
          nightDegree.textContent = `${formattedWeatherForecastNight}°C`;
          nightDegreeImage.src = hourDataNight.condition.icon;
        } else {
          console.log(`Nothing found!`);
        }

        // Tommorow Degree

        let tomorrowDegree = document.querySelector("#degreeTommorow");
        let tomorrowDegreeImage = document.querySelector(
          "#degreeTommorowImage"
        );

        const { day } = getTimeAndDay();

        const tomorrow = new Date();
        tomorrow.setDate(day + 1);

        const year = tomorrow.getFullYear();
        const month = tomorrow.getMonth() + 1;
        const formattedDateTomorrow = `${year}-${month
          .toString()
          .padStart(2, "0")}-${tomorrow.getDate().toString().padStart(2, "0")}`;

        console.log(`${formattedDateTomorrow} 16:00`);

        let specificTimeTomorrow = `${formattedDateTomorrow} 16:00`;
        let hourDataTomorrow = data.forecast.forecastday[1].hour.find(
          (data) => data.time === specificTimeTomorrow
        );

        if (hourDataTomorrow) {
          let tommorowTemperatureNight = hourDataTomorrow.temp_c;
          let formattedWeatherForecastTomorrow = Math.round(
            tommorowTemperatureNight
          );
          console.log(`Temperature (Celsius): ${hourDataTomorrow.temp_c}`);
          console.log(`Condition is: ${hourDataTomorrow.condition.text}`);
          tomorrowDegree.textContent = `${formattedWeatherForecastTomorrow}°C`;
          tomorrowDegreeImage.src = hourDataTomorrow.condition.icon;
        } else {
          console.log(`Nothing found!`);
        }

        closePopUp();
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  });

  function openPopup() {
    document.querySelector(".popup").style.display = "flex";
  }

  function closePopUp() {
    document.querySelector(".popup").style.display = "none";
  }

  let searchCity = document.querySelector("#searchCity");
  let searchCityClass = document.querySelector(".searchCity");
  let searchCityLabel = document.querySelector("#searchCitylabel");
  let searchCityLabelText = document.querySelector("#searchCitylabeltext");
  let cityDropDown = document.querySelector(".cityDropdown");
  let searchBox = document.querySelector(".inp");
  let searchBoxSpan = document.querySelector("#inp");
  let searchBoxInput = document.querySelector(".label-search");
  let searchBoxbg = document.querySelector(".focus-bg");
  let searchCityLabelInput = document.querySelector(".searchCityLabelInput");
  let labelSearch = document.querySelector(".label");
  let labelSearchCity = document.querySelector("#cityLabel");
  document.addEventListener("click", function (event) {
    if (
      event.target !== dropDown &&
      event.target !== chooseCountry &&
      event.target !== popupcontent &&
      event.target !== save &&
      event.target !== cityDropDown &&
      event.target !== searchCity &&
      event.target !== searchCityLabel &&
      event.target !== searchCityLabelText &&
      event.target !== searchBox &&
      event.target !== searchBoxInput &&
      event.target !== searchBoxbg &&
      event.target !== searchBoxSpan &&
      event.target !== searchCityClass &&
      event.target !== searchCityLabelInput &&
      event.target !== iconClick &&
      event.target !== labelSearch &&
      event.target !== labelSearchCity
    ) {
      event.preventDefault();
      closePopUp();
    }
  });

  let iconClick = document.querySelector("#iconClick");
  chooseCountry.addEventListener("click", openPopup);
  iconClick.addEventListener("click", openPopup);
});
