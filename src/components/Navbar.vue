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
        <Logo class="size-10" />
      </div>

      <!-- NAVBAR END -->
      <div class="flex items-center justify-end space-x-4">
        <!-- DROPDOWN -->
        <Dropdown>
          <!-- DROPDOWN BUTTON -->
          <template #trigger>
            <Button variant="outline" class="space-x-2">
              <span class="hidden md:flex text-sm"
                >Olá,
                {{
                  store.user?.displayName
                    ? store.user?.displayName.split(' ')[0]
                    : store.user?.store.user?.email.split('@')[0]
                }}</span
              >
              <Icon name="ChevronDown" class="size-4" />
            </Button>
          </template>

          <!-- DROPDOWN CONTENT -->
          <template #content>
            <DropdownLink to="#" class="dropdown-link" icon="Calendar">
              <span>Semestres</span>
            </DropdownLink>
            <DropdownLink to="#" class="dropdown-link" icon="UsersRound">
              Coordenadores
            </DropdownLink>
            <DropdownLink to="#" class="dropdown-link" icon="ShieldAlert">
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
