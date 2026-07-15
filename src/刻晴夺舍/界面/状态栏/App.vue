<template>
  <div class="card">
    <WorldHeader />
    <PossessionPanel />
    <div class="dual-column">
      <BodyPanel />
      <KeqingMind />
    </div>
    <OutfitSection />
  </div>
</template>

<script setup lang="ts">
import WorldHeader from './components/WorldHeader.vue';
import PossessionPanel from './components/PossessionPanel.vue';
import BodyPanel from './components/BodyPanel.vue';
import KeqingMind from './components/KeqingMind.vue';
import OutfitSection from './components/OutfitSection.vue';
import { MOCK_INIT_DATA, useDataStore } from './store';

// 本地开发预览：在酒馆环境外使用 mock 数据
const store = useDataStore();
if (typeof getCurrentMessageId === 'undefined') {
  Object.assign(store.data, MOCK_INIT_DATA);
}
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  max-width: 680px;
  background: var(--c-card);
  border: 2px solid var(--c-border);
  display: flex;
  flex-direction: column;
  font-family: var(--font-main);
  color: var(--c-text);
  font-size: 12px;
  line-height: 1.45;
  margin: 0 auto;
  box-shadow: 0 0 24px rgba(212, 168, 83, 0.06);
}

.dual-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border-top: 1px solid var(--c-border);
}

@media (max-width: 480px) {
  .dual-column {
    grid-template-columns: 1fr;
  }
}
</style>
