<script setup>
import Layout from '@/components/Layout.vue'
import { useStore } from '@/stores'
import { onMounted } from 'vue'

const store = useStore()

onMounted(() => {
  store.getCurrentSementer()
})
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
      <p>{{ store.currentSemester }}</p>
    </template>
  </Layout>
</template>
