<script setup>
import {ref} from "vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n({
  messages: {
    'en': {'spoil': '[show]'},
    'uk': {'spoil': '[показати]'}
  }
});

const isRevealed = ref(false);

</script>

<template>
  <span @click="isRevealed = true">
    <slot v-if="!isRevealed" name="spoil">{{ t('spoil') }}</slot>
    <slot v-if="isRevealed"></slot>
  </span>
</template>

<style scoped>
span:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>