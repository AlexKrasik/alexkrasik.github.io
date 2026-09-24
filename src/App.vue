<script setup>
import "@/assets/transition.css";
import {onBeforeRouteUpdate, RouterView} from "vue-router";

const props = defineProps({theme: String});

document.documentElement.className = `${props.theme}-theme`;

onBeforeRouteUpdate(() => {
  window.scrollTo(0, 0);
});

</script>

<template>
  <RouterView v-slot="{ Component }">
    <component :is="Component"/>
  </RouterView>
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  gap: 30px;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 300ms, color 300ms;
}
</style>
