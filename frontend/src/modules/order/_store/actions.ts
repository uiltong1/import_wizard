import { ActionTree } from 'vuex';
import { fetchOrders } from '../_api/OrderService'
import { State } from './index';

interface FetchOrdersParams {
    startDate?: string;
    endDate?: string;
    orderId?: number;
    page?: number;
    limit?: number;
}

const actions: ActionTree<State, State> = {
    async fetchOrders({ commit }, params: FetchOrdersParams) {
        try {
            const response = await fetchOrders(params);
            commit('SET_ORDERS', response.users);
            commit('SET_TOTAL', response.total);
            commit('SET_PAGE', response.page);
            commit('SET_TOTAL_PAGES', response.totalPages);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    },
};

export default actions;
