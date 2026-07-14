<template>
  <div>
    <div class="section-head">着装</div>
    <div class="attire-grid">
      <div v-for="slot in attireSlots" :key="slot" class="attire-item">
        <span class="attire-slot">{{ slot }}</span>
        <span class="attire-desc">{{ data[slot] || '—' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  data: Record<string, string>;
}>();

const attireSlots = ['上身', '下身', '腿部与鞋履', '手部', '内衣', '装饰'];
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

.attire-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 6px;
}

.attire-item {
  border: 1.5px solid var(--c-mist);
  padding: 6px;
  background: #fff;
  font-size: 0.78rem;
}

.attire-slot {
  color: var(--c-ice-blue);
  font-size: 0.7rem;
  font-weight: bold;
  display: block;
  margin-bottom: 2px;
}

.attire-desc {
  color: var(--c-slate);
}
</style>
