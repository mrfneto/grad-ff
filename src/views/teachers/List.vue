<script setup>
import Layout from '@/components/Layout.vue'
import Button from '@/components/Button.vue'
import Icon from '@/components/Icon.vue'
import { onMounted, ref } from 'vue'
import { useFirebase } from '@/composables/useFirebase'

const { get, remove } = useFirebase('teachers')

const documents = ref([])
const loading = ref(false)

const removeDoc = async value => {
  const confirmed = confirm('Tem certeza que deseja deletar este registro?')
  if (confirmed) {
    await remove(value)
    load()
  }
}

const load = async () => {
  loading.value = true
  try {
    const { docs } = await get({
      sorting: [{ field: 'name' }]
    })
    documents.value = docs
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  load()
})
</script>

<template>
  <Layout
    title="Coordenadores"
    description="Gerencie sua lista de coordenadores"
  >
    <template #content>
      <div class="text-end">
        <Button variant="primary" icon="Plus" :to="{ name: 'teachers-add' }">
          Adicionar
        </Button>
      </div>

      <div class="py-8 text-center mt-8" v-if="!documents.length && !loading">
        <h3>Nenhum coordenador cadastrado.</h3>
        <p>Click em adicionar para cadastrar um novo coordenador</p>
      </div>
      <div v-else class="relative -mx-4 mt-6 overflow-x-auto sm:-mx-6">
        <div class="overflow-hidden border border-gray-200">
          <table>
            <thead>
              <th>Coordenador</th>
              <th>SIAPE</th>
              <th>Ativo</th>
              <th><span class="sr-only">Editar</span></th>
            </thead>
            <tbody>
              <tr v-for="doc in documents" :key="doc.id">
                <td class="font-medium">{{ doc.name }}</td>
                <td>{{ doc.siape }}</td>

                <td>
                  <Icon
                    :name="doc.active ? 'Check' : 'X'"
                    :class="[
                      'size-4',
                      doc.active ? 'text-sucess-500' : 'text-danger-500'
                    ]"
                  />
                </td>
                <td class="flex items-center justify-end space-x-2">
                  <Button
                    :to="{ name: 'teachers-edit', params: { id: doc.id } }"
                    class="hover:bg-gray-200"
                    sm
                    shape
                  >
                    <Icon name="Edit" class="size-4" />
                  </Button>
                  <Button
                    type="button"
                    @click="removeDoc(doc.id)"
                    class="hover:bg-gray-200"
                    sm
                    shape
                  >
                    <Icon name="Trash" class="size-4" />
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="loading" class="py-4 flex items-center justify-center">
            <Icon name="Loader" class="size-8" />
          </div>
        </div>
      </div>
    </template>
  </Layout>
</template>
