import { GetterTree } from 'vuex';
import { State } from './index';

const getters: GetterTree<State, State> = {
  users: (state) => state.users,
  total: (state) => state.total,
  page: (state) => state.page,
  totalPages: (state) => state.totalPages,
};

export default getters;
