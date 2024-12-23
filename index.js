let key = "50faab6ba192c63b0fe09c84b0ce4b4d";
let cityInput = document.querySelector("#input");
let btn = document.querySelector("#search-btn");
let city = document.querySelector("#city-name");
let weatherInfoCard = document.querySelector(".weather-info");
let temperature = document.querySelector("#temperature");
let descriptions = document.querySelector("#descriptions");
let errorMessage = document.querySelector("#error-msg");
let icon = document.querySelector(".weather-icon");

btn.addEventListener("click", () => {
    const cityValue = cityInput.value.trim(); // Trim whitespace
    if (cityValue) {
        getWeather(cityValue);
    }
});

async function getWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`);
        const data = await response.json(); // Await the JSON response

        if (response.ok) {
            // Display weather
            displayWeather(data);
        } else {
            // Show error
            showError(data.message);
        }
    } catch (error) {
        // Handle network errors
        showError("Failed to fetch weather data. Please try again later.");
    }
}

function displayWeather(data) {
    city.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `${Math.round(data.main.temp)}°C`; // Added °C for clarity
    descriptions.textContent = `${data.weather[0].description.toUpperCase()}`;
    const iconCode = data.weather[0].icon;
    icon.style.backgroundImage = `url(https://openweathermap.org/img/wn/${iconCode}@2x.png)`;

    weatherInfoCard.style.display = "block";
    errorMessage.textContent = "";
}

function showError(message) {
    errorMessage.textContent = message;
    weatherInfoCard.style.display = "none";
}