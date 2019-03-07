import VueRouter from 'vue-router';
var routes = [
    {
        path: '/',
        name: 'home',
        component: require('./pages/index/index.vue').default
    }
];
export default new VueRouter({
    mode: 'history',
    routes: routes
});
//# sourceMappingURL=router.js.map