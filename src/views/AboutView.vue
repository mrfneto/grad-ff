  <template>
    <div class="container py-8">
      <button class="btn btn-primary px-4" @click="loadDocuments">
        Load Documents
      </button>

      <div class="table-container my-6">
        <table>
          <thead>
            <th>Código</th>
            <th>Disciplina</th>
            <th>tipo</th>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.disciplina }}</td>
              <td>{{ item.tipo }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button class="btn btn-outline px-4" @click="loadMoreDocuments">
        Load More
      </button>
    </div>
  </template>

  <script setup>
  import { ref } from 'vue'
  import { dbDisciplinas } from '@/services/fbServices'

  const items = ref([])
  const lastVisible = ref(null)

  const loadDocuments = async () => {
    const { docs, lastVisible: lastDoc } = await dbDisciplinas.get({
      filters: [
        { field: 'tipo', operator: '==', value: 'Disciplinas Obrigatórias ' }
      ],
      sorting: [{ field: 'disciplina' }],
      limitCount: 5
    })

    items.value = docs
    lastVisible.value = lastDoc

    console.log(lastVisible.value)
  }

  const loadMoreDocuments = async () => {
    console.log(lastVisible.value)
    // if (!lastVisible.value) return
    if (!lastVisible.value) {
      console.log('No more documents to load.')
      return
    }

    const { docs, lastVisible: lastDoc } = await dbDisciplinas.get({
      filters: [
        { field: 'tipo', operator: '==', value: 'Disciplinas Obrigatórias ' }
      ],
      sorting: [{ field: 'disciplina' }],
      limitCount: 5,
      startAfterDoc: lastVisible.value
    })

    items.value = [...items.value, ...docs]
    lastVisible.value = lastDoc
  }
  </script>
