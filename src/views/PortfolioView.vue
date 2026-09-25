<script setup>
import PortfolioItem from "../components/portfolio/PortfolioItem.vue";
import {nextTick, onMounted, ref} from "vue";
import {useScramble} from "@/composables/scramble";
import {useI18n} from "vue-i18n";
import {loadProjects} from "@/lib/portfolio";

const categories = ref([]);

const containerEL = ref();
const {prepare} = useScramble(containerEL, {selector: ".portfolio-item__description, .portfolio-category__description"})
const {locale} = useI18n({useScope: "global"});

onMounted(async () => {
  categories.value = await loadProjects();
  await nextTick();
  prepare();
});

</script>

<template>
  <div class="container" ref="containerEL">
    <h1>projects</h1>
    <section v-for="category in categories" class="portfolio-category">
      <h2 class="portfolio-category__title">{{ category.title }}</h2>
      <span class="portfolio-category__description">{{
          category.description?.[locale] ?? category.description?.en ?? ""
        }}</span>
      <ol class="portfolio-category__list">
        <PortfolioItem v-for="project in category.project" v-bind="project"/>
      </ol>
    </section>
  </div>
</template>

<style scoped>
.portfolio-category {
  display: grid;
  margin-bottom: 60px;
  grid-template-columns: min-content 1fr;
}

.portfolio-category__title {
  text-transform: uppercase;
  position: relative;
  display: inline-block;
}

.portfolio-category__title::before {
  display: inline;
  content: "_";
  position: absolute;
  right: 100%;
  bottom: 0;
}

.portfolio-category__description {
  color: var(--text-color-tinted);
  text-transform: lowercase;
  padding-left: 1em;
  font-size: 0.8em;
  align-self: center;
}

.portfolio-category__description::before {
  content: "//";
}

.portfolio-category__list {
  display: grid;
  grid-template-columns: 100%;
  gap: 30px;
  padding-left: 0;
  margin: 1em 0 1em;
  grid-column: 1 / 3;
}

.portfolio-category:last-child {
  margin-bottom: 0;
}

@media (max-width: 767px) {

  .portfolio-category__title {
    margin: 0;
  }

  .portfolio-category__description {
    padding: 0;
    grid-column: 1 / 3;
    margin-bottom: 1em;
  }

  .portfolio-category__list {
    grid-template-columns: 100%;
    gap: 30px;
  }
}
</style>
