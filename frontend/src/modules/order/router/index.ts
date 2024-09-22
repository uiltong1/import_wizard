import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/orders',
    },
    {
        path: '/orders',
        component: () => import('../pages/Index.vue'),
    },
];

export default routes;
