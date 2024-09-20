<script setup>
import Logo from '@/components/Logo.vue'
import { useFirebase } from '@/composables/useFirebase'

import { useStore } from '@/stores'
import { useRouter } from 'vue-router'

const { doLogout } = useFirebase()

const { user } = useStore()
const router = useRouter()

const logout = async () => {
  await doLogout()
  router.replace({ name: 'login' })
}
</script>

<template>
  <div class="container mx-auto">
    <Logo class="size-12" />
    <h1>Home Page</h1>
    <p class="mt-4 text-gray-600">{{ user?.name }}</p>
    <button class="btn btn-primary px-6" @click="logout">logout</button>
  </div>
</template>
