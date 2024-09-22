<template>
  <q-layout view="lHh lpr lFf" container class="shadow-2 rounded-borders">
    <q-header bordered class="bg-grey-3 text-primary">
      <q-toolbar>
        <q-toolbar-title class="text-center"> Import Wizard </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-footer bordered class="bg-grey-3 text-primary text-center">
      Desenvolvido por Uilton Gomes
    </q-footer>
    <q-page-container style="height: 100%">
      <q-page class="q-pa-md" style="height: 100%">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
defineOptions({
  name: 'App',
});
</script>
