<template>
  <div class="attire-panel">
    <div class="attire-main">
      <div class="attire-section">
        <div class="attire-label">整体</div>
        <div class="attire-desc">{{ store.data.服饰.整体 }}</div>
      </div>
      <div class="attire-section">
        <div class="attire-label">内衣</div>
        <div class="attire-desc">{{ store.data.服饰.内衣 }}</div>
      </div>
    </div>

    <div class="accessory-grid">
      <div
        v-for="acc in accessories"
        :key="acc.key"
        class="acc-card"
      >
        <div class="acc-name">{{ acc.label }}</div>
        <div class="acc-desc">{{ store.data.服饰.配件[acc.key] }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

const accessories = [
  { key: '手部', label: '手部' },
  { key: '腿部与鞋履', label: '下装' },
  { key: '饰品', label: '饰品' },
  { key: '神之眼', label: '神之眼' },
  { key: '身体改造物', label: '改造物' },
] as const;
</script>

<style lang="scss" scoped>
.attire-panel {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.attire-main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
}

.attire-section {
  background: var(--bg-card);
  padding: 5px 7px;
}

.attire-label {
  font-size: 10px;
  color: var(--gold);
  margin-bottom: 2px;
}

.attire-desc {
  font-size: 11px;
  color: var(--text-primary);
  line-height: 1.4;
}

.accessory-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
}

.acc-card {
  background: var(--bg-deep);
  border: 1px solid var(--border-dim);
  padding: 4px 6px;
}

.acc-card:nth-child(4) {
  grid-column: 1 / -1;
  border-color: var(--border-gold);
}

.acc-name {
  font-size: 9px;
  color: var(--text-dim);
  margin-bottom: 1px;
}

.acc-desc {
  font-size: 10px;
  color: var(--text-primary);
  line-height: 1.35;
}
</style>
