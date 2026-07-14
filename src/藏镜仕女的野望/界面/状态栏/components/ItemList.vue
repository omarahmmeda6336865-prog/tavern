<template>
  <div>
    <div class="section-head">{{ title }}</div>
    <div v-if="!_.isEmpty(data)" class="item-list">
      <div v-for="(info, key) in data" :key="key" class="item-card">
        <div class="item-header">
          <span class="item-icon">{{ key.substring(0, 2) }}</span>
          <span class="item-key">{{ key }}</span>
        </div>
        <div class="item-body">
          <div class="item-desc">{{ info.描述 }}</div>
          <div class="item-effect">{{ info.效果 }}</div>
        </div>
      </div>
    </div>
    <div v-else class="empty-state">暂无物品</div>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';

defineProps<{
  title: string;
  data: Record<string, { 描述: string; 效果: string }>;
}>();
</script>

<style lang="scss" scoped>
.section-head {
  font-size: 0.85rem;
  font-weight: bold;
  margin-bottom: 8px;
  padding-bottom: 4px;
  border-bottom: 2px solid var(--c-ice-blue);
  display: inline-block;
  color: var(--c-slate);
}

.item-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.item-card {
  border: 1.5px solid var(--c-slate);
  background: #fff;
  transition: transform 0.15s;
}

.item-card:hover {
  transform: translateX(4px);
  background: var(--c-frost);
}

.item-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 8px;
  background: var(--c-mist);
  border-bottom: 1px solid var(--c-slate);
}

.item-icon {
  width: 24px;
  height: 24px;
  background: var(--c-slate);
  color: var(--c-ice-blue);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.6rem;
}

.item-key {
  font-weight: bold;
  font-size: 0.82rem;
  color: var(--c-slate);
}

.item-body {
  padding: 6px 8px;
}

.item-desc {
  font-size: 0.78rem;
  color: var(--c-slate);
  margin-bottom: 2px;
}

.item-effect {
  font-size: 0.7rem;
  color: var(--c-corruption);
  font-style: italic;
}

.empty-state {
  text-align: center;
  color: var(--c-mist);
  padding: 12px;
  font-style: italic;
  font-size: 0.8rem;
}
</style>
