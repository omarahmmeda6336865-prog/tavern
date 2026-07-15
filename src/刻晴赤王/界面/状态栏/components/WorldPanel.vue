<template>
  <div class="world-panel">
    <div class="world-row">
      <div class="world-stat">
        <span class="world-label">时间</span>
        <span class="world-value">{{ store.data.世界.当前时间 }}</span>
      </div>
      <div class="world-stat">
        <span class="world-label">地点</span>
        <span class="world-value">{{ store.data.世界.当前地点 }}</span>
      </div>
    </div>

    <div class="people-list">
      <div
        v-for="(desc, name) in store.data.世界.在场人物"
        :key="name"
        class="people-card"
      >
        <span class="people-name">{{ name }}</span>
        <span class="people-desc">{{ desc }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();
</script>

<style lang="scss" scoped>
.world-panel {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.world-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
}

.world-stat {
  background: var(--bg-card);
  padding: 5px 7px;
  display: flex;
  flex-direction: column;
}

.world-label {
  font-size: 9px;
  color: var(--text-dim);
  text-transform: uppercase;
}

.world-value {
  font-size: 11px;
  color: var(--text-primary);
  margin-top: 2px;
}

.people-list {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.people-card {
  background: var(--bg-deep);
  border: 1px solid var(--border-dim);
  padding: 4px 7px;
  display: flex;
  gap: 8px;
  align-items: baseline;
}

.people-name {
  font-size: 10px;
  color: var(--gold);
  white-space: nowrap;
}

.people-desc {
  font-size: 10px;
  color: var(--text-secondary);
  line-height: 1.35;
}
</style>
