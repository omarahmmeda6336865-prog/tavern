<template>
  <div v-if="data" class="maid-layout">
    <div class="maid-header">
      <span class="maid-name">{{ maidName }}</span>
      <span class="maid-status">{{ data.当前状态 }}</span>
    </div>

    <AttireDisplay :data="data.着装" />

    <div class="gap" />

    <ItemList title="持有镜具" :data="data.持有镜具" />
  </div>
  <div v-else class="empty-state">该仕女数据暂未加载</div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';
import AttireDisplay from './AttireDisplay.vue';
import ItemList from './ItemList.vue';

const props = defineProps<{ maidName: string }>();

const store = useDataStore();

const data = computed(() => store.data.仕女团[props.maidName]);
</script>

<style lang="scss" scoped>
.maid-layout {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.maid-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 3px solid var(--c-deep-ice);
}

.maid-name {
  font-size: 1rem;
  font-weight: bold;
  color: var(--c-deep-ice);
}

.maid-status {
  font-size: 0.78rem;
  background: var(--c-slate);
  color: var(--c-ice-blue);
  padding: 3px 8px;
  font-weight: bold;
}

.gap {
  height: 4px;
}

.empty-state {
  text-align: center;
  color: var(--c-mist);
  padding: 20px;
  font-style: italic;
}
</style>
