<template>
  <main>
    <div class="container py-10 text-white">
      <!-- search input -->
      <input type="text" placeholder="input city, region, or country" class="w-full py-2 px-1 bg-transparent border-b focus:outline-none focus:border-b-2 focus:shadow-[0px_1px_0_0_#004E71]" v-model="searchQuery" @keyup="search" />
      <!-- Search List -->
      <div v-if="searchResults" class="flex w-full flex-col relative z-10 container m-auto h-fit bg-weather-secondary">
        <p v-if="isError">Sorry, something went wrong. Please try again later</p>
        <p v-if="searchResults.length === 0 && !serverError">City is not found. Plase enter another place</p>
        <ul v-else>
          <li v-for="item in searchResults" :key="item.id" class="py-4 cursor-pointer hover:bg-slate-50 hover:bg-opacity-30" @click="viewCity(item)">{{ item.place_name }}</li>
        </ul>
      </div>
      <Suspense>
        <CityList />
        <template #fallback>
          <CityCardSkeleton />
        </template>
      </Suspense>
    </div>
  </main>
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import CityList from "../components/CityList.vue";
import CityCardSkeleton from "../components/CityCardSkeleton.vue";
const router = useRouter();
const searchQuery = ref("");
const queryTimeout = ref(null);
const searchResults = ref(null);
const isError = ref(false);
async function search() {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const results = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q&language=id`
        );
        // console.log(results.data.features);
        searchResults.value = results.data.features;
      } catch {
        isError.value = true;
      }
      return;
    }
    searchResults.value = null;
  }, 300);
}
async function viewCity(location) {
  // console.log(location);
  const [city, state] = location.place_name.split(",");
  const horizontalLine = location.geometry.coordinates[1];
  const verticalLine = location.geometry.coordinates[0];
  router.push({
    name: "city",
    params: { state: state.replaceAll(" ", ""), city },
    query: {
      latitude: horizontalLine,
      longitude: verticalLine,
      // cek apakah kita menambahkannya ke dalam koleksi atau tidak
      preview: true,
    },
  });
}
</script>
