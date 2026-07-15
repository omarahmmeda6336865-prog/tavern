import { waitUntil } from 'async-wait-until';
import { createPinia } from 'pinia';
import App from './App.vue';
import './global.css';
import { Schema } from '../../schema';

$(async () => {
  await waitGlobalInitialized('Mvu');

  // 等待当前角色卡所在聊天的全新议的最新消息楼层被初始化出 stat_data
  // 明确指定 message_id: 'latest'，避免误匹配其他消息或角色卡的数据
  await waitUntil(() => {
    const variables = getVariables({ type: 'message', message_id: 'latest' });
    if (!_.has(variables, 'stat_data')) return false;
    // 进一步校验 stat_data 是否匹配本角色卡的 schema
    const result = Schema.safeParse(_.get(variables, 'stat_data'));
    return result.success;
  });

  createApp(App).use(createPinia()).mount('#app');

  // 监听 MVU 变量更新事件：AI 输出触发变量变化时立即同步 store
  eventOn(Mvu.events.VARIABLE_UPDATE_ENDED, () => {
    const variables = Mvu.getMvuData({ type: 'message', message_id: 'latest' });
    const stat_data = _.get(variables, 'stat_data');
    if (stat_data) {
      const result = Schema.safeParse(stat_data);
      if (result.success) {
        const store = useDataStore();
        store.data = result.data;
      }
    }
  });
});
