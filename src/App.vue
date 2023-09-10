<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-weather-main">
    <SiteNavigation />
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
    <FooterComponent class="flex-1" />
  </div>
</template>

<script setup>
import FooterComponent from "./components/FooterComponent.vue";
import SiteNavigation from "./components/SiteNavigation.vue";
import { RouterView } from "vue-router";
</script>
<style>
.page-enter.active,
.page-leave-active {
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
