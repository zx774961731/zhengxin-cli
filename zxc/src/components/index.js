// 导入需要注册的两个组件分别为HelloWorld.vue和one.vue
import SvgIcon from '@/components/svg-icon/index.vue';

export default function install(app) {
  app.component('svg-icon', SvgIcon);
}
