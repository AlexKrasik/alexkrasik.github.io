<script setup>
import { computed, onMounted, ref } from "vue";

const emit = defineEmits(["change"]);
const props = defineProps({
  id: { required: true, type: String },
  falsePic: { required: false, type: String },
  truePic: { required: false, type: String },
});

const state = ref(false);

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
  <label
    class="toggleInput"
    :for="id"
    :class="state ? 'true' : 'false'"
    :style="cssProps"
  >
    <input
      type="checkbox"
      @change="updateInput"
      :id="props.id"
      v-model="state"
    />
    <span></span>
  </label>
</template>

<style scoped lang="scss">
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

.toggleInput.false::before {
  -webkit-mask-image: var(--false-pic-url);
  -webkit-mask-position: left;

  mask-image: var(--false-pic-url);
  mask-position: 0;
}

.toggleInput.true::before {
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

.toggleInput.true span {
  left: 0;
}

.toggleInput.false span {
  left: 100%;
  transform: translateX(-100%);
}
</style>
