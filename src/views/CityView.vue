<template>
  <div>
    <Suspense>
      <CityContainer />
      <template #fallback>
        <CityContainerSkeleton />
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import CityContainer from "../components/CityContainer.vue";
import CityContainerSkeleton from "../components/CityContainerSkeleton.vue";
</script>
