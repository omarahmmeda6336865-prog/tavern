<template>
  <div class="outfit-section">
    <div class="section-title">&#x2630; 服饰状态</div>

    <div class="outfit-layout">
      <div class="outfit-card overall">
        <div class="card-label">&#x25CF; 整体</div>
        <div class="card-desc">{{ store.data.服饰.整体 }}</div>
      </div>

      <div class="outfit-card underwear">
        <div class="card-label">&#x25C9; 内衣</div>
        <div class="card-desc">{{ store.data.服饰.内衣 || '—' }}</div>
      </div>

      <div class="outfit-card accessories">
        <div class="card-label">&#x2630; 配件</div>
        <div class="acc-list">
          <div v-for="(desc, part) in store.data.服饰.配件" :key="part" class="acc-row">
            <span class="acc-part">{{ part }}</span>
            <span class="acc-desc">{{ desc }}</span>
          </div>
        </div>
      </div>

      <div class="outfit-card other">
        <div class="card-label">&#x25D0; 其他</div>
        <div class="card-desc">{{ store.data.服饰.其他 }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';
const store = useDataStore();
</script>

<style lang="scss" scoped>
.outfit-section {
  padding: 10px 12px;
  border-top: 1px solid var(--c-border);
  background: rgba(255, 255, 255, 0.01);
}

.section-title {
  font-size: 11px;
  font-weight: bold;
  color: var(--c-text-bright);
  border-bottom: 1px solid var(--c-border);
  padding-bottom: 4px;
  margin-bottom: 8px;
}

.outfit-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 6px;
}

.outfit-card {
  padding: 6px 8px;
  background: var(--c-bg);
  border: 1px solid var(--c-border);
}

.outfit-card.overall {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}

.outfit-card.underwear {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  border-color: rgba(176, 124, 216, 0.25);
  background: rgba(176, 124, 216, 0.03);
}

.outfit-card.accessories {
  grid-column: 1 / 3;
  grid-row: 2 / 3;
}

.outfit-card.other {
  grid-column: 1 / 3;
  grid-row: 3 / 4;
  border-color: var(--c-gold-dim);
  background: rgba(212, 168, 83, 0.04);
}

.card-label {
  font-size: 9px;
  color: var(--c-gold);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 3px;
}

.underwear .card-label { color: var(--c-purple); }
.accessories .card-label { color: var(--c-text-dim); }

.card-desc {
  font-size: 10.5px;
  color: var(--c-text);
  line-height: 1.45;
  word-break: break-all;
}

.acc-list {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.acc-row {
  display: flex;
  gap: 6px;
  align-items: flex-start;
}

.acc-part {
  font-size: 9.5px;
  color: var(--c-text-dim);
  flex-shrink: 0;
  min-width: 52px;
  padding-top: 1px;
}

.acc-desc {
  font-size: 10.5px;
  color: var(--c-text);
  line-height: 1.4;
}

@media (max-width: 480px) {
  .outfit-layout {
    grid-template-columns: 1fr;
  }

  .outfit-card.overall,
  .outfit-card.underwear,
  .outfit-card.accessories,
  .outfit-card.other {
    grid-column: 1 / 2;
  }

  .outfit-card.underwear { grid-row: 2 / 3; }
  .outfit-card.accessories { grid-row: 3 / 4; }
  .outfit-card.other { grid-row: 4 / 5; }
}
</style>
