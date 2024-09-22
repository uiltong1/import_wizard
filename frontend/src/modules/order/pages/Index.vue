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
    <div>
      <div class="col-md-2 q-mb-md q-mx-md">
        <div class="column">
          <q-btn
            label="Importar Pedidos"
            color="secondary"
            icon="add"
            @click="openModal"
          />
        </div>
      </div>
    </div>
    <div v-if="users && users.length">
      <div v-for="user in users" :key="user.user_id">
        <UserOrder :user="user" />
      </div>
    </div>
    <div v-else class="user-card">
      <div class="row justify-center">
        <span>Nenhum registro encontrado.</span>
      </div>
    </div>
    <div class="column items-end">
      <div>
        <q-btn
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
          label="Anterior"
        />
        <span class="q-mx-md"
          >Página {{ currentPage }} de {{ totalPages }}</span
        >
        <q-btn
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
          label="Próximo"
        />
      </div>
    </div>

    <div>
      <file-upload-modal
        :isOpen="isModalOpen"
        @close="isModalOpen = false"
        @submit="submitImport"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { FetchOrdersParams } from '../_api/OrderService';
import { useStore } from '../../../store';
import UserOrder from '../components/UserOrder.vue';
import FileUploadModal from '../components/FileUploadModal.vue';
import { Notify } from 'quasar';

defineOptions({
  name: 'IndexOrder',
});

const orderId = ref<number | null>(null);
const startDate = ref<string | null>(null);
const endDate = ref<string | null>(null);
const currentPage = ref(1);
const limit = 10;

const store = useStore();

const users = computed(() => store.getters.users);
const totalPages = computed(() => store.getters.totalPages);

const handleSearch = async () => {
  const params: FetchOrdersParams = {
    startDate: startDate.value || null,
    endDate: endDate.value || null,
    orderId: orderId.value || null,
    page: currentPage.value,
    limit,
  };
  await store.dispatch('fetchOrders', params);
};

const changePage = (page: number) => {
  currentPage.value = page;
  handleSearch();
};

await handleSearch();

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const submitImport = async (file: File) => {
  try {
    await store.dispatch('uploadFile', file);
    isModalOpen.value = false;
    Notify.create({
      type: 'positive',
      message: 'Arquivo adiciona na fila de importação.',
    });
  } catch (error) {
    Notify.create({
      type: 'negative',
      message: 'Erro ao enviar o arquivo. Tente novamente.',
    });
  }
};
</script>
