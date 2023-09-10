<template>
  <Teleport to="body">
    <Transition name="modal-container">
      <div v-show="isModalActive" class="fixed bg-opacity-50 w-full min-h-screen top-0 left-0 flex justify-center px-8 bg-black">
        <Transition name="modal-content">
          <div v-if="isModalActive" class="bg-white self-start max-w-screen-md p-4 my-32">
            <slot></slot>
            <button class="w-20 h-10 text-white hover:bg-weather-main bg-weather-secondary" @click="$emit('close-modal')">close</button>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineEmits(["close-modal"]);
defineProps({
  isModalActive: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.modal-container-enter-active,
.modal-container-leave-active {
  transition: all 0.5s;
}
.modal-content-enter-active,
.modal-content-leave-active {
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.15s;
}
.modal-container-enter-from,
.modal-content-enter-from {
  opacity: 0;
}
.modal-container-leave-to {
  opacity: 0;
}
.modal-content-enter-from {
  transform: scale(0.5);
}
.modal-content-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
</style>
