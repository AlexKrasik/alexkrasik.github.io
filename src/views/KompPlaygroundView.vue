<script setup>
import {onMounted, ref} from "vue";
import {CodeJar} from 'codejar';
import Prism from 'prismjs';
import 'prismjs/themes/prism-dark.min.css'

const examples = {
  "Template example": '/komp/ex_1.js',
  "Updating state": '/komp/ex_2.js',
  "Events": '/komp/ex_3.js',
  "Bindings": '/komp/ex_4.js',
  "Empty": '/komp/empty.js'
};

async function getScriptText(name) {
  getScriptText.cache = getScriptText?.cache || new Map();

  if (!name) return "";

  const path = `${name}`;

  if (!getScriptText.cache.has(name)) {
    const response = await fetch(path);
    if (response.ok) {
      const codeText = await response.text();
      getScriptText.cache.set(name, codeText);
      return codeText;
    }
  }

  return getScriptText.cache.get(name);
}

const previewFrame = ref(null);
const editorElement = ref(null);
const editor = ref(null);

onMounted(async () => {
  const highlight = element => element.innerHTML = Prism.highlight(element.textContent, Prism.languages.javascript, 'javascript');
  editor.value = CodeJar(editorElement.value, highlight, {tab: " ".repeat(2)});
  editor.value.onUpdate(code => updatePreview(code));
  changeScript('/komp/empty.js')
});

function updatePreview(code) {
  previewFrame.value.srcdoc = `
    <html>
    <body>
      <div id="app"></div>
      <script type="module">${code}<\/script>
    </body>
    </html>`;
}

async function changeScript(value) {
  const code = await getScriptText(value);
  editor.value.updateCode(code);
}
</script>

<template>
  <div class="container">
    <h1>kompJS</h1>
    <div class="example-selection">
      <select id="example-select" @change=" e => changeScript(e.target.value)">
        <option value="" disabled selected>Select example</option>
        <option v-for="(name, title) in examples" v-bind:value="name">{{ title }}</option>
      </select>
    </div>
    <div class="sandbox">
      <div class="codeJar" ref="editorElement"></div>
      <iframe class="previewFrame" ref="previewFrame" sandbox="allow-scripts"></iframe>
    </div>
  </div>
</template>

<style scoped>
.sandbox {
  display: grid;
  grid-template-columns: 3fr 2fr;
  margin-top: 1em;
  gap: 1em;
  width: 100%;
}

@media (max-width: 960px) {
  .sandbox {
    grid-template-columns: 100%;
  }
}

.codeJar {
  padding: .5em 1em;
  background-color: #1b1b1b;
  color: #eee;
  border-radius: .5em;
  white-space: pre !important;
}

.previewFrame {
  background-color: #fff;
  border: none;
  box-shadow: inset 0 0 3px var(--ui-border-color);
  border-radius: .5em;
  height: 100%;
  width: 100%;
}
</style>