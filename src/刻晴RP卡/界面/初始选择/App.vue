<template>
  <div class="w-full max-w-md mx-auto bg-gray-900 text-gray-100 rounded-lg overflow-hidden shadow-xl">
    <!-- Header -->
    <div class="px-4 py-3 border-b border-gray-700 text-center">
      <h2 class="text-lg font-bold text-purple-400">刻晴 · 初始设定</h2>
      <p class="text-xs text-gray-500 mt-1">选择四项变量以开始故事</p>
    </div>

    <!-- Tab bar -->
    <div class="flex border-b border-gray-700">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        @click="activeTab = tab.key"
        class="flex-1 py-2 text-xs font-medium transition-colors relative"
        :class="activeTab === tab.key
          ? 'text-purple-400 bg-gray-800'
          : 'text-gray-500 hover:text-gray-300'"
      >
        {{ tab.label }}
        <span
          v-if="selections[tab.key]"
          class="absolute top-1 right-2 w-2 h-2 rounded-full bg-green-500"
        ></span>
      </button>
    </div>

    <!-- Tab content -->
    <div class="p-4">
      <!-- 权力关系 -->
      <div v-if="activeTab === '权力关系'" class="grid grid-cols-1 gap-3">
        <button
          v-for="opt in powerOptions"
          :key="opt.value"
          @click="selections.权力关系 = opt.value"
          class="text-left p-3 rounded-lg border transition-all"
          :class="selections.权力关系 === opt.value
            ? 'border-purple-500 bg-purple-500/20 text-purple-300'
            : 'border-gray-700 hover:border-gray-500 text-gray-400'"
        >
          <div class="font-medium">{{ opt.label }}</div>
          <div class="text-xs mt-1 text-gray-500">{{ opt.desc }}</div>
        </button>
      </div>

      <!-- 真实身份 -->
      <div v-if="activeTab === '真实身份'" class="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto pr-1">
        <button
          v-for="opt in identityOptions"
          :key="opt.value"
          @click="selectIdentity(opt.value)"
          class="text-left p-3 rounded-lg border transition-all"
          :class="selections.真实身份 === opt.value
            ? 'border-purple-500 bg-purple-500/20 text-purple-300'
            : 'border-gray-700 hover:border-gray-500 text-gray-400'"
        >
          <div class="font-medium text-sm">{{ opt.label }}</div>
          <div class="text-xs mt-0.5" :class="opt.category === 'mob' ? 'text-blue-500/70' : 'text-pink-500/70'">
            {{ opt.category === 'mob' ? '原神Mob' : '色情身份' }}
          </div>
        </button>
      </div>

      <!-- 关系 -->
      <div v-if="activeTab === '关系'" class="grid grid-cols-2 gap-3">
        <button
          v-for="opt in relationOptions"
          :key="opt.value"
          @click="selections.关系 = opt.value"
          class="text-center p-3 rounded-lg border transition-all"
          :class="selections.关系 === opt.value
            ? 'border-purple-500 bg-purple-500/20 text-purple-300'
            : 'border-gray-700 hover:border-gray-500 text-gray-400'"
        >
          <div class="text-lg mb-1">{{ opt.icon }}</div>
          <div class="font-medium text-sm">{{ opt.label }}</div>
          <div class="text-xs mt-1 text-gray-500">{{ opt.desc }}</div>
        </button>
      </div>

      <!-- 淫乱程度 -->
      <div v-if="activeTab === '淫乱程度'" class="grid grid-cols-2 gap-3">
        <button
          v-for="opt in availableLustOptions"
          :key="opt.value"
          @click="selections.淫乱程度 = opt.value"
          :disabled="opt.disabled"
          class="text-center p-3 rounded-lg border transition-all"
          :class="opt.disabled
            ? 'border-gray-800 bg-gray-800/50 text-gray-600 cursor-not-allowed'
            : selections.淫乱程度 === opt.value
              ? 'border-purple-500 bg-purple-500/20 text-purple-300'
              : 'border-gray-700 hover:border-gray-500 text-gray-400'"
        >
          <div class="text-lg mb-1">{{ opt.icon }}</div>
          <div class="font-medium text-sm">{{ opt.label }}</div>
          <div class="text-xs mt-1 text-gray-500">{{ opt.desc }}</div>
          <div v-if="opt.disabled" class="text-xs mt-1 text-red-600">当前身份不适用</div>
        </button>
      </div>
    </div>

    <!-- Footer -->
    <div class="px-4 py-3 border-t border-gray-700">
      <div v-if="!confirmed" class="flex items-center justify-between">
        <span class="text-xs text-gray-500">
          {{ completedCount }}/4 项已选择
        </span>
        <button
          @click="confirm"
          :disabled="completedCount < 4"
          class="px-6 py-2 rounded-lg text-sm font-bold transition-all"
          :class="completedCount === 4
            ? 'bg-purple-600 hover:bg-purple-500 text-white cursor-pointer'
            : 'bg-gray-700 text-gray-500 cursor-not-allowed'"
        >
          确认设定
        </button>
      </div>
      <div v-else class="text-center text-sm text-green-400 py-2 font-medium">
        ✓ 设定已完成，可以开始对话了
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useDataStore } from './store';

