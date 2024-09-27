<script setup>
import Icon from './Icon.vue'
import Logo from './Logo.vue'
import Button from './Button.vue'
import Dropdown from './Dropdown.vue'
import DropdownLink from './DropdownLink.vue'

import { computed } from 'vue'
import { useStore } from '@/stores'
import { useRouter } from 'vue-router'
import { useFirebase } from '@/composables/useFirebase'

const { doLogout } = useFirebase()

const router = useRouter()
const store = useStore()

const logout = async () => {
  await doLogout()
  router.replace({ name: 'login' })
}

const user = computed(() => {
  const displayName = store.user?.displayName
  const email = store.user?.email

  return {
    name: displayName ? displayName.split(' ')[0] : email.split('@')[0],
    email: email
  }
})
</script>

<template>
  <header class="bg-white border border-gray-200">
    <nav class="container flex items-center justify-between h-16">
      <!-- NAVBAR START -->
      <div class="flex items-center justify-start space-x-4">
        <RouterLink to="/">
          <Logo class="size-10" />
        </RouterLink>
      </div>

      <!-- NAVBAR END -->
      <div class="flex items-center justify-end space-x-4">
        <!-- DROPDOWN -->
        <Dropdown>
          <!-- DROPDOWN BUTTON -->
          <template #trigger>
            <Button variant="outline" class="space-x-2">
              <span class="hidden md:flex text-sm">Olá, {{ user.name }} </span>
              <Icon name="ChevronDown" class="size-4" />
            </Button>
          </template>

          <!-- DROPDOWN CONTENT -->
          <template #content>
            <DropdownLink
              :to="{ name: 'home' }"
              class="dropdown-link"
              icon="Home"
            >
              <span>Home</span>
            </DropdownLink>
            <hr />
            <DropdownLink
              :to="{ name: 'semesters' }"
              class="dropdown-link"
              icon="Calendar"
            >
              <span>Semestres</span>
            </DropdownLink>
            <DropdownLink
              class="dropdown-link"
              icon="UsersRound"
              :to="{ name: 'teachers' }"
            >
              Coordenadores
            </DropdownLink>
            <DropdownLink
              class="dropdown-link"
              icon="ShieldAlert"
              :to="{ name: 'irregularities' }"
            >
              Irregularidades
            </DropdownLink>
            <hr />

            <DropdownLink @click="logout" icon="LogOut">Logout</DropdownLink>
            <!-- <button @click="logout" class="dropdown-link button">Logout</button> -->
          </template>
        </Dropdown>
      </div>
    </nav>
  </header>
</template>
