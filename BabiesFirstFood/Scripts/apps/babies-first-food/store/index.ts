import Vue from 'vue';
import Vuex from 'vuex';

import { state, getters, mutations, actions } from './store';

Vue.use(Vuex);

export const store = new Vuex.Store({ state, getters, mutations, actions })