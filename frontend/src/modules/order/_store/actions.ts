import { ActionTree } from 'vuex';
import { fetchOrders, importOrders } from '../_api/OrderService'
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
        const response = await fetchOrders(params);
        commit('SET_ORDERS', response.users);
        commit('SET_TOTAL', response.total);
        commit('SET_PAGE', response.page);
        commit('SET_TOTAL_PAGES', response.totalPages);
    },

    async uploadFile({ }, file: File) {
        await importOrders(file);
    },

};

export default actions;
