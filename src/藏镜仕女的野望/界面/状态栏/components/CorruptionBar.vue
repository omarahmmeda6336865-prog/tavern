<template>
  <div class="bar-strip">
    <span class="bar-label">{{ label }}</span>
    <div class="bar-track">
      <div class="bar-fill" :class="fillClass" :style="{ width: clampedValue + '%' }"></div>
    </div>
    <span class="bar-value">{{ clampedValue }}%</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string;
  value: number;
  clamp?: boolean;
  reverseColor?: boolean;
}>();

const clampedValue = computed(() =>
  props.clamp !== false ? Math.min(100, Math.max(0, props.value)) : props.value,
);

const fillClass = computed(() => {
  if (!props.reverseColor) {
    if (clampedValue.value >= 90) return 'fill-danger';
    if (clampedValue.value >= 70) return 'fill-warning';
    if (clampedValue.value >= 30) return 'fill-mid';
    return 'fill-low';
  }
  if (clampedValue.value <= 30) return 'fill-danger';
  if (clampedValue.value <= 50) return 'fill-warning';
  if (clampedValue.value <= 70) return 'fill-mid';
  return 'fill-low';
});
</script>

<style lang="scss" scoped>
.bar-strip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
}

.bar-label {
  font-weight: bold;
  font-size: 0.8rem;
  min-width: 60px;
  text-align: right;
  color: var(--c-slate);
}

.bar-value {
  font-weight: bold;
  font-size: 0.78rem;
  min-width: 36px;
  color: var(--c-ice-blue);
}

.bar-track {
  flex: 1;
  height: 10px;
  border: 1.5px solid var(--c-slate);
  background: #fff;
  position: relative;
  overflow: hidden;
}

.bar-fill {
  position: absolute;
  left: 0; top: 0; bottom: 0;
  transition: width 0.3s ease;
  border-right: 1.5px solid var(--c-slate);
}

.fill-low { background: var(--c-ice-blue); }
.fill-mid { background: var(--c-gold); }
.fill-warning { background: var(--c-soft-red); }
.fill-danger { background: var(--c-corruption); }
</style>
