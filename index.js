function searchCity(cityInput) {
    let cityName = document.querySelector("#city-name");

    let sheApis =
        `https://api.shecodes.io/weather/v1/current?query=${cityInput}&units=metric&key=65foc199tb00f3ddbce1a005364275f2`;

    axios.get(sheApis).then((res) => {
        let temp = Math.round(res.data.temperature.current);
        cityName.innerHTML = res.data.city;

        let timeStamp = res.data.time * 1000;
        let date = new Date(timeStamp);

        let days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];

        let day = days[date.getDay()];
        let hours = date.getHours();
        let minutes = date.getMinutes();

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        let currentTime = `${day} ${hours}:${minutes}`;
        document.querySelector("#current-date").innerHTML = currentTime;
        console.log("API time:", res.data.time);
        console.log("Rendered time:", currentTime);

        document.querySelector("#description").innerHTML =
            res.data.condition.description;

        document.querySelector("#humidity").innerHTML =
            `${res.data.temperature.humidity}%`;

        document.querySelector("#wind").innerHTML =
            `${res.data.wind.speed} M\S`;

        let iconUrl = res.data.condition.icon_url;

        document.querySelector(".deg").innerHTML =
            `<img src="${iconUrl}" alt="${res.data.condition.description}" width="60" />
           ${temp}°<span class="unit">C</span>`;

        let forecastApi = `https://api.shecodes.io/weather/v1/forecast?query=${res.data.city}&units=metric&key=65foc199tb00f3ddbce1a005364275f2`;

        axios.get(forecastApi).then((response) => {
            let forecastHtml = "";

            response.data.daily.forEach((day, index) => {
                if (index < 5) {
                    let forecastDate = new Date(day.time * 1000);
                    let forecastDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

                    forecastHtml += `
                        <div class="forecast-day">
                            <div class="forecast-date">${forecastDays[forecastDate.getDay()]}</div>
                            <div class="forecast-icon"> 
                             <img src="${day.condition.icon_url}" alt="${day.condition.description}" width="42" /></div>
                            <div class="forecast-temperatures">
                                <div class="forecast-temperature">
                                    <strong>${Math.round(day.temperature.maximum)}°</strong>
                                </div>
                                <div class="forecast-temperature">${Math.round(day.temperature.minimum)}°</div>
                            </div>
                        </div>
                    `;
                }
            });

            document.querySelector("#weather-forecast").innerHTML = forecastHtml;
        });
    });
}

let userForm = document.querySelector("#user-form");

userForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let input = document.querySelector("#city-input");
    searchCity(input.value);
});

searchCity("Nairobi");