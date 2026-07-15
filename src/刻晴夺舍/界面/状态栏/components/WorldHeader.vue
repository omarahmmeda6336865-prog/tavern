<template>
  <div class="world-header">
    <div class="location">
      <span class="icon">&#x2316;</span>
      <span>{{ store.data.世界.当前地点 }}</span>
    </div>
    <div v-if="store.data.世界.在场人物" class="people">
      <span class="icon">&#x263A;</span>
      <span>{{ store.data.世界.在场人物 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';
const store = useDataStore();
</script>

<style lang="scss" scoped>
.world-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px;
  background: var(--c-bg);
  border-bottom: 1px solid var(--c-border);
  flex-wrap: wrap;
  gap: 4px;
}

.location,
.people {
  display: flex;
  align-items: flex-start;
  gap: 4px;
  font-size: 11px;
  color: var(--c-text);
}

.icon {
  color: var(--c-gold);
  font-size: 12px;
  flex-shrink: 0;
}
</style>
