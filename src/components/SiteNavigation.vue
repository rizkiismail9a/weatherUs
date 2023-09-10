<template>
  <header class="sticky top-0 bg-weather-secondary shadow-lg">
    <nav class="container flex flex-col sm:flex-row items-center gap-4 py-6 justify-between">
      <router-link to="/" title="Home">
        <div class="flex flex-1 items-center gap-3 text-white text-2xl">
          <i class="fa-solid fa-sun"></i>
          <p>Weather Us</p>
        </div>
      </router-link>
      <div class="flex gap-3 text-xl items-center">
        <i class="fa-solid fa-circle-info hover:text-white duration-150 cursor-pointer" @click="modalToggle" title="how to use app"></i>
        <i class="fa-solid fa-plus text-white duration-150 cursor-pointer" @click="addToCollection"></i>
      </div>
      <BaseModal :isModalActive="modalActivate" @close-modal="modalToggle">
        <h2 class="text-black text-2xl mb-1">About:</h2>
        <p class="mb-2">The Local Weather allows you to track the current and future weather of cities of your choosing.</p>
        <h2 class="text-black text-2xl mb-1">How it works</h2>
        <ol class="list-decimal list-inside mb-5">
          <li>Search for your city by entering the name into the search bar.</li>
          <li>Select a city within the results, this will take you to the current weather for your selection.</li>
          <li>Track the city by clicking on the "+" icon in the top right. This will save the city to view at a later time on the home page.</li>
        </ol>
        <h2 class="text-black text-2xl mb-1">Removing a city</h2>
        <p class="mb-10">If you no longer wish to track a city, simply select the city within the home page. At the bottom of the page, there will be am option to delete the city.</p>
      </BaseModal>
    </nav>
  </header>
</template>

<script setup>
import BaseModal from "./BaseModal.vue";
import { uid } from "uid";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const modalActivate = ref(null);
const modalToggle = () => {
  modalActivate.value = !modalActivate.value;
};
const savedCities = ref([]);
const addToCollection = () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
  }
  const locationData = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
    coordinates: {
      longitude: route.query.longitude,
      latitude: route.query.latitude,
    },
  };
  savedCities.value.push(locationData);
  localStorage.setItem("savedCities", JSON.stringify(savedCities.value));
  let query = Object.assign({}, route.query);
  // Hapus key preview dari object query yang dikirim dari halaman home
  delete query.preview;
  // query.id = locationData.id;
  router.replace({ query });
};
</script>
