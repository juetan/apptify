import { createApp } from 'vue';
import App from './App.vue';
import { store } from './store';
import { styler } from './style';
import { router } from './router';

const run = async () => {
  const app = createApp(App);

  app.use(store);
  app.use(styler);
  app.use(router);

  app.mount('#app');
};

run();
