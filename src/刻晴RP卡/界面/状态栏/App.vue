<template>
  <div
    v-if="data"
    class="flex items-center gap-3 px-3 py-2 bg-gray-900/90 border border-gray-700 rounded-lg text-xs"
    style="width: 100%; max-width: 480px;"
  >
    <!-- Stage -->
    <div class="flex items-center gap-1 shrink-0">
      <span class="text-gray-500">ST</span>
      <span class="font-mono font-bold text-sm" :class="stageColor">{{ stage }}</span>
      <span class="text-gray-500 hidden sm:inline">{{ stageLabel }}</span>
    </div>

    <div class="w-px h-4 bg-gray-700 shrink-0"></div>

    <!-- Pleasure gauge -->
    <div class="flex-1 min-w-0">
      <div class="flex items-center justify-between mb-0.5">
        <span class="text-gray-500">快感</span>
        <span class="font-mono text-purple-300">{{ pleasure }}</span>
      </div>
      <div class="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <div
          class="h-full rounded-full transition-all duration-500"
          :class="pleasure < 30 ? 'bg-blue-500' : pleasure < 60 ? 'bg-yellow-500' : pleasure < 85 ? 'bg-orange-500' : 'bg-red-500'"
          :style="{ width: pleasure + '%' }"
        ></div>
      </div>
    </div>

    <div class="w-px h-4 bg-gray-700 shrink-0"></div>

    <!-- Orgasm count -->
    <div class="flex items-center gap-1 shrink-0">
      <span class="text-gray-500">💧</span>
      <span class="font-mono text-cyan-300">{{ orgasms }}</span>
    </div>

    <!-- Burst indicator -->
    <div v-if="burst" class="shrink-0">
      <span class="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Schema } from '../../schema';

const data = ref<z.infer<typeof Schema> | null>(null);
let timer: ReturnType<typeof setInterval>;

function refresh() {
  try {
    const mvuData = Mvu.getMvuData({ type: 'message', message_id: getCurrentMessageId() });
    data.value = Schema.parse(_.get(mvuData, 'stat_data'));
  } catch {
    // schema parse may fail if data not ready
  }
}

onMounted(() => {
  refresh();
  timer = setInterval(refresh, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});

const stage = computed(() => _.get(data.value, '性爱阶段') ?? 0);

const stageLabel = computed(() => {
  const s = stage.value;
  if (s === 0) return '初始';
  if (s <= 2) return '轻度';
  if (s <= 4) return '中度';
  if (s <= 6) return '激烈';
  return '高潮';
});

const stageColor = computed(() => {
  const s = stage.value;
  if (s === 0) return 'text-gray-400';
  if (s <= 2) return 'text-blue-400';
  if (s <= 4) return 'text-yellow-400';
  if (s <= 6) return 'text-orange-400';
  return 'text-red-400';
});

const pleasure = computed(() => _.get(data.value, '全局.快感值') ?? 0);
const orgasms = computed(() => _.get(data.value, '全局.高潮次数') ?? 0);
const burst = computed(() => _.get(data.value, '性爱激活') ?? false);
</script>
