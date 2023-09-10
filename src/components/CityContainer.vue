<template>
  <!-- Banner -->
  <div v-if="route.query.preview" class="flex flex-col items-center bg-weather-secondary p-5">
    <div class="text-center text-white container mx-auto">You are currently preview this location. Press "+" icon to add it to collections</div>
  </div>
  <!-- Weather Card Overview -->
  <div class="flex flex-1 flex-col text-white bg-white bg-opacity-10 container my-3">
    <!-- main weather -->
    <div class="flex flex-1 flex-col items-center text-white py-12">
      <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
      <p class="text-sm">
        {{ new Date(runWeatherData.currentTime).toLocaleDateString("id", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) }}
        {{ new Date(runWeatherData.currentTime).toLocaleTimeString("id", { timeStyle: "short" }) }}
      </p>
      <div class="flex items-center gap-10 mb-4">
        <p class="text-6xl flex-1">{{ Math.round(runWeatherData.current.temp) }}&deg;C</p>
        <img :src="`https://openweathermap.org/img/wn/${runWeatherData.current.weather[0].icon}@2x.png`" :alt="runWeatherData.current.weather[0].description" class="flex-1" />
      </div>
      <p class="text-center">{{ runWeatherData.current.weather[0].description }}</p>
      <p class="text-center">kecepatan angin: {{ runWeatherData.current.wind_speed }} m/s</p>
    </div>
    <hr class="w-full border my-5" />
    <!-- hourly weather -->
    <div class="text-white w-full">
      <h2 class="mb-5">Hourly Weather</h2>
      <div class="flex gap-10 max-w-screen-md overflow-x-scroll mt-10 mb-5">
        <div class="flex flex-1 flex-col gap-6 items-center" v-for="hourlyData in runWeatherData.hourly" :key="hourlyData.dt">
          <p class="text-md whitespace-nowrap">{{ new Date(hourlyData.currentTime).toLocaleTimeString("id", { timeStyle: "short" }) }}</p>
          <img class="h-[50px] object-cover" :src="`https://openweathermap.org/img/wn/${hourlyData.weather[0].icon}@2x.png`" :alt="hourlyData.weather[0].description" />
          <p class="text-md mb-5">{{ Math.round(hourlyData.temp) }} &deg;C</p>
        </div>
      </div>
    </div>
    <hr class="w-full border my-5" />
    <!-- daily weather -->
    <div class="text-white w-full overflow-y-scroll">
      <h2 class="mb-5">Daily Forcast</h2>
      <div class="flex items-center" v-for="dailyData in runWeatherData.daily" :key="dailyData.dt">
        <p class="text-md flex-1">{{ new Date(dailyData.dt * 1000).toLocaleDateString("id", { weekday: "long" }) }}</p>
        <img class="h-[50px] object-cover" :src="`https://openweathermap.org/img/wn/${dailyData.weather[0].icon}@2x.png`" :alt="dailyData.weather[0].description" />
        <div class="flex flex-1 justify-end gap-3">
          <p>{{ Math.round(dailyData.temp.min) }} &deg;C s/d {{ Math.round(dailyData.temp.max) }} &deg;C</p>
        </div>
      </div>
    </div>
    <div v-if="!route.query.preview" class="flex flex-1 container justify-center my-5 hover:text-red-700 cursor-pointer items-center gap-3" @click="removeCity">
      <i class="fa-solid fa-trash"></i>
      <p>Remove City</p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
async function getWeatherData() {
  try {
    const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.latitude}&lon=${route.query.longitude}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=metric&lang=id`);
    // cal current date & time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime = utc + 1000 * weatherData.data.timezone_offset;

    // cal hourly weather offset
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
    });
    return weatherData.data;
  } catch (error) {
    console.log(error);
  }
}
// Dengan adanya await di sini, script setup ini sudah menjadi asynchronous
const runWeatherData = await getWeatherData();
// console.log(runWeatherData);
const router = useRouter();
function removeCity() {
  const savedCities = JSON.parse(localStorage.getItem("savedCities"));
  const filteredStorage = savedCities.filter((city) => city.id !== route.query.id);
  localStorage.setItem("savedCities", JSON.stringify(filteredStorage));
  router.push("/");
}
</script>
