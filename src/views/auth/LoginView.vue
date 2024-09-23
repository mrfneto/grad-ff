<script setup>
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import Layout from '@/components/Layout.vue'

import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFirebase } from '@/composables/useFirebase'

const { doLogin } = useFirebase()

const router = useRouter()

const form = reactive({ email: '', password: '' })
const loading = ref(false)
const msg = ref(null)

const onSubmit = async () => {
  loading.value = true
  msg.value = null
  try {
    await doLogin(form.email, form.password)
    router.replace({ name: 'home' })
  } catch (error) {
    console.log(error)
    msg.value = 'Email ou senha invalida.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Layout auth>
    <div class="">
      <h1>Bem-vindo</h1>
      <p class="text-sm muted">
        Por favor, faça login na sua conta para solicitar regularização de
        disciplina ou para acompanhar seu pedido.
      </p>

      <form @submit.prevent="onSubmit">
        <Input
          id="email"
          label="E-mail"
          type="email"
          required
          v-model="form.email"
          :error="msg"
        />
        <Input
          id="password"
          label="Senha"
          type="password"
          required
          class="mt-4"
          autocomplete="password"
          v-model="form.password"
        />

        <Button :loading="loading" variant="primary" class="w-full mt-6">
          Salvar
        </Button>
      </form>

      <p class="mt-6 text-sm">
        Novo por aqui? <Button variant="link" to="/">Crie sua conta.</Button>
      </p>
    </div>
  </Layout>
</template>
