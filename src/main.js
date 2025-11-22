import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/style.css'
import Notifications from '@kyvg/vue3-notification';

createApp(App)
  .use(router)
  .use(Notifications)
  .mount('#app');