<template>
  <div class="possession-panel" :class="controlClass">
    <div class="top-row">
      <span class="label">&#x25C9; 意识主导</span>
      <span class="controller">{{ displayController }}</span>
    </div>

    <div class="bar-row">
      <span class="end-label">刻晴</span>
      <div class="track">
        <div
          class="fill-possession"
          :style="{ width: store.data.附身.附身深度 + '%' }"
        ></div>
        <div
          class="fill-resistance"
          :style="{ left: (100 - store.data.刻晴.抵抗意志) + '%', width: store.data.刻晴.抵抗意志 + '%' }"
        ></div>
      </div>
      <span class="end-label">阿赫玛尔</span>
    </div>

    <div class="stats-row">
      <div class="stat">
        <span class="stat-name">附身深度</span>
        <span class="stat-value gold">{{ store.data.附身.附身深度 }}%</span>
      </div>
      <div class="stat">
        <span class="stat-name">抵抗意志</span>
        <span class="stat-value purple">{{ store.data.刻晴.抵抗意志 }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';
const store = useDataStore();

const controlClass = computed(() => {
  const ctrl = store.data.附身.主导意识;
  if (ctrl === '阿赫玛尔') return 'possession--gold';
  if (ctrl === '刻晴') return 'possession--purple';
  return 'possession--struggle';
});

const displayController = computed(() => {
  const ctrl = store.data.附身.主导意识;
  if (ctrl === '阿赫玛尔') return '阿 赫 玛 尔';
  if (ctrl === '刻晴') return '刻 晴';
  return '争 夺 中';
});
</script>

<style lang="scss" scoped>
.possession-panel {
  padding: 10px 12px;
  background: var(--c-gold-bg);
  border-bottom: 2px solid var(--c-border);
  transition: background 0.4s;
}

.possession--gold {
  background: rgba(212, 168, 83, 0.1);
  border-bottom-color: rgba(212, 168, 83, 0.3);
}

.possession--purple {
  background: rgba(176, 124, 216, 0.1);
  border-bottom-color: rgba(176, 124, 216, 0.3);
}

.possession--struggle {
  background: rgba(231, 76, 60, 0.06);
  border-bottom-color: rgba(231, 76, 60, 0.25);
}

.top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.label {
  font-size: 10px;
  color: var(--c-text-dim);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.controller {
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: bold;
  letter-spacing: 4px;
}

.possession--gold .controller { color: var(--c-gold); }
.possession--purple .controller { color: var(--c-purple); }
.possession--struggle .controller {
  color: var(--c-danger);
  animation: pulse 1s infinite;
}

.bar-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
}

.end-label {
  font-size: 10px;
  color: var(--c-text-dim);
  flex-shrink: 0;
}

.track {
  flex: 1;
  height: 14px;
  border: 1.5px solid var(--c-border);
  background: var(--c-bg);
  position: relative;
  overflow: hidden;
}

.fill-possession {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: linear-gradient(90deg, var(--c-gold-dim), var(--c-gold));
  transition: width 0.4s ease;
}

.fill-resistance {
  position: absolute;
  top: 0;
  bottom: 0;
  background: linear-gradient(90deg, var(--c-purple-dim), var(--c-purple));
  opacity: 0.5;
  transition: left 0.4s ease, width 0.4s ease;
}

.stats-row {
  display: flex;
  gap: 16px;
}

.stat {
  display: flex;
  gap: 4px;
  align-items: center;
}

.stat-name {
  font-size: 10px;
  color: var(--c-text-dim);
}

.stat-value {
  font-weight: bold;
  font-size: 11px;
}

.gold { color: var(--c-gold); }
.purple { color: var(--c-purple); }

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>
