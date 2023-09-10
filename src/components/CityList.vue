<template>
  <div v-for="city in savedCities" :key="city.id">
    <CityCard :data="city" @click="goToCityContainer(city)" />
  </div>
  <p v-if="savedCities.length === 0" class="my-4">No location has been added to collections. To start track a location, search on the search bar above</p>
</template>

<script setup>
import CityCard from "../components/CityCard.vue";
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
const router = useRouter();
const savedCities = ref([]);
const getCities = async () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
    const requested = [];
    savedCities.value.forEach((city) => {
      requested.push(axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.coordinates.latitude}&lon=${city.coordinates.longitude}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=metric&lang=id`));
    });
    // Kita bisa saja memakai then dan catch, tetapi cara ini adalah cara baru bagi kita
    const weatherData = await Promise.all(requested);
    // Di sini, kita bikin data baru di dalam savedCities yang sebelumnya hanya menyimpan data koordinat lokasi yang sudah diambil dari localStorage. Sekarang, kita isi data baru ke dalam sana yang nama key-nya adalah weather
    weatherData.forEach((item, index) => {
      savedCities.value[index].weather = item.data;
    });
  }
};
await getCities();
// console.log(savedCities);
const goToCityContainer = (city) => {
  const latitude = city.coordinates.latitude;
  const longitude = city.coordinates.longitude;
  const id = city.id;
  router.push({
    name: "city",
    params: { state: city.state, city: city.city },
    query: { id, latitude, longitude },
  });
};
</script>
