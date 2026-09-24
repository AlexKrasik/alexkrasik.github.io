<script setup>
import {RouterLink} from "vue-router";
import {useI18n} from "vue-i18n";
import ToggleInput from "@/components/ui/ToggleInput.vue";
import {onMounted, ref, watch} from "vue";
import {useScramble} from "@/composables/scramble";

const i18n = useI18n({
  messages: {
    en: {'frontend developer': "frontend developer"},
    uk: {'frontend developer': "фронтенд розробник"}
  }
});

const {locale} = useI18n({useScope: "global"});

function toggleDarkMode(e) {
  const theme = e.target.checked ? "dark" : "light";
  localStorage.setItem("preferTheme", theme);
  document.documentElement.className = `${theme}-theme`;
}

const savedTheme = localStorage.getItem("preferTheme");
const browserTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light';
const preferDark = savedTheme ? savedTheme === "dark" : browserTheme === "dark";

function toggleLocale(e) {
  locale.value = e.target.checked ? "uk" : "en";
  localStorage.setItem("preferLocale", locale.value);
}

watch(locale, () => document.dispatchEvent(new Event("localeChange")), {flush: 'pre]'});

const savedLocale = localStorage.getItem("preferLocale");
const preferLocale = navigator.language === 'uk' ? 'uk' : 'en';
const preferUK = savedLocale ? savedLocale === 'uk' : preferLocale === 'uk';
const headerEl = ref(null);

useScramble(headerEl, {selector: ".header-subtitle"});

</script>
<template>
  <header class="header" ref="headerEl">
    <div class="container">
      <div class="header-content">
        <div class="header-title">
          alexKrasik
          <div class="header-subtitle">{{ i18n.t("frontend developer") }}</div>
        </div>

        <nav class="header-nav">
          <RouterLink to="/projects">projects</RouterLink>
          <RouterLink to="/cv">cv</RouterLink>
        </nav>

        <div class="header-options">
          <ToggleInput
              truePic="/img/icons/darkMode.svg"
              falsePic="/img/icons/lightMode.svg"
              :checked="preferDark"
              @change="toggleDarkMode"
          />
          <ToggleInput
              falsePic="/img/lang/en.svg"
              truePic="/img/lang/uk.svg"
              :checked="preferUK"
              @change="toggleLocale"
          />
        </div>
      </div>
    </div>
  </header>
</template>
<style scoped>
.header {
  top: 0;
  position: sticky;
  padding: 15px 0;
  border-bottom: 1px solid var(--ui-border-color);
  backdrop-filter: blur(10px);
  background-color: var(--bg-color);
  z-index: 1000;
  transition: 250ms;
}

.header-content {
  display: grid;
  gap: 30px;
  grid-template-areas: "title nav options";
  grid-template-columns: auto min-content min-content;
}

.header-title {
  grid-area: title;
  justify-self: start;
  text-align: left;
  font-weight: 800;
  font-size: 1.5em;
  line-height: 1.2;
}

.header-subtitle {
  font-weight: 300;
  font-size: .7em;
  color: var(--text-color-tinted);
  text-transform: lowercase;
}

.header-nav {
  grid-area: nav;
  display: flex;
  gap: 5px;
  align-self: end;
  justify-self: end;
}

.header-nav a {
  display: inline-block;
  padding: 0 15px;
  transition: 250ms background-color;
  clip-path: var(--ui-clip);
  height: min-content;
  background-color: transparent;
}

.header-nav a.router-link-exact-active {
  background-color: var(--text-color);
  color: var(--bg-color);
  pointer-events: none;
}

.header-options {
  grid-area: options;
  display: flex;
  gap: 5px;
  justify-self: end;
  align-self: end;
  justify-self: end;
}

@media (max-width: 767px) {
  .header {
    padding: 15px 0;
  }

  .header-content {
    grid-template-areas: "title title" "nav options";
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .header-nav {
    width: 100%;
    justify-content: start;

  }
}
</style>
