<script setup>
import Layout from '@/components/Layout.vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'

import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFirebase } from '@/composables/useFirebase'
import Checkbox from '@/components/Checkbox.vue'

const { save, find, get } = useFirebase('irregularities')

const route = useRoute()
const router = useRouter()

const id = computed(() => route.params.id || null)

const loading = ref(false)
const loadingForm = ref(false)
const form = ref({
  name: '',
  description: '',
  active: true
})

const onSubmit = async () => {
  loading.value = true
  try {
    await save(form.value, id.value)
    alert('Irregularidade salvo com sucesso.')
    router.replace({ name: 'irregularities' })
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
    :title="`${id ? 'Editar' : 'Cadastrar'}  Irregularidade`"
    description="Gerencie as informações da irregularidade"
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
          label="Nome "
        />
        <Input
          type="textarea"
          id="description"
          v-model="form.description"
          required
          label="Descrição"
        />

        <Checkbox
          id="active"
          v-model="form.active"
          label="Exibir"
          description="Desmarque esta opção para não ser exibido no formulário de regularização."
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
          <Button
            variant="outline"
            :to="{ name: 'irregularities' }"
            class="w-full"
          >
            Cancelar
          </Button>
        </div>
      </form>
    </template>
  </Layout>
</template>
