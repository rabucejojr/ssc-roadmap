<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="bg-blue-800 text-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <RouterLink to="/" class="flex items-center gap-2.5 min-w-0">
          <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
            🗺️
          </div>
          <div class="min-w-0">
            <p class="text-sm font-bold leading-tight truncate">SSC Roadmap</p>
            <p class="text-xs text-blue-200 leading-tight hidden sm:block truncate">PLGU Surigao del Norte</p>
          </div>
        </RouterLink>
        <slot name="actions" />
      </div>
    </div>
  </header>
  <div v-if="$slots.breadcrumb" class="bg-white border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
      <slot name="breadcrumb" />
    </div>
  </div>
</template>
