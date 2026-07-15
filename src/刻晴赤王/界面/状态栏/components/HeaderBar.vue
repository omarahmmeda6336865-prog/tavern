<template>
  <div class="header-bar">
    <div class="stage-badge" :class="stageClass">
      <span class="stage-text">{{ store.data.核心意识.$堕落阶段 }}</span>
    </div>

    <div class="bars">
      <div class="bar-row">
        <span class="bar-label">堕落</span>
        <div class="bar-track">
          <div
            class="bar-fill corruption"
            :style="{ width: store.data.核心意识.堕落度 + '%' }"
          ></div>
        </div>
        <span class="bar-value">{{ store.data.核心意识.堕落度 }}</span>
      </div>

      <div class="bar-row">
        <span class="bar-label">开发</span>
        <div class="bar-track">
          <div
            class="bar-fill develop"
            :style="{ width: store.data.身体状态.开发度 + '%' }"
          ></div>
        </div>
        <span class="bar-value">{{ store.data.身体状态.开发度 }}</span>
      </div>
    </div>

    <button class="toggle-btn" @click="$emit('toggle')">
      {{ expanded ? '收起' : '展开' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

defineProps<{ expanded: boolean }>();
defineEmits<{ toggle: [] }>();

const store = useDataStore();

const stageClass = computed(() => {
  const stage = store.data.核心意识.$堕落阶段;
  if (['霆霓未黯', '心刃交争'].includes(stage)) return 'stage-early';
  if (['躯壳易主', '神瞳囚笼'].includes(stage)) return 'stage-mid';
  if (['残识旁观', '黄沙浸魂'].includes(stage)) return 'stage-late';
  return 'stage-final';
});
</script>

<style lang="scss" scoped>
.header-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  background: var(--bg-deep);
}

.stage-badge {
  padding: 4px 8px;
  font-size: 12px;
  font-weight: bold;
  white-space: nowrap;
  border: 1px solid;
  min-width: 64px;
  text-align: center;

  &.stage-early {
    color: #a78bfa;
    border-color: #7c3aed;
    background: rgba(124, 58, 237, 0.1);
  }
  &.stage-mid {
    color: #f87171;
    border-color: #dc2626;
    background: rgba(220, 38, 38, 0.1);
  }
  &.stage-late {
    color: var(--gold);
    border-color: var(--gold-dark);
    background: rgba(201, 160, 78, 0.1);
  }
  &.stage-final {
    color: var(--crimson-light);
    border-color: var(--crimson);
    background: rgba(201, 51, 90, 0.15);
    text-shadow: 0 0 6px rgba(201, 51, 90, 0.5);
  }
}

.bars {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.bar-row {
  display: flex;
  align-items: center;
  gap: 4px;
}

.bar-label {
  font-size: 10px;
  color: var(--text-dim);
  width: 24px;
  text-align: right;
  flex-shrink: 0;
}

.bar-track {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-dim);
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  transition: width 0.3s ease;

  &.corruption {
    background: linear-gradient(90deg, var(--crimson), var(--gold));
  }
  &.develop {
    background: linear-gradient(90deg, #d97706, #f59e0b);
  }
}

.bar-value {
  font-size: 10px;
  color: var(--text-secondary);
  width: 22px;
  text-align: right;
  flex-shrink: 0;
}

.toggle-btn {
  padding: 4px 8px;
  border: 1px solid var(--border-dim);
  background: transparent;
  color: var(--text-dim);
  font-family: inherit;
  font-size: 10px;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    color: var(--gold);
    border-color: var(--border-gold);
  }
}
</style>
