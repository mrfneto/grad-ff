<script setup>
import Button from '@/components/Button.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const back = () => {
  router.go(-1)
}
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <div class="container text-center">
      <p class="text-primary-600 font-bold mt-8">Erro 404</p>
      <h1 class="mt-3">Página não encontrada!</h1>
      <p class="mt-4 muted">
        Desculpe, a página que você está procurando não existe ou foi movida.
      </p>
      <Button @click="back" class="mt-6" icon="MoveLeft"> Voltar </Button>
    </div>
  </div>
</template>
