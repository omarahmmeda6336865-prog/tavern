<template>
  <div>
    <div class="section-head">称号</div>
    <div class="title-grid">
      <div v-for="(title, name) in data" :key="name" class="title-box">
        <span class="title-name">{{ name }}</span>
        <div class="title-effect">{{ title.效果 }}</div>
        <div class="title-quote">"{{ title.自我评价 }}"</div>
      </div>
      <div v-if="_.isEmpty(data)" class="title-box empty">
        <span class="title-name">—</span>
        <div class="title-effect">暂无称号</div>
        <div class="title-quote">"..."</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';

defineProps<{
  data: Record<string, { 效果: string; 自我评价: string }>;
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

.title-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 8px;
}

.title-box {
  border: 1.5px solid var(--c-slate);
  padding: 7px;
  background: #fff;
  box-shadow: 2px 2px 0 var(--c-mist);
}

.title-box.empty {
  opacity: 0.5;
  box-shadow: none;
}

.title-name {
  background: var(--c-slate);
  color: var(--c-ice-blue);
  display: inline-block;
  padding: 2px 5px;
  font-size: 0.72rem;
  font-weight: bold;
  margin-bottom: 4px;
}

.title-effect {
  font-size: 0.78rem;
  margin-bottom: 3px;
  color: var(--c-slate);
}

.title-quote {
  font-size: 0.7rem;
  color: var(--c-ice-blue);
  font-style: italic;
}

@media (max-width: 600px) {
  .title-grid { grid-template-columns: 1fr; }
}
</style>
