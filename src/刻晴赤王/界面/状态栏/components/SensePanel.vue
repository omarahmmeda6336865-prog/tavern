<template>
  <div class="sense-panel">
    <div class="sense-grid">
      <div
        v-for="area in areas"
        :key="area.key"
        class="sense-card"
      >
        <div class="sense-head">
          <span class="sense-dot" :class="area.key"></span>
          <span class="sense-name">{{ area.label }}</span>
          <span class="sense-bar">
            <span class="sense-bar-fill" :style="{ width: devPct + '%' }"></span>
          </span>
        </div>
        <div class="sense-desc">{{ store.data.身体状态.观感[area.key] }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

const store = useDataStore();

const devPct = computed(() => store.data.身体状态.开发度);

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
  gap: 6px;
}

.sense-card {
  background: rgba(0, 0, 0, 0.15);
  border: 1px solid var(--border-dim);
  padding: 7px;
  transition: border-color 0.3s;

  &:hover {
    border-color: var(--border-gold);
  }

  &:first-child {
    grid-column: 1 / -1;
  }
}

.sense-head {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 3px;
}

.sense-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;

  &.整体 { background: var(--gold); box-shadow: 0 0 4px rgba(201, 160, 78, 0.5); }
  &.乳房 { background: #f59e0b; box-shadow: 0 0 4px rgba(245, 158, 11, 0.4); }
  &.臀部 { background: #eab308; box-shadow: 0 0 4px rgba(234, 179, 8, 0.4); }
  &.股间 { background: #ef4444; box-shadow: 0 0 4px rgba(239, 68, 68, 0.4); }
  &.面部 { background: #60a5fa; box-shadow: 0 0 4px rgba(96, 165, 250, 0.4); }
}

.sense-name {
  font-size: 10px;
  color: var(--gold);
  flex-shrink: 0;
}

.sense-bar {
  flex: 1;
  height: 3px;
  background: rgba(255, 255, 255, 0.04);
  overflow: hidden;
}

.sense-bar-fill {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, #d97706, #f59e0b, #eab308);
  transition: width 0.5s ease;
}

.sense-desc {
  font-size: 11px;
  color: var(--text-primary);
  line-height: 1.45;
  padding-left: 11px;
}
</style>
