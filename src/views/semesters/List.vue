<script setup>
import Layout from '@/components/Layout.vue'
import Button from '@/components/Button.vue'
</script>

<template>
  <Layout title="Semestres" description="Gerencie sua lista de semestres">
    <template #content>
      <div class="text-end">
        <Button variant="primary" icon="Plus" :to="{ name: 'semesters-add' }">
          Adicionar
        </Button>
      </div>
    </template>
  </Layout>
</template>
