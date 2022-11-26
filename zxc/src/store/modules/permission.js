export default {
  namespaced: true,
  state: {
    name: 'permission',
    buttonAuth: []
  },
  mutations: {
    setButtonAuth(state, buttonAuth) {
      state.buttonAuth = buttonAuth;
    }
  },
  actions: {
    setButtonAuth(context, buttonAuth) {
      context.commit('setButtonAuth', buttonAuth);
    }
  },
  getters: {
    getButtonAuth: (state) => state.buttonAuth
  }
};
