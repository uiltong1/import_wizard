<template>
  <div>
    <q-card @click="toggleDetails" class="order-card">
      <q-card-section>
        <div class="row items-center">
          <div class="col">
            <span class="text-h6">Pedido #{{ order.order_id }}</span>
          </div>
          <div class="col-auto">
            <span class="text-h6">{{ order.total }} $</span>
          </div>
        </div>
        <q-separator />
        <div v-if="detailsVisible">
          <div class="q-mt-md"><strong>Data:</strong> {{ order.date }}</div>
          <div v-for="product in order.products" :key="product.product_id">
            <strong>Produto:</strong> ID {{ product.product_id }} -
            {{ product.value }} $
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';

defineProps<{
  order: {
    order_id: number;
    total: string;
    date: string;
    products: { product_id: number; value: string }[];
  };
}>();

const detailsVisible = ref(false);

const toggleDetails = () => {
  detailsVisible.value = !detailsVisible.value;
};
</script>

