const API_KEY = "2dcff64eb6762205b3aad7874d975979";  

async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const weatherInfo = document.getElementById("weatherInfo");
    const errorMsg = document.getElementById("errorMsg");

    if (city === "") {
        errorMsg.textContent = "Please enter a city name.";
        errorMsg.classList.remove("hidden");
        weatherInfo.classList.add("hidden");
        return;
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        document.getElementById("cityName").textContent = `📍 ${data.name}`;
        document.getElementById("temperature").textContent = `🌡️ Temperature: ${data.main.temp}°C`;
        document.getElementById("description").textContent = `☁️ ${data.weather[0].description}`;
        document.getElementById("wind").textContent = `💨 Wind Speed: ${data.wind.speed} m/s`;

        weatherInfo.classList.remove("hidden");
        errorMsg.classList.add("hidden");

    } catch (error) {
        errorMsg.textContent = "City not found. Try again!";
        errorMsg.classList.remove("hidden");
        weatherInfo.classList.add("hidden");
    }
}
