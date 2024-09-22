import { route } from 'quasar/wrappers';
import { createRouter, createWebHistory } from 'vue-router';
import routes from '../modules/order/router';

export default route(() => {
  const Router = createRouter({
    history: createWebHistory(process.env.VUE_ROUTER_BASE), 
    routes,
  });

  return Router;
});
