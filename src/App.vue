<script setup>
import "@/assets/transition.scss";

import {RouterView} from "vue-router";

</script>

<template>
  <Transition :name="slideup">
    <RouterView v-slot="{ Component }">
      <component :is="Component"/>
    </RouterView>
  </Transition>
</template>

<style lang="scss">
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
