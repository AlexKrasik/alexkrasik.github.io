<script setup>
import PortfolioItem from "../components/portfolio/PortfolioItem.vue";
import projects from "../data/portfolio.json";
</script>

<template>
  <div class="container">
    <h1>portfolio</h1>
    <section
      v-for="category in projects"
      :key="category.title"
      :id="category.title"
      class="portfolio-category"
    >
      <h2>{{ category.title }}</h2>
      <div class="portfolio-category__list">
        <PortfolioItem
          v-for="item in category.list"
          v-bind="item"
          :key="item.title"
        />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.portfolio-category {
  &__title {
    margin: 0 auto 15px;
    text-align: center;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    margin-bottom: 30px;
  }

  &:last-child {
    margin-bottom: 0;
  }

  h2 {
    margin: 30px auto 15px;
  }

  @media (max-width: 767px) {
    &__list {
      grid-template-columns: 100%;
      gap: 30px;
    }
  }
}
</style>
