import { waitUntil } from 'async-wait-until';
import { createPinia } from 'pinia';
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
  const app = createApp(App);
  app.use(createPinia());
  app.mount('#app');
});
