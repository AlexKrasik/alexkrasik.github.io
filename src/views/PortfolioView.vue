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
  margin-bottom: 60px;
}

.portfolio-category__title {
  margin: 0 auto 15px;
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
}

.portfolio-category__list {
  display: grid;
  grid-template-columns: 100%;
  gap: 30px;
  padding-left: 0;
  margin-bottom: 30px;
}

.portfolio-category:last-child {
  margin-bottom: 0;
}

.portfolio-category h2 {
  margin: 30px auto 15px;
}

@media (max-width: 767px) {
  .portfolio-category__list {
    grid-template-columns: 100%;
    gap: 30px;
  }
}
</style>
