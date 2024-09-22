<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col-md-12 q-pb-xl">
        <span class="title-component"> Pedidos </span>
        <q-separator inset class="full-width" />
      </div>
    </div>
    <div class="row justify-between q-pb-xl">
      <div class="col-md-4">
        <q-input filled label="Pesquisar aqui...">
          <template #append>
            <q-icon name="search" class="cursor-pointer" />
          </template>
        </q-input>
      </div>
      <div class="col-md-4 offset-md-4">
        <div class="column items-end">
          <q-btn label="Criar" color="secondary" icon="add"></q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'IndexOrder',
});
</script>
