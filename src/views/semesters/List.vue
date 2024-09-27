<script setup>
import Layout from '@/components/Layout.vue'
import Button from '@/components/Button.vue'
import Icon from '@/components/Icon.vue'
import { onMounted, ref } from 'vue'
import { useFirebase } from '@/composables/useFirebase'

const { get, remove } = useFirebase('semesters')

const documents = ref([])

const removeDoc = async value => {
  const confirmed = confirm('Tem certeza que deseja deletar este registro?')
  if (confirmed) {
    await remove(value)
    load()
  }
}

const load = async () => {
  const { docs } = await get({
    sorting: [{ field: 'name', direction: 'desc' }],
    limitCount: 5
  })
  documents.value = docs
}

onMounted(async () => {
  load()
})
</script>

<template>
  <Layout title="Semestres" description="Gerencie sua lista de semestres">
    <template #content>
      <div class="text-end">
        <Button variant="primary" icon="Plus" :to="{ name: 'semesters-add' }">
          Adicionar
        </Button>
      </div>

      <div class="py-8 text-center mt-8" v-if="!documents.length">
        <h3>Nenhum semestre cadastrado.</h3>
        <p>Click em adicionar para cadastrar um novo semestre</p>
      </div>
      <div v-else class="relative -mx-4 mt-6 overflow-x-auto sm:-mx-6">
        <div class="overflow-hidden border border-gray-200">
          <table>
            <thead>
              <th>Semestre</th>
              <th>Período de regularização</th>
              <th>Previsão de análises</th>
              <th><span class="sr-only">Editar</span></th>
            </thead>
            <tbody>
              <tr v-for="doc in documents" :key="doc.id">
                <td class="font-medium">{{ doc.name }}</td>
                <td>{{ doc.date_start }} à {{ doc.date_end }}</td>
                <td>{{ doc.date_result }}</td>
                <td class="flex items-center justify-end space-x-2">
                  <Button
                    :to="{ name: 'semesters-edit', params: { id: doc.id } }"
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
        </div>
      </div>
    </template>
  </Layout>
</template>
