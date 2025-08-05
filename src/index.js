const container = document.querySelector(".container");
const tempF = document.querySelector(".temp-f");
const tempC = document.querySelector(".temp-c");
const searchBar = document.querySelector("#search-bar");
const btn = document.querySelector("#search-button"); // Corrected selector

btn.addEventListener("click", getWeather);

async function getWeather() {
    try {
        const location = searchBar.value;
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=GY79WBX97QUTQYVK65DJ776AP&contentType=json`;

        const response = await fetch(url, { mode: "cors" });
        console.log("Response", response);

        const result = await response.json();
        console.log("Result", result);

        const temperatureF = Math.round(result.currentConditions.temp);
        console.log(temperatureF);
        tempF.textContent = `Fahrenheit: ${temperatureF}`;

        const temperatureC = Math.round((temperatureF - 32) * (5 / 9));
        console.log(temperatureC);
        tempC.textContent = `Celsius: ${temperatureC}`;
    } catch (error) {
        console.error(error.message);
    }
}
