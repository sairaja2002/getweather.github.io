let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let cityRef = document.getElementById("city");
cityRef.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("search-btn").click();
    }
  });
let getWeather = () => {
    let cityValue = cityRef.value;
    if(cityValue.length == 0) {
        result.innerHTML = `<h3 class="msg">Please enter a city name</h3>`
    }
    else{
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;
        cityRef.value = ""
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
            console.log(data);
            console.log(data.weather[0].icon);
            console.log(data.weather[0].main);
            console.log(data.weather[0].description);
            console.log(data.name);
            console.log(data.main.temp_min);
            console.log(data.main.temp_max);
            if(data.weather[0].main === 'Smoke' ){
                document.body.style.backgroundImage = "url('smoke.png')"
            }
            else if(data.weather[0].main === 'Clouds' ){
                document.body.style.backgroundImage = "url('cloudy.png')"
            }
            else if(data.weather[0].main === 'Clear' ){
                document.body.style.backgroundImage = "url('clearsky.jpg')"
            }
            else if(data.weather[0].main === 'Rain' ){
                document.body.style.backgroundImage = "url('Rain.jpg')"
            }
            else if(data.weather[0].main === 'Thunderstorm' ){
                document.body.style.backgroundImage = "url('Thunderstorm.jpg')"
            }
            else if(data.weather[0].main === 'Snow' ){
                document.body.style.backgroundImage = "url('snow.png')"
            }
            else if(data.weather[0].main === 'Fog' ){
                document.body.style.backgroundImage = "url('fog.png')"
            }
            else if(data.weather[0].main === 'Haze' || data.weather[0].main === 'Mist'){
                document.body.style.backgroundImage = "url('Haze.png')"
            }
            result.innerHTML = `
            <h2>${data.name}</h2>
            <h4 class="weather">${data.weather[0].main}</h4>
            <h4 class="desc">${data.weather[0].description}</h4>
            <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
            <h1>${data.main.temp} &#176</h1>
            <div class="temp-container">
                <div>
                    <h4 class="title">min</h4>
                    <h4 class="temp">${data.main.temp_min}</h4>
                </div>
                <div>
                    <h4 class="title">max</h4>
                    <h4 class="temp">${data.main.temp_max}</h4>
                </div>
            </div>
            `;
            
        })

        .catch(()=>{
            result.innerHTML = `<h3 class="msg">City not found</h3>`;
        })
    }
};
searchBtn.addEventListener("click",getWeather);
window.addEventListener("load",getWeather);