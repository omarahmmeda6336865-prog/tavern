<template>
  <div v-if="data" class="target-layout">
    <div class="target-header">
      <div class="target-row">
        <span class="target-name">{{ targetName }}</span>
        <span class="target-stage">{{ data.$堕落阶段 }}</span>
      </div>
      <div class="target-mood">{{ data.当前心境 }}</div>
    </div>

    <div class="bars-section">
      <CorruptionBar label="堕落值" :value="data.堕落值" />
      <CorruptionBar label="依存值" :value="data.依存值" :reverse-color="false" />
      <CorruptionBar label="羞耻心" :value="data.羞耻心" :reverse-color="true" />
      <CorruptionBar label="可疑度" :value="data.社交可疑度" />
    </div>

    <div class="gap" />

    <div class="section-head">身体开发度</div>
    <div class="dev-grid">
      <div class="dev-item">
        <span class="dev-label">口唇</span>
        <div class="bar-track">
          <div class="bar-fill" :style="{ width: data.口唇开发度 + '%' }"></div>
        </div>
        <span class="dev-value">{{ data.口唇开发度 }}</span>
      </div>
      <div class="dev-item">
        <span class="dev-label">双乳</span>
        <div class="bar-track">
          <div class="bar-fill" :style="{ width: data.双乳开发度 + '%' }"></div>
        </div>
        <span class="dev-value">{{ data.双乳开发度 }}</span>
      </div>
      <div class="dev-item">
        <span class="dev-label">阴部</span>
        <div class="bar-track">
          <div class="bar-fill" :style="{ width: data.阴部开发度 + '%' }"></div>
        </div>
        <span class="dev-value">{{ data.阴部开发度 }}</span>
      </div>
      <div class="dev-item">
        <span class="dev-label">后庭</span>
        <div class="bar-track">
          <div class="bar-fill" :style="{ width: data.后庭开发度 + '%' }"></div>
        </div>
        <span class="dev-value">{{ data.后庭开发度 }}</span>
      </div>
    </div>

    <div class="gap" />

    <TitleGrid :data="data.称号" />

    <div class="gap" />

    <div class="section-head">神之眼</div>
    <div class="vision-box">{{ data.神之眼 }}</div>

    <div class="gap" />

    <AttireDisplay :data="data.着装" />

    <div class="gap" />

    <div>
      <div class="section-head">身体状态</div>
      <div v-if="!_.isEmpty(data.身体状态)" class="status-list">
        <div v-for="(desc, rounds) in data.身体状态" :key="rounds" class="status-badge">
          <span class="status-desc">{{ desc }}</span>
          <span class="status-rounds">剩余 {{ rounds }} 轮</span>
        </div>
      </div>
      <div v-else class="empty-state">状态正常</div>
    </div>

    <div class="gap" />

    <div>
      <div class="section-head">关键记忆</div>
      <div v-if="!_.isEmpty(data.关键记忆)" class="memory-list">
        <div v-for="(desc, title) in data.关键记忆" :key="title" class="memory-item">
          <span class="memory-title">{{ title }}</span>
          <span class="memory-desc">{{ desc }}</span>
        </div>
      </div>
      <div v-else class="empty-state">暂无关键记忆</div>
    </div>
  </div>
  <div v-else class="empty-state">该目标角色数据暂未加载</div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import AttireDisplay from './AttireDisplay.vue';
import CorruptionBar from './CorruptionBar.vue';
import TitleGrid from './TitleGrid.vue';
import { useDataStore } from '../store';

const props = defineProps<{ targetName: string }>();

const store = useDataStore();

const data = computed(() => store.data.目标角色[props.targetName]);
</script>

<style lang="scss" scoped>
.target-layout {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.target-header {
  padding-bottom: 10px;
  border-bottom: 3px solid var(--c-corruption);
}

.target-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.target-name {
  font-size: 1rem;
  font-weight: bold;
  color: var(--c-deep-ice);
}

.target-stage {
  font-size: 0.78rem;
  background: var(--c-corruption);
  color: var(--c-frost);
  padding: 2px 8px;
  font-weight: bold;
}

.target-mood {
  margin-top: 6px;
  font-size: 0.82rem;
  color: var(--c-slate);
  font-style: italic;
}

.bars-section {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.gap {
  height: 4px;
}

.section-head {
  font-size: 0.85rem;
  font-weight: bold;
  margin-bottom: 8px;
  padding-bottom: 4px;
  border-bottom: 2px solid var(--c-ice-blue);
  display: inline-block;
  color: var(--c-slate);
}

.dev-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.dev-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 0;
}

.dev-label {
  font-weight: bold;
  font-size: 0.78rem;
  min-width: 32px;
  color: var(--c-slate);
}

.dev-value {
  font-weight: bold;
  font-size: 0.72rem;
  min-width: 28px;
  text-align: right;
  color: var(--c-soft-red);
}

.bar-track {
  flex: 1;
  height: 8px;
  border: 1.5px solid var(--c-slate);
  background: #fff;
  position: relative;
  overflow: hidden;
}

.bar-fill {
  position: absolute;
  left: 0; top: 0; bottom: 0;
  background: var(--c-soft-pink);
  border-right: 1.5px solid var(--c-slate);
  transition: width 0.3s ease;
}

.vision-box {
  border: 1.5px solid var(--c-slate);
  padding: 8px;
  background: #fff;
  font-size: 0.82rem;
  color: var(--c-slate);
  font-style: italic;
  box-shadow: 2px 2px 0 var(--c-mist);
}

.status-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.status-badge {
  border: 1.5px solid var(--c-soft-red);
  padding: 5px 8px;
  background: #fff;
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-desc {
  font-size: 0.8rem;
  color: var(--c-slate);
  font-weight: bold;
}

.status-rounds {
  font-size: 0.7rem;
  color: var(--c-soft-red);
}

.memory-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.memory-item {
  border: 1.5px solid var(--c-mist);
  padding: 6px 8px;
  background: #fff;
  display: flex;
  gap: 8px;
  align-items: baseline;
}

.memory-title {
  font-weight: bold;
  font-size: 0.78rem;
  color: var(--c-corruption);
  min-width: 80px;
}

.memory-desc {
  font-size: 0.76rem;
  color: var(--c-slate);
}

.empty-state {
  text-align: center;
  color: var(--c-mist);
  padding: 8px;
  font-style: italic;
  font-size: 0.8rem;
}

@media (max-width: 600px) {
  .dev-grid { grid-template-columns: 1fr; }
  .memory-item { flex-direction: column; }
}
</style>
