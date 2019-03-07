import Vue from 'vue';
import Vuex from 'vuex';
import { state, getters, mutations, actions } from './store';
Vue.use(Vuex);
export var store = new Vuex.Store({ state: state, getters: getters, mutations: mutations, actions: actions });
//# sourceMappingURL=index.js.map