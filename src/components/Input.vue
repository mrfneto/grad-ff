<script setup>
import { onMounted, ref } from 'vue'

const model = defineModel()

const props = defineProps({
  type: { type: String, defaul: 'text' },
  id: String,
  label: String,
  error: String,
  placeholder: String,
  disabled: Boolean,
  required: Boolean,
  autocomplete: String
})

const input = ref(null)

onMounted(() => {
  if (input.value.hasAttribute('autofocus')) {
    input.value.focus()
  }
})

defineExpose({ focus: () => input.value.focus() })
</script>

<template>
  <div>
    <label v-if="label" :for="id" class="block font-medium text-sm mb-1">{{
      label
    }}</label>
    <input
      ref="input"
      :type="type"
      :id="id"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :autocomplete="autocomplete"
      v-model="model"
      class="block w-full border-gray-300 focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50 rounded-md shadow-sm"
    />
    <p v-if="error" class="text-sm text-danger-500 mt-1">{{ error }}</p>
  </div>
</template>
