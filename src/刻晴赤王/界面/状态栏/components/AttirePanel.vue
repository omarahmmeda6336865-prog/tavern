<template>
  <div class="attire-panel">
    <div class="attire-main">
      <div class="attire-section">
        <div class="attire-head">
          <span class="attire-icon">◎</span>
          <span class="attire-label">整体着装</span>
        </div>
        <div class="attire-desc">{{ store.data.服饰.整体 }}</div>
      </div>
      <div class="attire-section intimate">
        <div class="attire-head">
          <span class="attire-icon">◆</span>
          <span class="attire-label">内衣</span>
        </div>
        <div class="attire-desc">{{ store.data.服饰.内衣 }}</div>
      </div>
    </div>

    <div class="acc-divider">
      <span class="divider-diamond">◈</span>
      <span>配件</span>
      <span class="divider-diamond">◈</span>
    </div>

    <div class="accessory-list">
      <div
        v-for="acc in accessories"
        :key="acc.key"
        class="acc-item"
        :class="{ highlight: acc.key === '神之眼' }"
      >
        <div class="acc-head">
          <span class="acc-dot" :class="acc.key"></span>
          <span class="acc-name">{{ acc.label }}</span>
        </div>
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
  gap: 8px;
}

.attire-main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}

.attire-section {
  background: rgba(0, 0, 0, 0.15);
  border: 1px solid var(--border-dim);
  padding: 8px;

  &.intimate {
    border-color: rgba(239, 68, 68, 0.15);
    background: rgba(239, 68, 68, 0.03);
  }
}

.attire-head {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 3px;
}

.attire-icon {
  font-size: 12px;
  color: var(--gold-dark);
}

.attire-label {
  font-size: 10px;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.attire-desc {
  font-size: 11px;
  color: var(--text-primary);
  line-height: 1.45;
}

.acc-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 9px;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 2px;
}

.divider-diamond {
  font-size: 8px;
  color: var(--gold-dark);
}

.accessory-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.acc-item {
  display: flex;
  gap: 8px;
  align-items: baseline;
  padding: 5px 7px;
  background: rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-dim);
  transition: border-color 0.2s;

  &.highlight {
    border-color: rgba(201, 160, 78, 0.2);
    background: rgba(201, 160, 78, 0.04);
  }

  &:hover {
    border-color: var(--border-gold);
  }
}

.acc-head {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  width: 52px;
}

.acc-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  flex-shrink: 0;

  &.手部 { background: var(--gold-dark); }
  &.腿部与鞋履 { background: #92400e; }
  &.饰品 { background: #ca8a04; }
  &.神之眼 { background: var(--gold); box-shadow: 0 0 4px rgba(201, 160, 78, 0.6); }
  &.身体改造物 { background: var(--crimson-light); box-shadow: 0 0 4px rgba(201, 51, 90, 0.4); }
}

.acc-name {
  font-size: 10px;
  color: var(--text-dim);
}

.acc-desc {
  font-size: 10px;
  color: var(--text-primary);
  line-height: 1.4;
  flex: 1;
}
</style>
