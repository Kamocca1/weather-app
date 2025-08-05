const container = document.querySelector(".container");
const search = document.querySelector("#search-bar");
const btn = document.querySelector("#button-button");

btn.addEventListener("click", getWeather);

// const img = document.querySelector('img');
//         img.style.display = 'block'

async function getWeather(location) {
    try {
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=GY79WBX97QUTQYVK65DJ776AP&contentType=json`;
        const response = await fetch(url, { mode: "cors" });
        console.log("Response", response);
        const result = await response.json();
        console.log("Result", result);
        // img.src = result.data.images.original.url;
    } catch (error) {
        console.error(error.message);
    }
}
