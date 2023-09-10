<template>
  <div class="flex bg-slate-50 bg-opacity-20 shadow-md mx-auto my-4 p-4 rounded items-center gap-5">
    <div class="flex flex-1 flex-col gap-2">
      <AnimatedPlaceholder />
      <AnimatedPlaceholder />
    </div>
    <div class="flex-1">
      <AnimatedPlaceholder />
    </div>
    <div class="flex-1">
      <AnimatedPlaceholder />
    </div>
  </div>
</template>

<script setup>
import AnimatedPlaceholder from "../components/AnimatedPlaceholder.vue";
</script>
