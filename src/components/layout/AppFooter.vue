<script setup>
import {ref} from "vue";
import {useI18n} from "vue-i18n";

const pattern = ref('𖡼.𖤣𖥧.')
const clicked = ref(false);
const {t} = useI18n({
  messages: {
    "uk": {
      "meow": "мяу"
    },
    "en": {
      "meow": "meow"
    },
  }
});

function scrollTop() {
  clicked.value = true;
  setTimeout(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
    clicked.value = false;
  }, 300)
}
</script>
<template>
  <footer>
    <div class="container">
    </div>
    <pre class="kitty" @click="scrollTop">
<span class="meow">{{ clicked ? t('meow') : "    " }}</span>
       /\_/\
    = ( •.• ) =
      /     \ </pre>
    <div class="flowers">
      {{ pattern.repeat(100) }}
    </div>
  </footer>
</template>

<style scoped>
footer {
  margin-top: auto;
  z-index: 1;
  transition: border-color 300ms;
  position: relative;
  opacity: .25;
}

.kitty {
  margin: 0;
  position: absolute;
  bottom: 1em;
  right: 2em;
  cursor: pointer;
}
</style>
