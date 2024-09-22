import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export interface Order {
    order_id: number | null;
    total: string | null;
    date: string | null;
    products: { product_id: number | null; value: string | null }[] | null;
}

export interface User {
    user_id: number;
    name: string | null;
    orders: Order[] | null;
}

export interface State {
    users: User[] | null;
    total: number | null;
    page: number | null;
    totalPages: number | null;
}

export default {
    state: {
        users: null,
        total: null,
        page: null,
        totalPages: null,
    } as State,
    mutations,
    actions,
    getters,
};
