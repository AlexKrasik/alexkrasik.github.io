<script setup>
import "@/assets/transition.scss";
import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";

import { ref } from "vue";
import { RouterView, useRouter } from "vue-router";

const pageTransition = ref("slideleft");

const router = useRouter();
router.afterEach((to, from) => {
  pageTransition.value =
    to.meta.pos > from.meta.pos ? "slideleft" : "slideright";
});
</script>

<template>
  <AppHeader />
  <RouterView v-slot="{ Component }">
    <main>
      <Transition :name="pageTransition">
        <component :is="Component" />
      </Transition>
    </main>
  </RouterView>
  <AppFooter />
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
