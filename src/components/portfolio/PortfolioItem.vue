<script setup>
import {useI18n} from "vue-i18n";

const props = defineProps({
  title: {
    default: "__title__",
  },
  links: [],
  description: {
    en: "",
    uk: "",
  }
});
const {t} = useI18n({
  messages: {
    en: {
      description: props.description.en,
    },
    uk: {
      description: props.description.uk,
    },
  },
});

</script>
<template>
  <div class="portfolio-item">
    <div class="portfolio-item__name">{{ title }}</div>
    <div class="portfolio-item__info">
      <div class="portfolio-item__description">{{ t("description") }}</div>
      <div class="portfolio-item__links">
        <a v-for="link in links" :href="link.link" :target="link.target">{{ link.site || link.link }}</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.portfolio-item {
  display: grid;
  grid-template-rows: min-content 1fr;
  clip-path: var(--ui-clip-left);
  border: 1px solid var(--text-color);
}

.portfolio-item__info {
  display: flex;
  flex-direction: column;

  gap: 5px;
  padding: 15px;
  height: 100%;
  align-self: start;
}

.portfolio-item__logo {
  padding: 15px;
  height: 100px;
}

.portfolio-item__logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.portfolio-item__name {
  padding: 5px 15px;
  background-color: var(--text-color);
  color: var(--bg-color);
}

.portfolio-item__links {
  display: flex;
  gap: 15px;
  margin-top: auto;
}

.portfolio-item__links a {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: .7em;
  margin-top: 5px;
}

.portfolio-item__links a::after {
  content: "";
  display: inline-block;
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-box-arrow-up-right' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5'/%3E%3Cpath fill-rule='evenodd' d='M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z'/%3E%3C/svg%3E");
  mask-position: center;
  mask-size: contain;
  background-color: var(--text-color);
  width: 10px;
  height: 10px;
}
</style>
