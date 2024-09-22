<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col-md-12 q-pb-xl">
        <span class="title-component"> Pedidos </span>
        <q-separator inset class="full-width" />
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-md-3 q-mb-md q-mx-md">
        <q-input
          filled
          label="Número do Pedido"
          type="number"
          v-model="orderId"
        >
          <template #append>
            <q-icon
              name="search"
              class="cursor-pointer"
              @click="handleSearch"
            />
          </template>
        </q-input>
      </div>
      <div class="col-md-4 q-mb-md q-mx-md">
        <q-input filled type="date" label="Data Inicial" v-model="startDate">
          <template #append>
            <q-icon
              name="search"
              class="cursor-pointer"
              @click="handleSearch"
            />
          </template>
        </q-input>
      </div>
      <div class="col-md-4 q-mb-md q-mx-md">
        <q-input filled type="date" label="Data Final" v-model="endDate">
          <template #append>
            <q-icon
              name="search"
              class="cursor-pointer"
              @click="handleSearch"
            />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row-rever">
      <div class="col-md-2 q-mb-md q-mx-md">
        <div class="column">
          <q-btn
            label="Importar Pedidos"
            color="secondary"
            icon="add"
            @click="handleCreate"
          />
        </div>
      </div>
    </div>
    <div v-if="users && users.length">
      <div v-for="user in users" :key="user.user_id">
        <UserOrder :user="user" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { FetchOrdersParams } from '../_api/OrderService';
import { useStore } from '../../../store';
import UserOrder from '../components/UserOrder.vue';

defineOptions({
  name: 'IndexOrder',
});

const orderId = ref<number | null>(null);
const startDate = ref<string | null>(null);
const endDate = ref<string | null>(null);

const store = useStore();

const handleCreate = () => {
  console.log('Criar Pedido');
};

const handleSearch = async () => {
  const params: FetchOrdersParams = {
    startDate: startDate.value || null,
    endDate: endDate.value || null,
    orderId: orderId.value !== undefined ? orderId.value : null,
    page: 1,
    limit: 10,
  };

  await store.dispatch('fetchOrders', params);
};

await handleSearch();

const users = computed(() => store.getters.users);
</script>
