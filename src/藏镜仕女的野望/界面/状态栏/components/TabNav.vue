<template>
  <nav class="tabs" :class="{ compact: props.compact }">
    <button
      v-for="tab in props.tabs"
      :key="tab.id"
      class="tab-button"
      :class="{ active: model === tab.id }"
      :aria-expanded="model === tab.id"
      @click="toggleTab(tab.id)"
    >
      {{ tab.label }}
    </button>
  </nav>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    tabs: { id: string; label: string }[];
    compact?: boolean;
  }>(),
  { compact: false },
);

const model = defineModel<string | null>({ required: true });

function toggleTab(id: string) {
  model.value = model.value === id ? null : id;
}
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  background-color: var(--c-slate);
  border-bottom: 3px solid var(--c-deep-ice);
}

.tabs.compact {
  background-color: var(--c-mist);
  border-bottom: 2px solid var(--c-slate);
}

.tab-button {
  flex: 1;
  padding: 8px;
  border: none;
  background: transparent;
  color: var(--c-frost);
  font-size: 0.9rem;
  font-weight: bold;
  font-family: var(--font-mirror);
  cursor: pointer;
  transition: all 0.2s;
  text-transform: uppercase;
  border-right: 1.5px solid var(--c-deep-ice);
}

.compact .tab-button {
  color: var(--c-slate);
  font-size: 0.78rem;
  padding: 5px;
  border-right: 1.5px solid var(--c-ice-blue);
}

.tab-button:last-child {
  border-right: none;
}

.tab-button:hover {
  background-color: var(--c-ice-blue);
  color: var(--c-frost);
}

.compact .tab-button:hover {
  background-color: var(--c-ice-blue);
  color: var(--c-frost);
}

.tab-button.active {
  background-color: var(--c-frost);
  color: var(--c-slate);
  position: relative;
  top: 1px;
  padding-bottom: 10px;
}

.compact .tab-button.active {
  background-color: var(--c-frost);
  padding-bottom: 6px;
}
</style>
