<script setup>
import {onMounted, onUnmounted, ref} from "vue";

const props = defineProps({
  frames: {
    type: Array,
    default: () => ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
  },
  interval: {
    type: Number,
    default: 180,
  },
  label: {
    type: String,
    default: "loading",
  },
});

const frameIndex = ref(0);
let timer;

onMounted(() => {
  timer = setInterval(() => {
    frameIndex.value = (frameIndex.value + 1) % props.frames.length;
  }, props.interval);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<template>
  <div class="ascii-throbber" role="status" aria-live="polite">
    <span class="ascii-throbber__frame" aria-hidden="true">{{ frames[frameIndex] }}</span>
    <span class="ascii-throbber__label">{{ label }}</span>
  </div>
</template>

<style scoped>
.ascii-throbber {
  display: inline-flex;
  align-items: center;
  gap: 0.6em;
  color: var(--text-color-tinted);
  font-variant-numeric: tabular-nums;
  user-select: none;
}

.ascii-throbber__frame {
  display: inline-block;
  width: 1ch;
  text-align: center;
}

.ascii-throbber__label {
  text-transform: lowercase;
}

.ascii-throbber__label::before {
  content: "// ";
}
</style>
