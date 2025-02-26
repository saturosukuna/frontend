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
        console.log(data.json);

        document.getElementById("cityName").innerText = `${data.name}, ${data.sys.country}`;
        document.getElementById("temperature").innerText = ` ${data.main.temp}°C (Feels like: ${data.main.feels_like}°C)`;
        document.getElementById("description").innerText = `${data.weather[0].description}`;
        document.getElementById("wind").innerText = `${data.wind.speed} m/s, Direction: ${data.wind.deg}°`;
        document.getElementById("coordinates").innerText = `lat - ${data.coord.lat}, lang - ${data.coord.lon}`;
        document.getElementById("pressure").innerText = `${data.main.pressure} hPa`;
        document.getElementById("Humidity").innerText = `${data.main.humidity}%`;
        document.getElementById("sunrise").innerText = ` ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;
        document.getElementById("sunset").innerText = `${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;
        document.getElementById("visibility").innerText = `${data.visibility / 1000} km`;
        document.getElementById("cloudiness").innerText = `${data.clouds.all}%`;

        

        weatherInfo.classList.remove("hidden");
        errorMsg.classList.add("hidden");

    } catch (error) {
        errorMsg.textContent = "City not found. Try again!";
        errorMsg.classList.remove("hidden");
        weatherInfo.classList.add("hidden");
    }
}
