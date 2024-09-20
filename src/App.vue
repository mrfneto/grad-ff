<script setup></script>

<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex-1 flex flex-col">
      <RouterView />
    </div>
    <footer class="border-t border-gray-300 bg-white py-2">
      <div class="container flex items-start justify-between">
        <div class="flex flex-col">
          <a
            href="https://ufrj.br"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm muted hover:underline"
            >UFRJ</a
          >
          <a
            href="https://farmacia.ufrj.br"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm muted hover:underline"
            >Faculdade de Farmácia</a
          >
          <a
            href="https://graduacao.farmacia.ufrj.br/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm muted hover:underline"
            >Secretaria Acadêmica de Graduação</a
          >
        </div>
        <div>
          <a
            href="http://"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm muted hover:underline"
            >@mrfneto - {{ new Date().getFullYear() }}</a
          >
        </div>
      </div>
    </footer>
  </div>
</template>
