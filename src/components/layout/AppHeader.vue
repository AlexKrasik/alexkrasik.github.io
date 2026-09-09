<script setup>
import { RouterLink } from "vue-router";
import { useI18n } from "vue-i18n";
import ToggleInput from "@/components/ui/ToggleInput.vue";

const i18n = useI18n({});

function toggleDarkMode(e) {
  document.documentElement.className = e.target.checked
    ? "dark-theme"
    : "light-theme";
}

function toggleLanguage(e) {
  i18n.locale.value = e.target.checked ? "en" : "uk";
}
</script>
<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <div class="header-title">
          alexKrasik
          <div class="header-subtitle">frontend developer</div>
        </div>

        <nav class="header-nav">
          <RouterLink to="/projects">projects</RouterLink>
          <RouterLink to="/cv">cv</RouterLink>
<!--          <RouterLink to="/contacts">contacts</RouterLink>-->
        </nav>

        <div class="header-options">
          <ToggleInput
            id="darkModeToggle"
            truePic="/img/icons/darkMode.svg"
            falsePic="/img/icons/lightMode.svg"
            @change="toggleDarkMode"
          />
          <ToggleInput
            id="toggleLang"
            truePic="/img/lang/en.svg"
            falsePic="/img/lang/uk.svg"
            @change="toggleLanguage"
          />
        </div>
      </div>
    </div>
  </header>
</template>
<style lang="scss" scoped>
.header {
  padding: 30px 0;
  border-bottom: 1px solid var(--tertiary-color);
  transition: border-color 300ms;
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
  font-size: 36px;
  line-height: 1;
}

.header-subtitle {
  font-weight: 300;
  font-size: 18px;
}

.header-nav {
  grid-area: nav;
  display: flex;
  gap: 5px;
  margin-left: auto;
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
}

@media (max-width: 767px) {
  .header {
    padding: 15px 0;
  }
  .header-content {
    grid-template-areas: "title options" "nav nav";
    gap: 20px;
  }
  .header-options {
    flex-direction: column;
  }
  .header-nav {
    width: 100%;
    justify-content: center;
  }
}
</style>
