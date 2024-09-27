<script setup>
import { ref } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  modelValue: {
    type: Boolean,
    default: false
  },
  label: String,
  description: String
})

const emit = defineEmits(['update:modelValue'])

const isChecked = ref(props.modelValue)

const toggleCheckbox = () => {
  isChecked.value = !isChecked.value
  emit('update:modelValue', isChecked.value)
}
</script>

<template>
  <div class="checkbox-wrapper" :class="$attrs.class">
    <input
      type="checkbox"
      :id="id"
      :checked="isChecked"
      @change="toggleCheckbox"
      class="rounded border-gray-300 text-gray-600 shadow-sm focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
      v-bind="{ ...$attrs, class: null }"
    />
    <label :for="id" v-if="label" class="ml-4">{{ label }}</label>
    <p v-if="description" class="muted text-sm mt-1">{{ description }}</p>
  </div>
</template>
