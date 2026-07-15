<template>
  <div class="mind-panel">
    <div class="section-title">&#x25CB; 刻晴意识</div>

    <div class="clarity-row">
      <span class="sub-label">意识清醒度</span>
      <div class="track">
        <div class="fill clarity" :style="{ width: store.data.刻晴.意识清醒度 + '%' }"></div>
      </div>
      <span class="value" :class="clarityColor">{{ store.data.刻晴.意识清醒度 }}%</span>
    </div>

    <div class="resist-row">
      <span class="sub-label">抵抗意志</span>
      <div class="track">
        <div class="fill resist" :style="{ width: store.data.刻晴.抵抗意志 + '%' }"></div>
      </div>
      <span class="value" :class="resistColor">{{ store.data.刻晴.抵抗意志 }}%</span>
    </div>

    <div class="feeling-block">
      <span class="sub-label">&#x275D; 内心独白</span>
      <p class="feeling-text">{{ store.data.刻晴.当前感受 }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';
const store = useDataStore();

const clarityColor = computed(() => {
  const v = store.data.刻晴.意识清醒度;
  if (v >= 70) return 'good';
  if (v >= 30) return 'warn';
  return 'danger';
});

const resistColor = computed(() => {
  const v = store.data.刻晴.抵抗意志;
  if (v >= 70) return 'good';
  if (v >= 30) return 'warn';
  return 'danger';
});
</script>

<style lang="scss" scoped>
.mind-panel {
  padding: 10px 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.section-title {
  font-size: 11px;
  font-weight: bold;
  color: var(--c-text-bright);
  border-bottom: 1px solid var(--c-border);
  padding-bottom: 4px;
}

.sub-label {
  font-size: 10px;
  color: var(--c-text-dim);
  display: block;
  margin-bottom: 2px;
}

.clarity-row,
.resist-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.track {
  flex: 1;
  height: 8px;
  border: 1px solid var(--c-border);
  background: var(--c-bg);
  overflow: hidden;
}

.fill {
  height: 100%;
  transition: width 0.4s ease;
}

.clarity {
  background: linear-gradient(90deg, var(--c-purple-dim), var(--c-purple));
}

.resist {
  background: linear-gradient(90deg, var(--c-purple), #c39bdb);
}

.value {
  font-weight: bold;
  font-size: 11px;
  min-width: 32px;
  text-align: right;
}

.good { color: var(--c-purple); }
.warn { color: var(--c-gold); }
.danger { color: var(--c-danger); }

.feeling-block {
  flex: 1;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--c-border);
  padding: 6px 8px;
}

.feeling-text {
  font-size: 10.5px;
  color: var(--c-text-dim);
  line-height: 1.5;
  margin-top: 2px;
  font-style: italic;
}
</style>
