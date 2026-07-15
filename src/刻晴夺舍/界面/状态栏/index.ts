import { waitUntil } from 'async-wait-until';
import { createPinia } from 'pinia';
import App from './App.vue';
import './global.css';
import { Schema } from '../../schema';

$(async () => {
  await waitGlobalInitialized('Mvu');
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
  createApp(App).use(createPinia()).mount('#app');

  // 监听 MVU 变量更新事件：AI 输出触发变量变化时立即同步 store
  eventOn(Mvu.events.VARIABLE_UPDATE_ENDED, () => {
    const stat_data = _.get(getVariables({ type: 'message', message_id: getCurrentMessageId() }), 'stat_data');
    if (stat_data) {
      const result = Schema.safeParse(stat_data);
      if (result.success) {
        const store = useDataStore();
        store.data = result.data;
      }
    }
  });
});
