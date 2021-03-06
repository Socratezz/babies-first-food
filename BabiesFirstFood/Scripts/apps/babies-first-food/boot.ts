﻿import "es6-promise/auto";
import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './router'
import { store } from './store';
import VModal from 'vue-js-modal';
Vue.use(VueRouter);
Vue.use(VModal);
Vue.config.performance = true;

new Vue({
    el: '#babies-first-food-root',
    store,
    router: router,
    render: h => h(require('./app.vue').default)
});