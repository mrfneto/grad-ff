<script setup>
import { computed } from 'vue'
import Icon from './Icon.vue'

const props = defineProps({
  type: {
    type: String,
    default: 'submit'
  },
  variant: {
    type: String,
    default: 'base', // Variantes: primary | outline
    validator: value => ['primary', 'outline', 'link', 'base'].includes(value)
  },
  to: [String, Object],
  shape: Boolean,
  loading: Boolean,
  sm: Boolean,
  icon: String
})

const buttonClasses = computed(() => {
  const baseClasses =
    'inline-flex items-center justify-center rounded shadow-sm transition-all duration-200 transform outline-none focus:active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed hover:ring-1 hover:ring-gray-200'
  const variantClasses = {
    primary: 'bg-gray-800 text-white hover:bg-gray-700',
    outline: 'border border-gray-500 hover:bg-gray-200',
    link: 'underline text-sm text-gray-600 hover:text-gray-900 hover:ring-0 shadow-none ',
    base: 'hover:bg-gray-200'
  }[props.variant]

  const shapeClasses = props.shape
    ? props.sm
      ? 'w-8 h-8 '
      : 'w-10 h-10 '
    : props.variant === 'link'
    ? 'p-0'
    : 'px-4 h-10'

  return `${baseClasses} ${variantClasses} ${shapeClasses}`
})
</script>

<template>
  <component
    :is="to ? 'RouterLink' : 'button'"
    :to="to"
    :disabled="loading"
    :type="type"
    :class="buttonClasses"
  >
    <Icon
      :name="icon"
      v-if="icon && !loading"
      class="size-4"
      :class="shape ? 'mr-0' : 'mr-2'"
    />

    <Icon name="LoaderCircle" v-if="loading" class="size-5 animate-spin" />

    <slot v-else />
  </component>
</template>
