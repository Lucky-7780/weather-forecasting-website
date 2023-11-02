const input = document.getElementById("autocomplete-input");
const dropdown = document.getElementById("autocomplete-dropdown");
const countries = document.querySelectorAll(".autocomplete-dropdown li");

// Function to fetch weather details using OpenWeatherMap API
async function getWeatherDetails(location) {
  const apiKey = 'e6c9578510a72c82032b9b54ad98b746';
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}

input.addEventListener("input", function () {
  const filter = input.value.toLowerCase();

  for (const country of countries) {
    if (country.innerText.toLowerCase().includes(filter)) {
      country.style.display = "block";
    } else {
      country.style.display = "none";
    }
  }

  if (filter === "") {
    dropdown.style.display = "none";
  } else {
    dropdown.style.display = "block";
  }
});

countries.forEach((country) => {
  country.addEventListener("click", async function () {
    input.value = country.innerText;
    dropdown.style.display = "none";

    // Get weather details
    const location = country.innerText;
    const weatherData = await getWeatherDetails(location);

    if (weatherData) {
      
      document.getElementById("loc").textContent = location;
      document.getElementById("temperature").textContent = weatherData.main.temp;
      document.getElementById("weather").textContent = weatherData.weather[0].description;
      document.getElementById("windspeed").textContent = weatherData.wind.speed;
      document.getElementById("humidity").textContent = weatherData.main.humidity;
    }
  });
});
