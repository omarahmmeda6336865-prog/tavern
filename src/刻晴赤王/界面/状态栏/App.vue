<template>
  <div class="card">
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
            {{ tab.label }}
          </button>
        </div>
        <div class="tab-content">
          <SensePanel v-if="active_tab === 'sense'" />
          <AttirePanel v-else-if="active_tab === 'attire'" />
          <WorldPanel v-else-if="active_tab === 'world'" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';
import CoreStatus from './components/CoreStatus.vue';
import HeaderBar from './components/HeaderBar.vue';
import SensePanel from './components/SensePanel.vue';
import AttirePanel from './components/AttirePanel.vue';
import WorldPanel from './components/WorldPanel.vue';

const expanded = useLocalStorage('keqing:ui_expanded', true);
const active_tab = useLocalStorage<string>('keqing:ui_tab', 'sense');

const tabs = [
  { id: 'sense', label: '观感' },
  { id: 'attire', label: '服饰' },
  { id: 'world', label: '世界' },
];
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  background: var(--bg-panel);
  border: 1px solid var(--border-gold);
  font-family: var(--font-main);
  color: var(--text-primary);
  font-size: 12px;
  line-height: 1.4;
  overflow: hidden;
}

.layer2 {
  border-top: 1px solid var(--border-dim);
}

.layer3 {
  border-top: 1px solid var(--border-dim);
}

.tab-bar {
  display: flex;
  border-bottom: 1px solid var(--border-gold);
}

.tab-btn {
  flex: 1;
  padding: 6px 0;
  border: none;
  background: var(--bg-deep);
  color: var(--text-dim);
  font-family: inherit;
  font-size: 11px;
  cursor: pointer;
  transition: all 0.2s;

  &.active {
    color: var(--gold);
    background: var(--bg-card);
    border-bottom: 2px solid var(--gold);
  }

  &:hover:not(.active) {
    color: var(--text-secondary);
  }
}

.tab-content {
  padding: 10px;
  min-height: 0;
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
