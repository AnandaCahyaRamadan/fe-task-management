import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/style.css'
import Notifications from '@kyvg/vue3-notification';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api";

createApp(App)
  .use(router)
  .use(Notifications)
  .mount('#app');