const store = useDataStore();

const tabs = [
  { key: '权力关系', label: '权力关系' },
  { key: '真实身份', label: '真实身份' },
  { key: '关系', label: '关系' },
  { key: '淫乱程度', label: '淫乱程度' },
] as const;

type TabKey = typeof tabs[number]['key'];
const activeTab = ref<TabKey>('权力关系');
const confirmed = ref(false);

const selections = reactive({
  权力关系: '' as string,
  真实身份: '' as string,
  关系: '' as string,
  淫乱程度: '' as string,
});

const powerOptions = [
  { value: 'User主导', label: 'User 主导', desc: '你掌控局面，她服从于你' },
  { value: '刻晴主导', label: '刻晴 主导', desc: '她掌控局面，你服从于她' },
  { value: '无主导', label: '无主导', desc: '平等互动，自然发展' },
];

const identityOptions = [
  { value: '无特殊身份', label: '无特殊身份 · 玉衡星', category: 'base' },
  { value: '愚人众·雷萤术士', label: '愚人众·雷萤术士', category: 'mob' },
  { value: '盗宝团·药剂师', label: '盗宝团·药剂师', category: 'mob' },
  { value: '愚人众·藏镜仕女', label: '愚人众·藏镜仕女', category: 'mob' },
  { value: '镀金旅团·沙中净水', label: '沙漠主母', category: 'mob' },
  { value: '愚人众·风役人', label: '愚人众·风役人', category: 'mob' },
  { value: '霜夜之继灵者', label: '霜夜之继灵者', category: 'mob' },
  { value: '璃月青楼花魁', label: '璃月青楼花魁', category: 'erotic' },
  { value: '愚人众秘密娼妓', label: '愚人众秘密娼妓', category: 'erotic' },
  { value: '叛变为至冬间谍的玉衡星', label: '叛变的玉衡星', category: 'erotic' },
];

const relationOptions = [
  { value: '陌生人', label: '陌生人', icon: '👤', desc: '初次相遇' },
  { value: '相识', label: '相识', icon: '🤝', desc: '彼此认识' },
  { value: '亲密', label: '亲密', icon: '💕', desc: '关系密切' },
  { value: '至交', label: '至交', icon: '🔗', desc: '灵魂伴侣' },
];

const allLustOptions = [
  { value: '贞洁', label: '贞洁', icon: '🌸', desc: '未经人事' },
  { value: '羞怯', label: '羞怯', icon: '🌙', desc: '青涩腼腆' },
  { value: '放荡', label: '放荡', icon: '🔥', desc: '纵情享乐' },
  { value: '沉沦', label: '沉沦', icon: '💀', desc: '不可自拔' },
];

// 淫乱程度联动规则
const IDENTITY_LUST_RULES: Record<string, string[]> = {
  '无特殊身份': ['贞洁', '羞怯', '放荡', '沉沦'],
  '愚人众·雷萤术士': ['羞怯', '放荡', '沉沦'],
  '盗宝团·药剂师': ['羞怯', '放荡', '沉沦'],
  '愚人众·藏镜仕女': ['羞怯', '放荡', '沉沦'],
  '镀金旅团·沙中净水': ['羞怯', '放荡', '沉沦'],
  '愚人众·风役人': ['羞怯', '放荡', '沉沦'],
  '霜夜之继灵者': ['贞洁', '羞怯'],
  '璃月青楼花魁': ['放荡', '沉沦'],
  '愚人众秘密娼妓': ['放荡', '沉沦'],
  '叛变为至冬间谍的玉衡星': ['贞洁', '羞怯', '放荡', '沉沦'],
};

const availableLustOptions = computed(() => {
  const identity = selections.真实身份;
  const allowed = identity ? IDENTITY_LUST_RULES[identity] || [] : [];
  return allLustOptions.map(opt => ({
    ...opt,
    disabled: identity ? !allowed.includes(opt.value) : false,
  }));
});

function selectIdentity(value: string) {
  selections.真实身份 = value;
  // 如果当前淫乱程度不被新身份允许，清空
  const allowed = IDENTITY_LUST_RULES[value] || [];
  if (selections.淫乱程度 && !allowed.includes(selections.淫乱程度)) {
    selections.淫乱程度 = '';
  }
}

const completedCount = computed(() => {
  return (selections.权力关系 ? 1 : 0)
    + (selections.真实身份 ? 1 : 0)
    + (selections.关系 ? 1 : 0)
    + (selections.淫乱程度 ? 1 : 0);
});

function confirm() {
  if (!store.data) return;
  const d = store.data as Record<string, any>;
  _.set(d, 'stat_data._初始设定.权力关系', selections.权力关系);
  _.set(d, 'stat_data._初始设定.刻晴真实身份', selections.真实身份);
  _.set(d, 'stat_data._初始设定.User和刻晴关系', selections.关系);
  _.set(d, 'stat_data._初始设定.刻晴淫乱程度', selections.淫乱程度);
  confirmed.value = true;
}
</script>
