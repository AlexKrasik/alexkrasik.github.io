<script setup>
import {Sandpack} from "sandpack-vue3";
import {onMounted, reactive} from "vue";

const sandboxOptions = {
  editorHeight: 600,
  editorWidthPercentage: 65,
  showLineNumbers: true,
  showTabs: true,
  closableTabs: false,
};
const sandboxFiles = reactive({
  "index.html": {code: ""},
  "komp.js": {code: "", hidden: true},
  "index.js": {code: "", active: true,},
});

const examples = {
  "Template example": '/komp/ex_1.js',
  "Updating state": '/komp/ex_2.js',
  "Events": '/komp/ex_3.js',
  "Bindings": '/komp/ex_4.js'
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

async function changeScript(filename, path) {
  sandboxFiles[filename].code = await getScriptText(path);
}

onMounted(async () => {
  await changeScript('index.html', '/komp/index.html');
  await changeScript('komp.js', '/komp/komp.js');
  await changeScript('index.js', '/komp/ex_1.js');
});

</script>

<template>
  <div class="container">
    <h1>kompJS</h1>
    <div class="example-selection">
      <label for="example-select">
        Example:
      </label>
      <select id="example-select" @change=" e => changeScript('index.js', e.target.value)">
        <option v-for="(name, title) in examples" v-bind:value="name">{{ title }}</option>
      </select>
    </div>
    <Sandpack :options="sandboxOptions" :files="sandboxFiles" template="vite"/>
  </div>
</template>

<style scoped>
.example-selection {
  margin: 0 0 1em;
}
</style>