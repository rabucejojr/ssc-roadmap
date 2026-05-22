<script setup lang="ts">
import { RouterLink } from 'vue-router'

export interface Crumb {
  label: string
  to?: { name: string; params?: Record<string, string> }
}

defineProps<{ crumbs: Crumb[] }>()
</script>

<template>
  <nav aria-label="Breadcrumb" class="flex items-center gap-1.5 text-sm flex-wrap">
    <template v-for="(crumb, i) in crumbs" :key="i">
      <RouterLink
        v-if="crumb.to"
        :to="crumb.to"
        class="text-blue-600 hover:text-blue-800 transition-colors truncate max-w-[180px]"
      >
        {{ crumb.label }}
      </RouterLink>
      <span v-else class="text-gray-500 font-medium truncate max-w-[220px]">
        {{ crumb.label }}
      </span>
      <svg
        v-if="i < crumbs.length - 1"
        class="w-3.5 h-3.5 text-gray-300 flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </template>
  </nav>
</template>
