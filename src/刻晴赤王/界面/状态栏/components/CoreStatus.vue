<template>
  <div class="core-status">
    <div class="grid-3">
      <div class="stat-card">
        <div class="stat-label">意识清醒度</div>
        <div class="stat-bar-track">
          <div
            class="stat-bar-fill"
            :style="{ width: store.data.核心意识.意识清醒度 + '%' }"
          ></div>
        </div>
        <div class="stat-val">{{ store.data.核心意识.意识清醒度 }}%</div>
      </div>

      <div class="stat-card">
        <div class="stat-label">抵抗意识</div>
        <div class="stat-bar-track">
          <div
            class="stat-bar-fill resist"
            :style="{ width: store.data.核心意识.抵抗意识 + '%' }"
          ></div>
        </div>
        <div class="stat-val">{{ store.data.核心意识.抵抗意识 }}%</div>
      </div>

      <div class="stat-card">
        <div class="stat-label">异常状态</div>
        <div class="stat-text">{{ store.data.身体状态.异常状态 || '无' }}</div>
      </div>
    </div>

    <div class="body-row">
      <div class="body-label">当前行为</div>
      <div class="body-text">{{ store.data.身体状态.当前行为 }}</div>
    </div>

    <div class="mono-box">
      <div class="mono-label">内心独白</div>
      <div class="mono-text">{{ store.data.核心意识.内心独白 }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();
</script>

<style lang="scss" scoped>
.core-status {
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.grid-3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 6px;
}

.stat-card {
  background: var(--bg-card);
  padding: 6px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.stat-label {
  font-size: 9px;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-bar-track {
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-dim);
  overflow: hidden;
}

.stat-bar-fill {
  height: 100%;
  background: var(--gold);
  transition: width 0.3s;

  &.resist {
    background: var(--crimson-light);
  }
}

.stat-val {
  font-size: 13px;
  font-weight: bold;
  color: var(--gold-light);
}

.stat-text {
  font-size: 10px;
  color: var(--text-primary);
  line-height: 1.35;
}

.body-row {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  background: var(--bg-card);
  padding: 6px;
}

.body-label {
  font-size: 9px;
  color: var(--text-dim);
  white-space: nowrap;
  padding-top: 1px;
}

.body-text {
  font-size: 11px;
  color: var(--text-primary);
  line-height: 1.4;
}

.mono-box {
  background: var(--bg-deep);
  border: 1px solid var(--border-dim);
  padding: 6px 8px;
}

.mono-label {
  font-size: 9px;
  color: var(--text-dim);
  margin-bottom: 3px;
}

.mono-text {
  font-size: 11px;
  color: var(--gold-light);
  font-style: italic;
  line-height: 1.45;
}
</style>
