<script setup>

import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import {RouterView, useRouter} from "vue-router";

</script>

<template>
  <div ref="pageEl">
    <AppHeader/>
    <RouterView v-slot="{ Component }">
      <Component :is="Component"/>
    </RouterView>
    <AppFooter/>
  </div>
</template>
