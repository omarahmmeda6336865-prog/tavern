<template>
  <div class="body-panel">
    <div class="section-title">&#x2665; 身体状态</div>

    <div class="pleasure-row">
      <span class="sub-label">快感度</span>
      <div class="track">
        <div class="fill" :style="{ width: store.data.身体.快感度 + '%' }"></div>
      </div>
      <span class="value danger">{{ store.data.身体.快感度 }}%</span>
    </div>

    <div class="action-block">
      <span class="sub-label">当前行为</span>
      <p class="action-text">{{ store.data.身体.当前行为 }}</p>
    </div>

    <div v-if="!_.isEmpty(store.data.身体.异常状态)" class="abnormal-section">
      <span class="sub-label danger">&plus; 异常状态</span>
      <div class="abnormal-tags">
        <button
          v-for="(desc, name) in store.data.身体.异常状态"
          :key="name"
          class="abnormal-tag"
          :class="{ 'tag--active': activeTag === name }"
          type="button"
          @click="toggleTag(name)"
        >
          {{ name }}
        </button>
      </div>
      <Transition name="popup">
        <div v-if="activeTag" class="abnormal-popup" @click.stop>
          <div class="popup-header">
            <span class="popup-name">{{ activeTag }}</span>
            <button class="popup-close" type="button" @click="activeTag = null">&times;</button>
          </div>
          <p class="popup-desc">{{ store.data.身体.异常状态[activeTag] }}</p>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { useDataStore } from '../store';
const store = useDataStore();
const activeTag = ref<string | null>(null);

function toggleTag(name: string) {
  activeTag.value = activeTag.value === name ? null : name;
}
</script>

<style lang="scss" scoped>
.body-panel {
  padding: 10px 10px 12px;
  border-right: 1px solid var(--c-border);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.section-title {
  font-size: 11px;
  font-weight: bold;
  color: var(--c-text-bright);
  border-bottom: 1px solid var(--c-border);
  padding-bottom: 4px;
}

.sub-label {
  font-size: 10px;
  color: var(--c-text-dim);
  display: block;
  margin-bottom: 2px;
}

.pleasure-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.track {
  flex: 1;
  height: 8px;
  border: 1px solid var(--c-border);
  background: var(--c-bg);
  overflow: hidden;
}

.fill {
  height: 100%;
  background: linear-gradient(90deg, #c0392b, var(--c-danger));
  transition: width 0.4s ease;
}

.value {
  font-weight: bold;
  font-size: 11px;
  min-width: 32px;
  text-align: right;
}

.danger { color: var(--c-danger); }

.action-block { flex: 1; }

.action-text {
  font-size: 11px;
  color: var(--c-text);
  line-height: 1.5;
  margin-top: 2px;
}

.abnormal-section {
  position: relative;
}

.sub-label.danger { color: var(--c-danger); }

.abnormal-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 4px;
}

.abnormal-tag {
  font-size: 10px;
  font-family: inherit;
  padding: 2px 8px;
  border: 1px solid rgba(231, 76, 60, 0.4);
  border-radius: 3px;
  background: var(--c-danger-bg);
  color: var(--c-danger);
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
  line-height: 1.5;
}

.abnormal-tag:hover {
  background: rgba(231, 76, 60, 0.14);
  border-color: rgba(231, 76, 60, 0.6);
}

.tag--active {
  background: rgba(231, 76, 60, 0.18);
  border-color: var(--c-danger);
}

.abnormal-popup {
  position: absolute;
  bottom: calc(100% + 6px);
  left: 0;
  right: 0;
  background: var(--c-card);
  border: 2px solid rgba(231, 76, 60, 0.4);
  padding: 8px 10px;
  z-index: 10;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  padding-bottom: 4px;
  border-bottom: 1px solid var(--c-border);
}

.popup-name {
  font-size: 11px;
  font-weight: bold;
  color: var(--c-danger);
}

.popup-close {
  background: none;
  border: none;
  color: var(--c-text-dim);
  font-size: 16px;
  cursor: pointer;
  line-height: 1;
  padding: 0 2px;
  font-family: inherit;
}

.popup-close:hover { color: var(--c-text-bright); }

.popup-desc {
  font-size: 10.5px;
  color: var(--c-text);
  line-height: 1.5;
}

.popup-enter-active,
.popup-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: translateY(4px);
}
</style>
