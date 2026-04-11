let now= new Date
let days=[
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

if (minutes < 10) {
    minutes = "0" + minutes;
}

let currentTime = `${day} ${hours}:${minutes}`;
document.querySelector("#current-date").innerHTML = currentTime;
let userForm= document.querySelector("#user-form")
userForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    let input= document.querySelector("#city-input")
    let city= input.value
    let cityName= document.querySelector("#city-name")
    cityName.innerHTML=city

    let sheApis = `https://api.shecodes.io/weather/v1/current?query=${city}&units=metric&key=65foc199tb00f3ddbce1a005364275f2`;

    axios.get(sheApis).then((res) => {
        let temp = Math.round(res.data.temperature.current);

        let timeStamp= res.data.time*1000
        let date= new Date(timeStamp)
        let days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        let day= days[date.getDay()]
        let hours=date.getHours()
        let minutes= date.getMinutes()
        if(minutes<10){
            minutes= "0"+minutes
        }

        let beTime= `${day} ${hours}:${minutes}`
        let currentDate= document.querySelector("#current-date")
        currentDate.innerHTML=beTime|| currentTime


        let iconCode = res.data.condition.icon;

        let weatherIcons = {
            "clear-sky-day": "☀️",
            "few-clouds-day": "🌤️",
            "scattered-clouds-day": "☁️",
            "broken-clouds-day": "☁️",
            "rain-day": "🌧️",
            "shower-rain-day": "🌧️",
            "thunderstorm-day": "⛈️",
            "snow-day": "❄️",
            "mist-day": "🌫️"
        };

        let icon = weatherIcons[iconCode] || "☀️";
        let deg = document.querySelector(".deg");
        deg.innerHTML = ` ${icon} ${temp}°<span class="unit">C</span>`;
    });


})