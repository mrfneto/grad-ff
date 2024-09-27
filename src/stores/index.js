import { ref } from 'vue'
import { defineStore } from 'pinia'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase'
import { getCurrentDate } from '@/helpers/data'
import { useFirebase } from '@/composables/useFirebase'

const { get } = useFirebase('semesters')

export const useStore = defineStore('main', () => {
  const user = ref({ name: 'Mrfneto' })
  const currentSemester = ref(null)

  const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(
        auth,
        u => {
          user.value = u
          resolve(u)
        },
        e => {
          reject(e)
        }
      )
    })
  }

  const getCurrentSementer = async () => {
    const currentDate = getCurrentDate()

    const { docs } = await get({
      filters: [{ field: 'active', operator: '==', value: true }],
      sorting: [{ field: 'name', direction: 'desc' }]
    })

    currentSemester.value = docs.length ? docs[0] : null
  }

  return { user, currentSemester, getCurrentUser, getCurrentSementer }
})
