<template>
  <div class="flex bg-slate-50 bg-opacity-20 shadow-md mx-auto my-4 p-4 rounded items-center cursor-pointer">
    <div class="flex flex-1 flex-col">
      <h2 class="text-3xl">{{ data.city }}</h2>
      <h4 class="text-md">{{ data.state }}</h4>
    </div>
    <div class="flex-1">
      <img :src="`https://openweathermap.org/img/wn/${data.weather.weather[0].icon}@2x.png`" :alt="data.weather.weather[0].description" />
    </div>
    <div class="flex flex-col gap-2">
      <p class="text-3xl self-end">{{ Math.round(data.weather.main.temp) }} &deg;C</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});
</script>
