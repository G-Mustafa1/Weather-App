const contanir = document.getElementById('contanir');
const input = document.getElementById('input');
const btn = document.getElementById('btn');
const not_found = document.getElementById('not-found');
const contanir_2 = document.getElementById('contanir-2')
const img = document.getElementById('img');
const tem = document.getElementById('tem');
const temd = document.getElementById('detail');
const city_nam = document.getElementById('Cit-nam');
const hum = document.getElementById('hum');
const humd = document.getElementById('humd');
const wind = document.getElementById('wind');
const windd = document.getElementById('windd');

async function checkweather(city) {
   console.log(city)
   const api_key = '57be7089208c26eab9db6ee4e4292b4b';
   const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

   const weather_data = fetch(api_url);
   // asyn methode
   const data = await weather_data;
   const res = await data.json();

   if (res.cod == '404') {
      Swal.fire({
         title: "404",
         text: res.message,
         icon: "error"
      });
      not_found.style.display = 'flex'
      contanir_2.classList.remove('contanir-2');
      contanir_2.classList.add('contanir-3');
      img.style.filter = 'drop-shadow(10px 10px 5px #d3d3d3)';
      contanir.classList.remove('contanir');
      contanir.classList.add("chw");
   }
   else{
      not_found.style.display = 'none';
      contanir_2.classList.remove('contanir-3');
      contanir_2.classList.add('contanir-2')
   }

   console.log(res)
   tem.innerText = `${Math.round(res.main.temp - 273.15)}`;
   temd.innerText = `${res.weather[0].description}`;
   city_nam.innerText = `${res.name}`;
   hum.innerText = `${res.main.humidity}%`;
   wind.innerText = `${res.wind.speed}Km/H`;

   switch (res.weather[0].main) {
       case 'Smoke':
         img.src = 'img/smoke.png';
          break;
      case 'Haze':
         img.src = 'img/haze.png';
         break;
      case 'Clouds':
         img.src = 'img/cloud.png';
         break;
      case 'Clear':
         img.src = 'img/clear.png';
         break;
      case 'Rain':
         img.src = 'img/rain.png';
         break;
      case 'Mist':
         img.src = 'img/mist.png';
         break;
      case 'Snow':
         img.src = 'img/snow.png';
         break;

   };
   // img.style.backgroundColor = 'blue'
   img.style.filter = 'drop-shadow(10px 10px 5px #d3d3d3)'
   contanir.classList.remove('contanir')
   contanir.classList.add("chw")

   // .then methode
   // weather_data.then((res) => {
   //    return res.json()
   // }).then((res1) => {
   //    console.log(res1)
   // })
   // console.log(weather_data)
}
btn.addEventListener('click', check)

function check() {
   // input.;
   if (!input.value.trim() || !isNaN(input.value)) {
      Swal.fire({
         title: "Error",
         text: "Please enter a city name",
         icon: "error"
      });
   }
   else {
      checkweather(input.value)
   }
   input.value = ""
}

input.addEventListener('keypress', (e) => {
   if (e.key == 'Enter') {
      return check()
   }
})
