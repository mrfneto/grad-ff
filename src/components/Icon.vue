<script setup>
import { computed } from 'vue'
import * as icons from 'lucide-vue-next'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: Number
})

const icon = computed(() => icons[props.name])
</script>

<template>
  <component :is="icon" :size="size" />
</template>
