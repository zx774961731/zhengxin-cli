import { createStore } from 'vuex';
import permission from './modules/permission';

export default createStore({
  // 子模块
  permission,
  // 公共 state/mutations/actions
  state: {
    a: 123
  },
  mutations: {},
  actions: {}
});
