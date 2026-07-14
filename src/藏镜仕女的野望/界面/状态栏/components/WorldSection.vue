<template>
  <div class="world-box">
    <div class="world-day">第{{ store.data.世界.当前天数 }}天</div>
    <div class="world-loc">{{ store.data.世界.当前地点 }}</div>
    <div class="world-chapter">{{ store.data.世界.当前篇章 }}</div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';
const store = useDataStore();
</script>

<style lang="scss" scoped>
.world-box {
  margin: 6px 5px;
  padding: 5px 7px;
  border: 1px dashed rgba(232, 240, 248, 0.25);
  font-size: 0.62rem;
  color: rgba(232, 240, 248, 0.55);
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.world-day { color: var(--c-ice-blue); }
.world-loc { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.world-chapter { color: var(--c-corruption); opacity: 0.8; }
</style>
