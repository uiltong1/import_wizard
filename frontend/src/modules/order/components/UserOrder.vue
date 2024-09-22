<template>
  <div>
    <q-card class="user-card">
      <q-card-section>
        <div class="row items-center">
          <div class="col">
            <span class="text-h5">{{ user.name }}</span>
          </div>
        </div>
        <q-separator />
        <div v-for="order in user.orders" :key="order.order_id">
          <OrderItem :order="order" />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import OrderItem from './OrderItem.vue';

defineProps<{
  user: {
    user_id: number;
    name: string;
    orders: {
      order_id: number;
      total: string;
      date: string;
      products: { product_id: number; value: string }[];
    }[];
  };
}>();
</script>
