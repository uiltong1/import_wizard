import { MutationTree } from 'vuex';
import { State, User } from './index';

const mutations: MutationTree<State> = {
  SET_ORDERS(state, users: User[]) {
    state.users = users;
  },
  SET_TOTAL(state, total: number) {
    state.total = total;
  },
  SET_PAGE(state, page: number) {
    state.page = page;
  },
  SET_TOTAL_PAGES(state, totalPages: number) {
    state.totalPages = totalPages;
  },
};

export default mutations;
