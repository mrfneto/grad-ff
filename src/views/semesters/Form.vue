<script setup>
import Layout from '@/components/Layout.vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'

import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFirebase } from '@/composables/useFirebase'

const { save, find } = useFirebase('semesters')

const route = useRoute()
const router = useRouter()

const id = computed(() => route.params.id || null)

const loading = ref(false)
const form = ref({
  name: '',
  date_start: '',
  date_end: '',
  date_result: ''
})

const onSubmit = async () => {
  loading.value = true
  try {
    await save(form.value, id.value)
    window.alert('Semestre salvo com sucesso.')
    router.replace({ name: 'semesters' })
  } catch (error) {
    console.log('Ocorre um erro ao salvar o registro.', error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  if (id.value) {
    form.value = await find(id.value)
  }
})
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
          <Button
            type="submit"
            variant="primary"
            class="w-full"
            :loading="loading"
          >
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
