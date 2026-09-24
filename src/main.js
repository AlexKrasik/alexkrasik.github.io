import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import {createI18n} from "vue-i18n";

import "./assets/null.css";
import "./assets/main.css";

// Preferred color scheme
const savedTheme = localStorage.getItem("preferTheme");
const browserTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light';
const preferTheme = savedTheme ? savedTheme : browserTheme;

// Preferred locale
const savedLocale = localStorage.getItem("preferLocale");
const browserLocale = navigator.language === 'uk' ? 'uk' : 'en';
const preferLocale = savedLocale ? savedLocale : browserLocale;

const i18n = createI18n({locale: preferLocale, fallbackLocale: "en", legacy: false});
const app = createApp(App, {theme: preferTheme});

app.use(router);
app.use(i18n);

app.mount("#app");
