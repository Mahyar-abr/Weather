document.addEventListener("DOMContentLoaded", function () {
  const today = new Date();
  const date = document.querySelector(".today");
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

  const weatherDataElement = document.getElementById("weather");

  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=190e2717cf5f408e890130520231109&q=London&aqi=yes`;

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
      const temperature = data.current.temp_c;
      const condition = data.current.condition.text;
      weatherDataElement.textContent = `Temperature: ${temperature}°C, Condition: ${condition}`;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
});
