<template>
  <div class="card" :class="stageTheme">
    <div class="card-ornament top"></div>

    <HeaderBar :expanded="expanded" @toggle="expanded = !expanded" />

    <transition name="slide">
      <div v-if="expanded" class="layer2">
        <CoreStatus />
      </div>
    </transition>

    <transition name="slide">
      <div v-if="expanded" class="layer3">
        <div class="tab-bar">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="tab-btn"
            :class="{ active: active_tab === tab.id }"
            @click="active_tab = tab.id"
          >
            <span class="tab-icon">{{ tab.icon }}</span>
            <span class="tab-label">{{ tab.label }}</span>
          </button>
        </div>
        <div class="tab-content">
          <SensePanel v-if="active_tab === 'sense'" />
          <AttirePanel v-else-if="active_tab === 'attire'" />
          <WorldPanel v-else-if="active_tab === 'world'" />
        </div>
      </div>
    </transition>

    <div class="card-ornament bottom"></div>
  </div>
</template>

<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';
import { computed } from 'vue';
import AttirePanel from './components/AttirePanel.vue';
import CoreStatus from './components/CoreStatus.vue';
import HeaderBar from './components/HeaderBar.vue';
import SensePanel from './components/SensePanel.vue';
import WorldPanel from './components/WorldPanel.vue';
import { useDataStore } from './store';

const store = useDataStore();
const expanded = useLocalStorage('keqing:ui_expanded', true);
const active_tab = useLocalStorage<string>('keqing:ui_tab', 'sense');

const stageTheme = computed(() => {
  const stage = store.data.核心意识.$堕落阶段;
  if (['霆霓未黯', '心刃交争'].includes(stage)) return 'theme-early';
  if (['躯壳易主', '神瞳囚笼'].includes(stage)) return 'theme-mid';
  if (['残识旁观', '黄沙浸魂'].includes(stage)) return 'theme-late';
  return 'theme-final';
});

const tabs = [
  { id: 'sense', label: '观感', icon: '◎' },
  { id: 'attire', label: '服饰', icon: '◆' },
  { id: 'world', label: '世界', icon: '◈' },
];
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  font-family: var(--font-main);
  color: var(--text-primary);
  font-size: 12px;
  line-height: 1.4;
  overflow: hidden;
  position: relative;

  .card-ornament {
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      var(--gold-dark) 15%,
      var(--gold) 50%,
      var(--gold-dark) 85%,
      transparent 100%
    );
  }

  &.theme-early {
    background: linear-gradient(180deg, #1a1028 0%, #1a1008 100%);
    border: 1px solid #7c3aed55;
    box-shadow: 0 0 20px rgba(124, 58, 237, 0.1);
  }
  &.theme-mid {
    background: linear-gradient(180deg, #200808 0%, #1a1008 100%);
    border: 1px solid #dc262655;
    box-shadow: 0 0 20px rgba(220, 38, 38, 0.1);
  }
  &.theme-late {
    background: linear-gradient(180deg, #2d1f0e 0%, #1a1008 100%);
    border: 1px solid #8b6914;
    box-shadow: 0 0 20px rgba(201, 160, 78, 0.08);
  }
  &.theme-final {
    background: linear-gradient(180deg, #3a1a1a 0%, #1a1008 100%);
    border: 1px solid #c9335a;
    box-shadow: 0 0 24px rgba(201, 51, 90, 0.15);
  }
}

.layer2 {
  border-top: 1px solid var(--border-dim);
}

.layer3 {
  border-top: 1px solid var(--border-dim);
}

.tab-bar {
  display: flex;
  border-bottom: 1px solid rgba(139, 105, 20, 0.4);
  background: rgba(0, 0, 0, 0.15);
}

.tab-btn {
  flex: 1;
  padding: 7px 0;
  border: none;
  background: transparent;
  color: var(--text-dim);
  font-family: inherit;
  font-size: 11px;
  cursor: pointer;
  transition: all 0.25s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  &.active {
    color: var(--gold);
    background: rgba(201, 160, 78, 0.06);
    border-bottom: 2px solid var(--gold);
    text-shadow: 0 0 8px rgba(201, 160, 78, 0.3);
  }

  &:hover:not(.active) {
    color: var(--text-secondary);
    background: rgba(255, 255, 255, 0.02);
  }
}

.tab-icon {
  font-size: 14px;
}

.tab-content {
  padding: 10px;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  max-height: 800px;
  opacity: 1;
}
</style>
