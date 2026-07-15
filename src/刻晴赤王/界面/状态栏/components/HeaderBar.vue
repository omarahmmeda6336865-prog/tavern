<template>
  <div class="header-bar">
    <div class="stage-section">
      <div class="stage-ring" :class="ringClass">
        <svg viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="26" class="ring-bg" />
          <circle
            cx="30" cy="30" r="26"
            class="ring-fill"
            :style="{ strokeDashoffset: corruptionOffset }"
          />
        </svg>
        <div class="ring-inner">
          <span class="ring-value">{{ store.data.核心意识.堕落度 }}</span>
        </div>
      </div>
      <div class="stage-info">
        <div class="stage-title" :class="ringClass">{{ store.data.核心意识.$堕落阶段 }}</div>
        <div class="stage-sub">堕落度</div>
      </div>
    </div>

    <div class="dev-section">
      <div class="mini-gauge">
        <svg viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="16" class="gauge-bg" />
          <circle
            cx="20" cy="20" r="16"
            class="gauge-fill dev"
            :style="{ strokeDashoffset: devOffset }"
          />
        </svg>
        <div class="gauge-label">
          <span class="gauge-value">{{ store.data.身体状态.开发度 }}</span>
          <span class="gauge-sub">开发</span>
        </div>
      </div>
    </div>

    <button class="toggle-btn" @click="$emit('toggle')">
      <span class="toggle-icon">{{ expanded ? '▼' : '▲' }}</span>
      <span class="toggle-text">{{ expanded ? '收起' : '展开' }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

defineProps<{ expanded: boolean }>();
defineEmits<{ toggle: [] }>();

const store = useDataStore();

const ringClass = computed(() => {
  const stage = store.data.核心意识.$堕落阶段;
  if (['霆霓未黯', '心刃交争'].includes(stage)) return 'ring-early';
  if (['躯壳易主', '神瞳囚笼'].includes(stage)) return 'ring-mid';
  if (['残识旁观', '黄沙浸魂'].includes(stage)) return 'ring-late';
  return 'ring-final';
});

const ringCircumference = 2 * Math.PI * 26;
const corruptionOffset = computed(() => {
  return ringCircumference - (ringCircumference * store.data.核心意识.堕落度) / 100;
});
const devOffset = computed(() => {
  const circ = 2 * Math.PI * 16;
  return circ - (circ * store.data.身体状态.开发度) / 100;
});
</script>

<style lang="scss" scoped>
.header-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(4px);
}

.stage-section {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
}

.stage-ring {
  width: 60px;
  height: 60px;
  position: relative;
  flex-shrink: 0;

  svg {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }

  .ring-bg {
    fill: none;
    stroke: rgba(255, 255, 255, 0.04);
    stroke-width: 3;
  }

  .ring-fill {
    fill: none;
    stroke-width: 3;
    stroke-linecap: round;
    transition: stroke-dashoffset 0.5s ease;
  }
}

.ring-early .ring-fill {
  stroke: #a78bfa;
  filter: drop-shadow(0 0 4px rgba(167, 139, 250, 0.4));
  stroke-dasharray: 163.36;
}
.ring-mid .ring-fill {
  stroke: #f87171;
  filter: drop-shadow(0 0 4px rgba(248, 113, 113, 0.4));
  stroke-dasharray: 163.36;
}
.ring-late .ring-fill {
  stroke: var(--gold);
  filter: drop-shadow(0 0 4px rgba(201, 160, 78, 0.4));
  stroke-dasharray: 163.36;
}
.ring-final .ring-fill {
  stroke: var(--crimson-light);
  filter: drop-shadow(0 0 6px rgba(201, 51, 90, 0.6));
  stroke-dasharray: 163.36;
}

.ring-inner {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ring-value {
  font-size: 16px;
  font-weight: bold;
  color: var(--text-primary);
}

.stage-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.stage-title {
  font-size: 14px;
  font-weight: bold;
  white-space: nowrap;

  &.ring-early { color: #a78bfa; text-shadow: 0 0 6px rgba(167, 139, 250, 0.3); }
  &.ring-mid { color: #f87171; text-shadow: 0 0 6px rgba(248, 113, 113, 0.3); }
  &.ring-late { color: var(--gold); text-shadow: 0 0 6px rgba(201, 160, 78, 0.3); }
  &.ring-final { color: var(--crimson-light); text-shadow: 0 0 8px rgba(201, 51, 90, 0.5); animation: pulse-final 2s ease-in-out infinite; }
}

@keyframes pulse-final {
  0%, 100% { text-shadow: 0 0 8px rgba(201, 51, 90, 0.4); }
  50% { text-shadow: 0 0 16px rgba(201, 51, 90, 0.8); }
}

.stage-sub {
  font-size: 9px;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.dev-section {
  flex-shrink: 0;
}

.mini-gauge {
  width: 40px;
  height: 40px;
  position: relative;

  svg {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }

  .gauge-bg {
    fill: none;
    stroke: rgba(255, 255, 255, 0.04);
    stroke-width: 2.5;
  }

  .gauge-fill {
    fill: none;
    stroke-width: 2.5;
    stroke-linecap: round;
    transition: stroke-dashoffset 0.5s ease;

    &.dev {
      stroke: #f59e0b;
      filter: drop-shadow(0 0 3px rgba(245, 158, 11, 0.4));
      stroke-dasharray: 100.53;
    }
  }

  .gauge-label {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .gauge-value {
    font-size: 11px;
    font-weight: bold;
    color: var(--text-primary);
    line-height: 1;
  }

  .gauge-sub {
    font-size: 7px;
    color: var(--text-dim);
    text-transform: uppercase;
  }
}

.toggle-btn {
  padding: 6px 8px;
  border: 1px solid var(--border-dim);
  background: rgba(255, 255, 255, 0.02);
  color: var(--text-dim);
  font-family: inherit;
  font-size: 10px;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  transition: all 0.2s;

  &:hover {
    color: var(--gold);
    border-color: var(--border-gold);
    background: rgba(201, 160, 78, 0.06);
  }
}

.toggle-icon {
  font-size: 10px;
  line-height: 1;
}

.toggle-text {
  font-size: 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
}
</style>
