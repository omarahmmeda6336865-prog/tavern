<template>
  <div class="status-card">
    <!-- 环境信息栏 -->
    <div class="env-strip">
      <span class="env-item"><i class="fas fa-location-dot env-icon"></i>{{ store.data.环境.当前场景 }}</span>
      <span class="env-divider">·</span>
      <span class="env-item"><i class="fas fa-clock env-icon"></i>{{ store.data.环境.时间 }}</span>
      <span class="env-divider">·</span>
      <span class="env-privacy" :title="'私密等级 ' + store.data.环境.私密等级">
        <i class="fas fa-eye env-icon"></i>
        <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= store.data.环境.私密等级 }">★</span>
      </span>
      <span class="env-phase-tag"><i class="fas fa-circle-nodes"></i> {{ store.data.环境.剧情阶段 }}</span>
    </div>

    <!-- 双人物面板 -->
    <div class="dual-panel">
      <!-- 荧 -->
      <div class="char-col char-ying">
        <div class="char-header">
          <span class="char-name"><i class="fas fa-feather-pointed"></i> 荧</span>
          <span class="phase-badge ying">{{ store.data.环境.剧情阶段 }}</span>
        </div>

        <div class="stat-group">
          <div class="stat-row" v-for="stat in yingCoreStats" :key="stat.key">
            <span class="stat-label"><i :class="stat.icon" class="stat-icon"></i>{{ stat.label }}</span>
            <div class="stat-track">
              <div
                class="stat-fill"
                :style="{ width: (stat.value as number) + '%', background: stat.color }"
                :class="{ danger: (stat.value as number) < 20 && stat.dangerLow }"
              ></div>
            </div>
            <span class="stat-value" :class="{ 'text-crimson': (stat.value as number) >= 80 }">
              {{ stat.value }}%
            </span>
          </div>
        </div>

        <div class="status-tags">
          <span class="tag tag-standard"><i class="fas fa-droplet tag-icon"></i>{{ store.data.荧.状态.标准 }}</span>
          <span
            v-for="tag in store.data.荧.状态.异常"
            :key="tag"
            class="tag tag-abnormal"
          ><i class="fas fa-triangle-exclamation tag-icon"></i>{{ tag }}</span>
        </div>

        <div class="subsection" v-if="!_.isEmpty(store.data.荧.身体开发度)">
          <div class="subsection-title"><i class="fas fa-seedling"></i> 身体开发</div>
          <div class="stat-row" v-for="(val, part) in store.data.荧.身体开发度" :key="part">
            <span class="stat-label">{{ part }}</span>
            <div class="stat-track">
              <div class="stat-fill stat-fill-pink" :style="{ width: String(val) + '%' }"></div>
            </div>
            <span class="stat-value">{{ val }}%</span>
          </div>
        </div>

        <div class="subsection">
          <div class="subsection-title"><i class="fas fa-shirt"></i> 服装</div>
          <div class="outfit-grid">
            <div class="outfit-item"><span class="outfit-key">上身</span>{{ store.data.荧.服装状态.上身 }}</div>
            <div class="outfit-item"><span class="outfit-key">下身</span>{{ store.data.荧.服装状态.下身 }}</div>
            <div class="outfit-item"><span class="outfit-key">鞋履</span>{{ store.data.荧.服装状态.鞋履 }}</div>
          </div>
          <div class="stat-row">
            <span class="stat-label">完整</span>
            <div class="stat-track">
              <div
                class="stat-fill stat-fill-teal"
                :style="{ width: store.data.荧.服装状态.整体完整度 + '%' }"
              ></div>
            </div>
            <span class="stat-value">{{ store.data.荧.服装状态.整体完整度 }}%</span>
          </div>
          <div class="outfit-extras">
            <span v-if="store.data.荧.服装状态.暴露部位.length" class="expose-tag">
              <i class="fas fa-eye"></i> {{ store.data.荧.服装状态.暴露部位.join('、') }}
            </span>
            <span v-if="store.data.荧.服装状态.束缚状态 !== '无'" class="bind-tag">
              <i class="fas fa-link"></i> {{ store.data.荧.服装状态.束缚状态 }}
            </span>
            <span v-if="store.data.荧.服装状态.饰品.length" class="acc-tag">
              <i class="fas fa-gem"></i> {{ store.data.荧.服装状态.饰品.join('、') }}
            </span>
          </div>
        </div>
      </div>

      <!-- 芭芭拉 -->
      <div class="char-col char-barbara">
        <div class="char-header">
          <span class="char-name"><i class="fas fa-mask"></i> 芭芭拉</span>
          <span class="mode-badge">{{ store.data.芭芭拉.当前模式 }}</span>
        </div>

        <div class="stat-group">
          <div class="stat-row" v-for="stat in barbaraCoreStats" :key="stat.key">
            <span class="stat-label"><i :class="stat.icon" class="stat-icon"></i>{{ stat.label }}</span>
            <div class="stat-track">
              <div
                class="stat-fill"
                :style="{ width: (stat.value as number) + '%', background: stat.color }"
              ></div>
            </div>
            <span class="stat-value">{{ stat.value }}%</span>
          </div>
        </div>

        <div class="eval-box" v-if="store.data.芭芭拉.对荧的评价">
          <span class="eval-label"><i class="fas fa-quote-left"></i> 评价</span>
          <span class="eval-text">"{{ store.data.芭芭拉.对荧的评价 }}"</span>
        </div>

        <div class="subsection">
          <div class="subsection-title"><i class="fas fa-shirt"></i> 服装</div>
          <div class="outfit-grid">
            <div class="outfit-item"><span class="outfit-key">上身</span>{{ store.data.芭芭拉.服装状态.上身 }}</div>
            <div class="outfit-item"><span class="outfit-key">下身</span>{{ store.data.芭芭拉.服装状态.下身 }}</div>
            <div class="outfit-item"><span class="outfit-key">鞋履</span>{{ store.data.芭芭拉.服装状态.鞋履 }}</div>
          </div>
          <div class="stat-row">
            <span class="stat-label">完整</span>
            <div class="stat-track">
              <div
                class="stat-fill stat-fill-teal"
                :style="{ width: store.data.芭芭拉.服装状态.整体完整度 + '%' }"
              ></div>
            </div>
            <span class="stat-value">{{ store.data.芭芭拉.服装状态.整体完整度 }}%</span>
          </div>
          <div class="outfit-extras">
            <span v-if="store.data.芭芭拉.服装状态.束缚状态 !== '无'" class="bind-tag">
              <i class="fas fa-link"></i> {{ store.data.芭芭拉.服装状态.束缚状态 }}
            </span>
            <span v-if="store.data.芭芭拉.服装状态.饰品.length" class="acc-tag">
              <i class="fas fa-gem"></i> {{ store.data.芭芭拉.服装状态.饰品.join('、') }}
            </span>
          </div>
        </div>

        <div class="subsection" v-if="store.data.环境.当前道具 || !_.isEmpty(store.data.荧.已历玩法)">
          <div class="subsection-title"><i class="fas fa-toolbox"></i> 道具 & 经历</div>
          <div class="tool-item" v-if="store.data.环境.当前道具">
            <i class="fas fa-wand-magic-sparkles"></i>
            <span>{{ store.data.环境.当前道具 }}</span>
          </div>
          <div class="history-inline" v-if="!_.isEmpty(store.data.荧.已历玩法)">
            <span
              v-for="(info, name) in store.data.荧.已历玩法"
              :key="name"
              class="history-tag"
              :class="info.角色 === '芭芭拉施' ? 'tag-barbara' : 'tag-ying'"
            >{{ name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { useDataStore } from './store';

const store = useDataStore();

const yingCoreStats = computed(() => [
  { key: '堕落度', label: '堕落', icon: 'fas fa-skull', value: store.data.荧.堕落度, color: 'linear-gradient(90deg, #4a154b, #c0392b)', dangerLow: false },
  { key: '服从度', label: '服从', icon: 'fas fa-hand', value: store.data.荧.服从度, color: 'linear-gradient(90deg, #2d1b4e, #8e44ad)', dangerLow: false },
  { key: '兴奋度', label: '兴奋', icon: 'fas fa-bolt', value: store.data.荧.兴奋度, color: 'linear-gradient(90deg, #6b1a2a, #e74c3c)', dangerLow: false },
  { key: '色欲',   label: '色欲', icon: 'fas fa-fire', value: store.data.荧.色欲,   color: 'linear-gradient(90deg, #5a1a3a, #e91e63)', dangerLow: false },
  { key: '理性值', label: '理性', icon: 'fas fa-brain', value: store.data.荧.理性值, color: 'linear-gradient(90deg, #1a3a5a, #3498db)', dangerLow: true },
  { key: '羞耻心', label: '羞耻', icon: 'fas fa-face-flushed', value: store.data.荧.羞耻心, color: 'linear-gradient(90deg, #3a3a1a, #f1c40f)', dangerLow: true },
]);

const barbaraCoreStats = computed(() => [
  { key: '支配欲', label: '支配', icon: 'fas fa-crown', value: store.data.芭芭拉.支配欲, color: 'linear-gradient(90deg, #4a3520, #c9a87c)', dangerLow: false },
  { key: '愉悦度', label: '愉悦', icon: 'fas fa-face-smile', value: store.data.芭芭拉.愉悦度, color: 'linear-gradient(90deg, #3a4a20, #8bc34a)', dangerLow: false },
  { key: '兴奋度', label: '兴奋', icon: 'fas fa-bolt', value: store.data.芭芭拉.兴奋度, color: 'linear-gradient(90deg, #6b1a2a, #e74c3c)', dangerLow: false },
  { key: '耐心',   label: '耐心', icon: 'fas fa-hourglass-half', value: store.data.芭芭拉.耐心,   color: 'linear-gradient(90deg, #4a3a1a, #ff9800)', dangerLow: true },
]);
</script>

<style lang="scss" scoped>
.status-card {
  width: 100%;
  max-width: 800px;
  background: var(--bg-card);
  border: 1px solid var(--mirror-border);
  box-shadow: 0 0 20px rgba(201, 168, 124, 0.06), inset 0 0 30px rgba(201, 168, 124, 0.02);
  display: flex;
  flex-direction: column;
  font-family: var(--font-round);
  color: var(--text-primary);
  font-size: 13px;
  line-height: 1.5;
  margin: 0 auto;
  letter-spacing: 0.02em;
}

/* 环境栏 */
.env-strip {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  padding: 7px 14px;
  background: var(--bg-deep);
  border-bottom: 1px solid var(--border);
  font-size: 0.8rem;
}

.env-icon {
  margin-right: 4px;
  font-size: 0.72rem;
  opacity: 0.6;
}

.env-item {
  color: var(--text-secondary);
  display: inline-flex;
  align-items: center;
}

.env-divider {
  color: var(--text-dim);
  font-size: 0.65rem;
}

.env-privacy {
  display: inline-flex;
  align-items: center;
  gap: 2px;

  .star {
    color: var(--text-dim);
    font-size: 0.75rem;
    transition: color 0.3s;
    &.filled { color: var(--gold); text-shadow: 0 0 4px rgba(201, 168, 124, 0.4); }
  }
}

.env-phase-tag {
  margin-left: auto;
  background: linear-gradient(135deg, rgba(192, 57, 43, 0.3), rgba(201, 168, 124, 0.15));
  border: 1px solid rgba(201, 168, 124, 0.3);
  color: var(--gold-light);
  padding: 2px 10px;
  font-size: 0.72rem;
  border-radius: 12px;
}

/* 双栏 */
.dual-panel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
}

.char-col {
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.char-ying {
  border-right: 1px solid var(--border);
}

.char-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}

.char-name {
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: 3px;
}

.char-ying .char-name {
  color: var(--gold-light);
  text-shadow: 0 0 10px rgba(201, 168, 124, 0.3);
}

.char-barbara .char-name {
  color: var(--crimson-light);
  text-shadow: 0 0 10px rgba(255, 107, 107, 0.3);
}

.phase-badge, .mode-badge {
  padding: 3px 10px;
  font-size: 0.7rem;
  border-radius: 12px;
}

.phase-badge.ying {
  background: rgba(201, 168, 124, 0.12);
  border: 1px solid rgba(201, 168, 124, 0.25);
  color: var(--gold);
}

.mode-badge {
  background: rgba(192, 57, 43, 0.12);
  border: 1px solid rgba(192, 57, 43, 0.25);
  color: var(--crimson-light);
}

/* 数值条 */
.stat-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.stat-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-icon {
  font-size: 0.7rem;
  width: 14px;
  text-align: center;
  opacity: 0.7;
  margin-right: 2px;
}

.stat-label {
  width: 52px;
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-align: left;
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.stat-track {
  flex: 1;
  height: 8px;
  background: var(--bg-deep);
  border: 1px solid var(--border);
  border-radius: 4px;
  overflow: hidden;
}

.stat-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.5s ease;
}

.stat-fill.danger {
  animation: pulse-danger 2s infinite;
}

.stat-fill-pink {
  background: linear-gradient(90deg, #6b1a3a, #e91e63);
}

.stat-fill-teal {
  background: linear-gradient(90deg, #1a3a3a, #1abc9c);
}

.stat-value {
  width: 34px;
  font-size: 0.72rem;
  color: var(--text-secondary);
  text-align: left;
  flex-shrink: 0;
  font-family: var(--font-mono);
  letter-spacing: 0;
}

.text-crimson {
  color: var(--crimson-light) !important;
}

@keyframes pulse-danger {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* 状态标签 */
.status-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.tag {
  padding: 2px 8px;
  font-size: 0.7rem;
  border-radius: 10px;
}

.tag-icon {
  margin-right: 3px;
  font-size: 0.62rem;
}

.tag-standard {
  background: rgba(201, 168, 124, 0.1);
  border: 1px solid rgba(201, 168, 124, 0.2);
  color: var(--gold);
}

.tag-abnormal {
  background: rgba(192, 57, 43, 0.1);
  border: 1px solid rgba(192, 57, 43, 0.2);
  color: var(--crimson-light);
}

/* 子章节 */
.subsection {
  border-top: 1px dashed var(--border);
  padding-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.subsection-title {
  font-size: 0.72rem;
  color: var(--gold-dim);
  letter-spacing: 2.5px;
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  gap: 5px;
}

/* 服装 */
.outfit-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px 10px;
}

.outfit-item {
  font-size: 0.75rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.outfit-key {
  color: var(--text-dim);
  margin-right: 5px;
  font-size: 0.68rem;
}

.outfit-extras {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 3px;
}

.expose-tag {
  font-size: 0.68rem;
  color: var(--crimson-light);
  padding: 2px 7px;
  background: rgba(192, 57, 43, 0.08);
  border: 1px solid rgba(192, 57, 43, 0.2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 3px;
}

.bind-tag {
  font-size: 0.68rem;
  color: var(--gold);
  padding: 2px 7px;
  background: rgba(201, 168, 124, 0.08);
  border: 1px solid rgba(201, 168, 124, 0.2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 3px;
}

.acc-tag {
  font-size: 0.68rem;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 3px;
}

/* 评价框 */
.eval-box {
  border: 1px solid var(--border);
  background: var(--mirror);
  border-radius: 8px;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.eval-label {
  font-size: 0.65rem;
  color: var(--gold-dim);
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.eval-text {
  font-size: 0.75rem;
  color: var(--gold-light);
  font-style: italic;
  line-height: 1.5;
}

/* 道具 & 经历（芭芭拉栏内联） */
.tool-item {
  font-size: 0.72rem;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 2px 0;
}

.history-inline {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 2px;
}

.history-tag {
  padding: 1px 7px;
  font-size: 0.66rem;
  border-radius: 10px;
}

.tag-barbara {
  background: rgba(192, 57, 43, 0.1);
  border: 1px solid rgba(192, 57, 43, 0.2);
  color: var(--crimson-light);
}

.tag-ying {
  background: rgba(201, 168, 124, 0.1);
  border: 1px solid rgba(201, 168, 124, 0.2);
  color: var(--gold);
}

@media (max-width: 600px) {
  .dual-panel {
    grid-template-columns: 1fr;
  }

  .char-ying {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}
</style>
