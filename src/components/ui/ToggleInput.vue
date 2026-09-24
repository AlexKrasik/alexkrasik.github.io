<script setup>
import {computed, onMounted, ref} from "vue";

const emit = defineEmits(["change"]);
const props = defineProps({
  falsePic: {required: false, type: String},
  truePic: {required: false, type: String},
  checked: {required: false, type: Boolean, default: false},
});

const state = ref(props.checked);

const cssProps = computed(() => {
  return {
    "--false-pic-url": `url(${props.falsePic})`,
    "--true-pic-url": `url(${props.truePic})`,
  };
});
onMounted(() => {
  const preload = new Image();
  if (props.falsePic) preload.src = props.falsePic;
  if (props.truePic) preload.src = props.truePic;
});

function updateInput(event) {
  emit("change", event);
}
</script>

<template>
  <label class="toggleInput" :style="cssProps">
    <input type="checkbox" @change="updateInput" v-model="state"/>
    <span></span>
  </label>
</template>

<style scoped>
.toggleInput {
  position: relative;
  display: flex;
  width: 45px;
  height: 24px;
  cursor: pointer;
  background-color: var(--text-color);
  padding: 3px;
  clip-path: var(--ui-clip);
}

.toggleInput::before {
  content: "";
  display: block;
  position: absolute;
  inset: 2px;
  background-color: var(--bg-color);
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-size: contain;
  mask-repeat: no-repeat;
  mask-size: contain;
}

.toggleInput::before {
  transition: 250ms;
}

.toggleInput::before {
  -webkit-mask-image: var(--false-pic-url);
  -webkit-mask-position: left;

  mask-image: var(--false-pic-url);
  mask-position: 0;
}

.toggleInput:has(:checked)::before {
  -webkit-mask-image: var(--true-pic-url);
  -webkit-mask-position: right;

  mask-image: var(--true-pic-url);
  mask-position: 100%;
}

.toggleInput input {
  display: none;
}

.toggleInput span {
  display: block;
  position: relative;
  background-color: var(--bg-color);
  height: 100%;
  aspect-ratio: 1/1;
  transition: 250ms ease-in-out;
  z-index: 2;
  clip-path: var(--ui-clip);
}

.toggleInput span {
  left: 100%;
  transform: translateX(-100%);
}

.toggleInput :checked + span {
  left: 0;
  transform: translateX(0);
}

</style>
