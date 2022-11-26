import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from '@/router/index';
import store from './store';
import 'virtual:svg-icons-register';
import SvgIcon from '@/components/svg-icon/index.vue';
// 全局组件
const app = createApp(App);
// 将SvgIcon.vue组件注册为全局组件
app.component('SvgIcon', SvgIcon);

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
app.use(router).use(Antd).use(store).mount('#app');
