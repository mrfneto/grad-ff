<script setup>
import Layout from '@/components/Layout.vue'

import { ref } from 'vue'

const label = 'Upload de Arquivo' // Pode ser passado via props
const description = 'Selecione um arquivo para upload' // Pode ser passado via props

// Referência para o input de arquivo
const fileInput = ref(null)

// Arquivo selecionado
const selectedFile = ref(null)

// Função para disparar o clique no input de arquivo
const handleFileClick = () => {
  fileInput.value.click()
}

// Função para capturar o arquivo selecionado
const handleFileChange = event => {
  const files = event.target.files
  if (files.length > 0) {
    selectedFile.value = files[0]
  }
}
</script>

<template>
  <Layout
    title="Regularização"
    description="Lista de pedidos de regularização em disciplinas"
  >
    <template #content>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque
        necessitatibus dolorem dolores in dolorum error, explicabo laborum nemo
        ipsa saepe excepturi id iste provident? Doloremque ea ipsam expedita
        harum dolorum.
      </p>
    </template>
  </Layout>
</template>
