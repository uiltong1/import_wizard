import { store } from 'quasar/wrappers'
import { InjectionKey } from 'vue'
import {
  createStore,
  Store as VuexStore,
  useStore as vuexUseStore,
} from 'vuex'

import OrderStore, { User } from '../modules/order/_store'

export interface StateInterface {
  users: User[] | null;
  total: number | null;
  page: number | null;
  totalPages: number | null;
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $store: VuexStore<StateInterface>
  }
}

export const storeKey: InjectionKey<VuexStore<StateInterface>> = Symbol('vuex-key')

export default store(function () {
  const Store = createStore<StateInterface>({
    modules: {
      OrderStore
    },
    strict: !!process.env.DEBUGGING
  })

  return Store;
})

export function useStore() {
  return vuexUseStore(storeKey)
}
