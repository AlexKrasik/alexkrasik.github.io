<script setup>
import {useI18n} from "vue-i18n";
import {ref} from "vue";
import {useScramble} from "@/composables/scramble";

const {t} = useI18n({
  messages: {
    en: {
      page_title: "cv",
      education: {
        place:
            "National Aerospace University – Kharkiv Aviation Institute, Kharkiv, Ukraine",
        degree: "Bachelor - Software Engineering",
      },
      title_info: "info",
      title_work: "experience",
      title_edu: "education",
      title_skills: "skills",
      present: "present",
      name: "Oleksandr Krasikov",
      birthday: "01 jun 1992"
    },
    uk: {
      education: {
        place:
            'Національний аерокосмічний університет ім. М.Є. Жуковського "Харківський авіаційний інститут"',
        degree: "Бакалавр - Програмна інженерія",
      },
      title_info: "інфо",
      title_work: "досвід",
      title_edu: "освіта",
      title_skills: "навички",
      present: "дотепер",
      name: "Олександр Красіков",
      birthday: "01 чер 1992"
    },
  },
});

const containerEl = ref(null);
useScramble(containerEl, {selector: 'h2, ul'})

</script>

<template>
  <div class="container" ref="containerEl">
    <h1>{{ t("page_title") }}</h1>

    <h2>{{ t("title_info") }}</h2>
    <ul class="cv-list">
      <li><span class="fact">name: </span> {{ t("name") }}</li>
      <li><span class="fact">birth: </span> {{ t("birthday") }}</li>
    </ul>

    <h2>{{ t("title_work") }}</h2>
    <ul class="cv-list">
      <li>
        <div class="fact">Freelance web developer</div>
        <div class="timespan">2019 - 2021</div>
      </li>
      <li>
        <div class="fact">Frontend developer at AXIS-IT</div>
        <div class="timespan">2021 - 2026</div>
      </li>
    </ul>

    <h2>{{ t("title_edu") }}</h2>
    <ul class="cv-list">
      <li>
        <div class="fact">{{ t("education.degree") }}</div>
        <div class="sub" id="test">{{ t("education.place") }}</div>
        <span class="timespan">2009-2013</span>
      </li>
    </ul>

    <h2>{{ t("title_skills") }}</h2>
    <ul class="cv-row">
      <li>JavaScript</li>
      <li>TypeScript</li>
      <li>VUE3</li>
      <li>HTML</li>
      <li>CSS</li>
      <li>REST APIs</li>
    </ul>
  </div>
</template>

<style scoped>
.timespan {
  color: var(--text-color-tinted);
}

.cv-list {
  margin: 15px 0;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.cv-list li {
  position: relative;
}

.cv-row {
  margin: 15px 0;
  padding-left: 0;
  gap: 5px;
}

.cv-row li {
  display: inline;
}

.cv-row li:not(:last-child)::after {
  content: ", ";
}

.fact {
  font-weight: 700;
}

.sub {
  font-weight: 300;
}

h2 {
  position: relative;
  text-transform: uppercase;
}

h2::before {
  position: absolute;
  content: "_";
  right: 100%;
  bottom: 0;
}
</style>
