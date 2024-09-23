<script setup>
import Logo from './Logo.vue'
import Footer from './Footer.vue'
import Navbar from './Navbar.vue'

defineProps({
  auth: Boolean,
  title: String,
  description: String
})
</script>

<template>
  <!-- AUTHETICATION -->

  <div
    v-if="auth"
    class="min-h-screen flex flex-col justify-center items-center"
  >
    <div>
      <Logo class="size-16 mx-auto" />
    </div>

    <div
      class="w-full sm:max-w-md mt-6 px-6 py-4 shadow-md overflow-hidden sm:rounded-lg"
    >
      <slot />
    </div>
  </div>

  <!-- DEFAULT -->
  <div v-else class="min-h-screen flex flex-col">
    <!-- NAVBAR -->
    <Navbar />
    <!-- MAIN CONTENT -->
    <main class="container flex-1">
      <div class="md:grid md:grid-cols-3 md:gap-6 mt-8">
        <div class="px-4 sm:px-0">
          <h3>
            {{ title }}
          </h3>

          <p class="mt-1 text-sm muted">
            {{ description }}
          </p>
        </div>

        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="px-4 py-5 sm:p-6 bg-white shadow rounded sm:rounded-lg">
            <slot name="content" />
          </div>
        </div>
      </div>
    </main>

    <!-- FOOTER -->
    <Footer />
  </div>
</template>
