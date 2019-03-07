import VueRouter from 'vue-router';
import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
    {
        path: '/',
        name: 'home',
        component: require('./pages/index/index.vue').default
    }
];

export default new VueRouter({
    mode: 'history',
    routes: routes
})