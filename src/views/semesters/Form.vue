<script setup>
import Layout from '@/components/Layout.vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'

import { ref, onMounted } from 'vue'

const form = ref({
  name: '',
  date_start: '',
  date_end: '',
  date_result: ''
})

const onSubmit = () => {
  console.log(form.value)
}
</script>

<template>
  <Layout
    title="Cadastrar Semestre"
    description="Gerencie as informações do semestre"
  >
    <template #content>
      <form @submit.prevent="onSubmit" class="space-y-4">
        <Input
          type="text"
          id="name"
          v-model="form.name"
          required
          label="Semester"
          placeholder="Ex: 2024-1"
          pattern="[0-9]{4}-[1-3]{1}"
        />
        <Input
          type="date"
          id="date_start"
          v-model="form.date_start"
          required
          label="Início"
        />
        <Input
          type="date"
          id="date_end"
          v-model="form.date_end"
          required
          label="Término"
        />
        <Input
          type="date"
          id="date_result"
          v-model="form.date_result"
          required
          label="Previsão de avaliação"
        />
        <div class="flex items-center gap-4 pt-4">
          <Button type="submit" variant="primary" class="w-full">
            Salvar
          </Button>
          <Button variant="outline" :to="{ name: 'semesters' }" class="w-full">
            Cancelar
          </Button>
        </div>
      </form>
    </template>
  </Layout>
</template>
