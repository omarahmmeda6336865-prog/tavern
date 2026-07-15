<template>
  <div class="core-status">
    <div class="grid-2">
      <div class="metric-card">
        <div class="metric-header">
          <span class="metric-icon">◆</span>
          <span class="metric-label">意识清醒度</span>
        </div>
        <div class="metric-gauge">
          <svg viewBox="0 0 80 50">
            <path d="M 8 42 A 32 32 0 0 1 72 42" class="arc-bg" />
            <path
              d="M 8 42 A 32 32 0 0 1 72 42"
              class="arc-fill awake"
              :style="{ strokeDashoffset: awakeArcOffset }"
            />
          </svg>
          <div class="metric-readout">
            <span class="metric-value">{{ store.data.核心意识.意识清醒度 }}</span>
            <span class="metric-unit">%</span>
          </div>
        </div>
        <div class="metric-bar-mini">
          <div class="bar-seg s1"></div><div class="bar-seg s2"></div><div class="bar-seg s3"></div><div class="bar-seg s4"></div><div class="bar-seg s5"></div>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-header">
          <span class="metric-icon">▲</span>
          <span class="metric-label">抵抗意识</span>
        </div>
        <div class="metric-gauge">
          <svg viewBox="0 0 80 50">
            <path d="M 8 42 A 32 32 0 0 1 72 42" class="arc-bg" />
            <path
              d="M 8 42 A 32 32 0 0 1 72 42"
              class="arc-fill resist"
              :style="{ strokeDashoffset: resistArcOffset }"
            />
          </svg>
          <div class="metric-readout">
            <span class="metric-value">{{ store.data.核心意识.抵抗意识 }}</span>
            <span class="metric-unit">%</span>
          </div>
        </div>
        <div class="metric-bar-mini">
          <div class="bar-seg s1"></div><div class="bar-seg s2"></div><div class="bar-seg s3"></div><div class="bar-seg s4"></div><div class="bar-seg s5"></div>
        </div>
      </div>
    </div>

    <div class="info-cards">
      <div class="info-card comport">
        <div class="info-label">当前行为</div>
        <div class="info-text">{{ store.data.身体状态.当前行为 }}</div>
      </div>
      <div class="info-card abnormal">
        <div class="info-label">异常状态</div>
        <div class="info-text">{{ store.data.身体状态.异常状态 || '无' }}</div>
      </div>
    </div>

    <div class="mono-box">
      <div class="mono-head">
        <span class="mono-icon">"</span>
        <span class="mono-label">内心独白</span>
      </div>
      <div class="mono-text">{{ store.data.核心意识.内心独白 }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

const store = useDataStore();

const arcLength = 32 * Math.PI;

const awakeArcOffset = computed(() => {
  return arcLength - (arcLength * store.data.核心意识.意识清醒度) / 100;
});

const resistArcOffset = computed(() => {
  return arcLength - (arcLength * store.data.核心意识.抵抗意识) / 100;
});
</script>

<style lang="scss" scoped>
.core-status {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.metric-card {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
  border: 1px solid var(--border-dim);
  padding: 8px;
  position: relative;
  overflow: hidden;
}

.metric-header {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 2px;
}

.metric-icon {
  font-size: 10px;
  color: var(--gold);
}

.metric-label {
  font-size: 10px;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.metric-gauge {
  position: relative;
  height: 50px;

  svg {
    width: 100%;
    height: 100%;
  }

  .arc-bg {
    fill: none;
    stroke: rgba(255, 255, 255, 0.05);
    stroke-width: 6;
    stroke-linecap: round;
  }

  .arc-fill {
    fill: none;
    stroke-width: 6;
    stroke-linecap: round;
    transition: stroke-dashoffset 0.5s ease;
    stroke-dasharray: 100.53;

    &.awake {
      stroke: #60a5fa;
      filter: drop-shadow(0 0 4px rgba(96, 165, 250, 0.3));
    }
    &.resist {
      stroke: var(--crimson-light);
      filter: drop-shadow(0 0 4px rgba(201, 51, 90, 0.3));
    }
  }

  .metric-readout {
    position: absolute;
    bottom: 4px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: baseline;
    gap: 2px;
  }

  .metric-value {
    font-size: 16px;
    font-weight: bold;
    color: var(--text-primary);
    line-height: 1;
  }

  .metric-unit {
    font-size: 9px;
    color: var(--text-dim);
  }
}

.metric-bar-mini {
  display: flex;
  gap: 2px;
  margin-top: 2px;

  .bar-seg {
    flex: 1;
    height: 2px;
    border-radius: 1px;

    &.s1 { background: rgba(96, 165, 250, 0.2); }
    &.s2 { background: rgba(96, 165, 250, 0.35); }
    &.s3 { background: rgba(96, 165, 250, 0.5); }
    &.s4 { background: rgba(96, 165, 250, 0.7); }
    &.s5 { background: rgba(96, 165, 250, 0.9); }
  }
}

.info-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.info-card {
  padding: 8px;
  border: 1px solid var(--border-dim);
  background: rgba(0, 0, 0, 0.15);

  &.comport {
    border-left: 3px solid var(--gold-dark);
  }
  &.abnormal {
    border-left: 3px solid var(--crimson);
  }
}

.info-label {
  font-size: 9px;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 3px;
}

.info-text {
  font-size: 11px;
  color: var(--text-primary);
  line-height: 1.45;
}

.mono-box {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 100%);
  border: 1px solid var(--border-dim);
  border-left: 2px solid var(--gold-dark);
  padding: 8px 10px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 1px;
    background: linear-gradient(180deg, transparent, var(--gold) 50%, transparent);
  }
}

.mono-head {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 4px;
}

.mono-icon {
  font-size: 18px;
  color: var(--gold-dark);
  font-style: italic;
  line-height: 1;
}

.mono-label {
  font-size: 9px;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.mono-text {
  font-size: 12px;
  color: var(--gold-light);
  font-style: italic;
  line-height: 1.55;
}
</style>
