import "./style.css";

const container = document.querySelector(".container");
const tempF = document.querySelector(".temp-f");
const tempC = document.querySelector(".temp-c");
const condition = document.querySelector(".condition");
const iconDiv = document.querySelector(".icon");
const searchBar = document.querySelector("#search-bar");
const btn = document.querySelector("#search-button");

// Create loading component
const loadingDiv = document.createElement("div");
loadingDiv.textContent = "Loading...";
loadingDiv.style.display = "none";
loadingDiv.style.fontSize = "1.1rem";
loadingDiv.style.color = "#7ea9e1";
loadingDiv.style.margin = "12px 0";
loadingDiv.style.fontWeight = "500";
loadingDiv.className = "loading";

// Insert loadingDiv into the DOM, just before the temps div
const tempsDiv = document.querySelector(".temps");
container.insertBefore(loadingDiv, tempsDiv);

btn.addEventListener("click", getWeather);

async function getWeather() {
    try {
        // Show loading, hide previous data
        loadingDiv.style.display = "block";
        tempF.textContent = "";
        tempC.textContent = "";
        condition.textContent = "";
        iconDiv.style.display = "none";
        iconDiv.src = "";

        const location = searchBar.value;
        const urlWeather = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=GY79WBX97QUTQYVK65DJ776AP&contentType=json`;

        const responseWeather = await fetch(urlWeather, { mode: "cors" });
        // console.log("responseWeather", responseWeather);

        const resultWeather = await responseWeather.json();
        console.log("resultWeather", resultWeather);

        const conditions = resultWeather.currentConditions.conditions;
        // console.log(conditions);
        condition.textContent = `Condition: ${conditions}`;

        const temperatureF = Math.round(resultWeather.currentConditions.temp);
        // console.log(temperatureF);
        tempF.textContent = `Fahrenheit: ${temperatureF}`;

        const temperatureC = Math.round((temperatureF - 32) * (5 / 9));
        // console.log(temperatureC);
        tempC.textContent = `Celsius: ${temperatureC}`;

        const icon = resultWeather.currentConditions.icon;
        const urlIcon = `https://api.giphy.com/v1/gifs/translate?api_key=vjn4g2eRBSLj7izA6qVXMUXFEzpP5HQk&s=${icon}-weather`;

        const responseIcon = await fetch(urlIcon, { mode: "cors" });
        // console.log("responseIcon", responseIcon);

        const resultIcon = await responseIcon.json();
        // console.log("resultIcon", resultIcon);

        iconDiv.src = resultIcon.data.images.original.url;
        iconDiv.style.display = "block";
    } catch (error) {
        console.error(error.message);
        condition.textContent = "Error fetching weather data.";
    } finally {
        // Hide loading regardless of success or error
        loadingDiv.style.display = "none";
    }
}
