<template>
  <q-dialog :model-value="isOpen" @hide="close" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">Importar Pedido(s)</div>
      </q-card-section>

      <q-card-section>
        <label for="file">Insira um arquivo .txt</label>
        <q-file
          type="file"
          v-model="file"
          @change="handleFileChange"
          accept=".txt"
          label="Selecione um arquivo .txt"
          ref="fileInput"
        />
        <div v-if="errorMessage" class="text-negative">{{ errorMessage }}</div>
      </q-card-section>

      <q-card-actions>
        <q-btn label="Cancelar" @click="close" color="grey" />
        <q-btn
          label="Enviar"
          @click="submit"
          color="primary"
          :disable="!file"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, toRef } from 'vue';

defineOptions({
  name: 'FileUploadModal',
});

const props = defineProps<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (file: File) => void;
}>();

const emit = defineEmits(['submit', 'close']);

const file = ref<File | null>(null);
const errorMessage = ref('');
const isOpen = toRef(props, 'isOpen');

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length) {
    const selectedFile = target.files[0];

    if (selectedFile.size > 2 * 1024 * 1024) {
      errorMessage.value = 'O arquivo deve ser menor que 2MB.';
      file.value = null;
    } else {
      errorMessage.value = '';
      file.value = selectedFile;
    }
  }
};

const submit = () => {
  if (file.value) {
    emit('submit', file.value);
  }
};

const close = () => {
  file.value = null;
  errorMessage.value = '';
  emit('close');
};
</script>
