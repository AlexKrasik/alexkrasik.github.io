<script setup>

import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import {RouterView} from "vue-router";

</script>

<template>
  <AppHeader/>
  <RouterView v-slot="{ Component }">
    <Component :is="Component"/>
  </RouterView>
  <AppFooter/>
</template>
