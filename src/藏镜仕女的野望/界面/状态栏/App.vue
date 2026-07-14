<template>
  <div class="card">
    <div class="header-bar">
      <span class="header-title">藏镜仕女录</span>
      <span class="header-sub">——为了女皇的至高荣耀</span>
    </div>

    <div class="main-layout">
      <div class="sidebar">
        <WorldSection />

        <div class="side-tab-group">
          <button
            v-for="tab in main_tabs"
            :key="tab.id"
            class="side-tab"
            :class="{ active: main_tab === tab.id }"
            @click="switchMainTab(tab.id)"
          >
            {{ tab.label }}
          </button>
        </div>
        <div class="char-list">
          <button
            v-for="ch in char_tabs"
            :key="ch.id"
            class="char-btn"
            :class="{ active: char_tab === ch.id }"
            @click="char_tab = ch.id"
          >
            {{ ch.label }}
          </button>
          <div v-if="char_tabs.length === 0" class="empty-char">暂无</div>
        </div>
      </div>

      <div class="main-panel">
        <MaidPanel v-if="main_tab === '仕女' && char_tab" :maid-name="char_tab" />
        <TargetPanel v-else-if="main_tab === '目标' && char_tab" :target-name="char_tab" />
        <div v-else class="empty-state">请选择一个角色</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import MaidPanel from './components/MaidPanel.vue';
import TargetPanel from './components/TargetPanel.vue';
import WorldSection from './components/WorldSection.vue';
import { useDataStore } from './store';

const store = useDataStore();

const main_tabs = computed(() => [
  { id: '仕女', label: '仕女名单' },
  { id: '目标', label: '招募名单' },
]);

const main_tab = ref<string | null>('仕女');
const char_tab = ref<string | null>(null);

const char_tabs = computed(() => {
  if (main_tab.value === '仕女') {
    return _.keys(store.data.仕女团).map(name => ({ id: name, label: name }));
  }
  return _.keys(store.data.目标角色).map(name => ({ id: name, label: name }));
});

function switchMainTab(id: string) {
  main_tab.value = id;
  const keys =
    id === '仕女' ? _.keys(store.data.仕女团) : _.keys(store.data.目标角色);
  char_tab.value = keys.length > 0 ? keys[0] : null;
}

watch(
  store.data,
  () => {
    const keys =
      main_tab.value === '仕女'
        ? _.keys(store.data.仕女团)
        : _.keys(store.data.目标角色);
    if (!char_tab.value || !(keys as string[]).includes(char_tab.value)) {
      char_tab.value = keys.length > 0 ? keys[0] : null;
    }
  },
  { immediate: false },
);
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  max-width: 1100px;
  background-color: var(--c-frost);
  border: 3px solid var(--c-slate);
  box-shadow: 5px 5px 0px rgba(44, 62, 80, 0.18);
  display: flex;
  flex-direction: column;
  font-family: var(--font-mirror);
  color: var(--c-slate);
  font-size: 13px;
  line-height: 1.4;
  margin: 0 auto;
}

.header-bar {
  display: flex;
  align-items: baseline;
  padding: 5px 14px;
  border-bottom: 2px solid var(--c-slate);
  background: linear-gradient(90deg, var(--c-deep-ice), var(--c-slate));
  color: var(--c-frost);
}

.header-title {
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 2px;
}

.header-sub {
  margin-left: auto;
  font-size: 0.68rem;
  opacity: 0.55;
  font-style: italic;
}

.main-layout {
  display: flex;
  flex: 1;
  min-height: 0;
}

/* ===== 左侧栏 ===== */
.sidebar {
  width: 148px;
  min-width: 148px;
  background: var(--c-slate);
  display: flex;
  flex-direction: column;
  border-right: 3px solid var(--c-deep-ice);
}

.side-tab-group {
  display: flex;
  flex-direction: column;
}

.side-tab {
  padding: 5px 8px;
  border: none;
  background: transparent;
  color: rgba(232, 240, 248, 0.5);
  font-size: 0.66rem;
  font-weight: bold;
  font-family: var(--font-mirror);
  cursor: pointer;
  transition: all 0.15s;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.side-tab:hover {
  background: rgba(91, 155, 213, 0.2);
  color: #fff;
}

.side-tab.active {
  background: var(--c-ice-blue);
  color: var(--c-frost);
}

.char-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.char-btn {
  padding: 4px 8px;
  border: none;
  background: transparent;
  color: rgba(232, 240, 248, 0.6);
  font-size: 0.66rem;
  font-family: var(--font-mirror);
  cursor: pointer;
  transition: all 0.12s;
  text-align: left;
  border-left: 3px solid transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.char-btn:hover {
  background: rgba(91, 155, 213, 0.15);
  color: #fff;
  border-left-color: var(--c-ice-blue);
}

.char-btn.active {
  background: var(--c-frost);
  color: var(--c-slate);
  border-left-color: var(--c-corruption);
  font-weight: bold;
}

.empty-char {
  padding: 10px;
  font-size: 0.62rem;
  color: rgba(232, 240, 248, 0.2);
  text-align: center;
  font-style: italic;
}

/* ===== 右侧主面板 ===== */
.main-panel {
  flex: 1;
  padding: 12px;
  overflow-y: auto;
  animation: fadeEffect 0.3s;
}

.empty-state {
  text-align: center;
  color: var(--c-mist);
  padding: 40px 20px;
  font-style: italic;
  font-size: 0.85rem;
}

@keyframes fadeEffect {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
