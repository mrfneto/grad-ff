<script setup>
import Layout from '@/components/Layout.vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'

import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFirebase } from '@/composables/useFirebase'
import Checkbox from '@/components/Checkbox.vue'
import Icon from '@/components/Icon.vue'

const { save, find, get } = useFirebase('semesters')

const route = useRoute()
const router = useRouter()

const id = computed(() => route.params.id || null)

const loading = ref(false)
const loadingForm = ref(false)

const form = ref({
  name: '',
  active: false,
  date_result: ''
})

const getSemesterExist = async value => {
  const { docs } = await get({
    filters: [{ field: 'name', operator: '==', value: value }]
  })

  return docs.length ? true : false
}

const onSubmit = async () => {
  loading.value = true
  try {
    // if (!id.value) {
    //   const semesterExist = await getSemesterExist(form.value.name)
    //   if (semesterExist) {
    //     alert('Já existe um semestre com o período informado')

    //   }
    // }
    await save(form.value, id.value)
    alert('Semestre salvo com sucesso.')
    router.replace({ name: 'semesters' })
  } catch (error) {
    console.log('Ocorre um erro ao salvar o registro.', error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  if (id.value) {
    loadingForm.value = true
    try {
      form.value = await find(id.value)
    } catch (error) {
      console.log(error)
    } finally {
      loadingForm.value = false
    }
  }
})
</script>

<template>
  <Layout
    :title="`${id ? 'Editar' : 'Cadastrar'}  Semestre`"
    description="Gerencie as informações do semestre"
  >
    <template #content>
      <div v-if="loadingForm" class="py-4 flex items-center justify-center">
        <Icon name="Loader" class="size-8" />
      </div>
      <form v-else @submit.prevent="onSubmit" class="space-y-4">
        <Input
          type="text"
          id="name"
          v-model="form.name"
          required
          label="Semester (Ex: 2024-1)"
          placeholder="Ex: 2024-1"
          pattern="[0-9]{4}-[1-3]{1}"
        />

        <Checkbox
          id="active"
          v-model="form.active"
          label="Publicar"
          description="Marque esta opção para tornar o formulário visível para os alunos."
        />

        <Input
          type="date"
          id="date_result"
          v-model="form.date_result"
          required
          label="Previsão para a análies do coordenador"
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
