<script setup lang="ts">
defineProps<{
  label: string
  value: string | number
  sublabel?: string
  icon: string
  colorClass?: string
}>()
</script>

<template>
  <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-start gap-4">
    <div :class="['w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0', colorClass ?? 'bg-blue-50']">
      {{ icon }}
    </div>
    <div class="min-w-0">
      <p class="text-2xl font-bold text-gray-900 leading-tight">{{ value }}</p>
      <p class="text-sm font-medium text-gray-700 mt-0.5">{{ label }}</p>
      <p v-if="sublabel" class="text-xs text-gray-400 mt-0.5">{{ sublabel }}</p>
    </div>
  </div>
</template>
