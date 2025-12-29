const form = document.getElementById("weatherForm");
const formValue = document.getElementById("txtValue");
const btn1 = document.getElementById("btn");
const weatherIcon = document.getElementById("weatherIcon");
const description = document.getElementById("description");
const weather = document.getElementById("weather");
const humidityTxt = document.getElementById("humidityTxt");
const windTxt = document.getElementById("windTxt");
const errorShow = document.getElementById("errorShow");
const videoId = document.getElementById("bgVideo");


async function addWeather(txt) {
    errorShow.innerHTML = "";
    weather.innerHTML = "---";
    description.innerHTML = "---";
    humidityTxt.innerHTML = "---";
    windTxt.innerHTML = "---";
    weatherIcon.innerHTML = "---"
    try {
        const apiKey = "085b2876e88e07e48e7b40b49853c804";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${txt}&appid=${apiKey}`;

        const location = await fetch(`${url}`)

        if (!location.ok) {
            throw new Error(`Response status: ${location.status}`);
        }

        let response = await location.json();


        let icon = response.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        let video = response.weather[0].main.toLowerCase();
        videoId.src = `./video/${video}.mp4`;
        videoId.load();
        videoId.play();





        weather.innerHTML = `${Math.round(response.main.temp - 273.15)}°C`;
        description.innerHTML = `${response.weather[0].description}`;
        humidityTxt.innerHTML = `${response.main.humidity}%`;
        windTxt.innerHTML = `${response.wind.speed} km/H`
    } catch (error) {

        errorShow.innerHTML = `
        <div class="error">
                        <h1 id="error">Something Went Wrong : ${error.message}</h1>
                    </div>`
    }





}



form.addEventListener('submit', (e) => {
    e.preventDefault();
    addWeather(formValue.value);

})
