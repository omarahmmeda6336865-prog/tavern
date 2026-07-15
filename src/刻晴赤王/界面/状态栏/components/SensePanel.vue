<template>
  <div class="sense-panel">
    <div class="sense-grid">
      <div
        v-for="area in areas"
        :key="area.key"
        class="sense-card"
      >
        <div class="sense-name">{{ area.label }}</div>
        <div class="sense-desc">{{ store.data.身体状态.观感[area.key] }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

const areas = [
  { key: '整体', label: '整体' },
  { key: '乳房', label: '乳房' },
  { key: '臀部', label: '臀部' },
  { key: '股间', label: '股间' },
  { key: '面部', label: '面部' },
] as const;
</script>

<style lang="scss" scoped>
.sense-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
}

.sense-card {
  background: var(--bg-card);
  padding: 5px 7px;
  border-left: 2px solid var(--gold-dark);
}

.sense-card:first-child {
  grid-column: 1 / -1;
}

.sense-name {
  font-size: 10px;
  color: var(--gold);
  margin-bottom: 2px;
}

.sense-desc {
  font-size: 11px;
  color: var(--text-primary);
  line-height: 1.4;
}
</style>
