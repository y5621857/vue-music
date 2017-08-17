import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import state from './state';
import mutations from './mutations';
import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

var debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  actions: actions,
  getters: getters,
  state: state,
  mutations: mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
});

//# sourceMappingURL=index-compiled.js.map