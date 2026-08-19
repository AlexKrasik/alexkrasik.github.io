import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createI18n } from "vue-i18n";

// import "./assets/null.scss";
import "./assets/main.scss";

const i18n = createI18n({ locale: "uk", fallbackLocale: "en", legacy: false });
const app = createApp(App);

app.use(router);
app.use(i18n);

app.mount("#app");
