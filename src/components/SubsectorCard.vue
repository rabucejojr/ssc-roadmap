<script setup lang="ts">
import type { Subsector, Sector } from '@/types/roadmap'
import { getSectorColors, slugify, truncate } from '@/utils/roadmap'
import { RouterLink } from 'vue-router'
import { PHASE_YEARS } from '@/utils/roadmap'

const props = defineProps<{
  subsector: Subsector
  sector: Sector
}>()

const colors = getSectorColors(props.sector.slug)
const subsectorSlug = slugify(props.subsector.name)
</script>

<template>
  <RouterLink
    :to="{ name: 'subsector', params: { sectorSlug: sector.slug, subsectorSlug } }"
    class="block bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 p-5 group"
  >
    <div class="flex items-start justify-between gap-2 mb-2">
      <h3 class="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors leading-snug">
        {{ subsector.name }}
      </h3>
      <svg class="w-4 h-4 text-gray-300 group-hover:text-blue-400 shrink-0 mt-0.5 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </div>
    <p class="text-xs text-gray-500 leading-relaxed mb-4">
      {{ truncate(subsector.description, 100) }}
    </p>
    <div class="flex items-center gap-1">
      <div
        v-for="year in PHASE_YEARS"
        :key="year"
        :class="['flex-1 h-1.5 rounded-full', colors.bg, 'opacity-70']"
      />
    </div>
    <div class="flex justify-between mt-1">
      <span class="text-xs text-gray-400">{{ PHASE_YEARS[0] }}</span>
      <span class="text-xs text-gray-400">{{ PHASE_YEARS[PHASE_YEARS.length - 1] }}</span>
    </div>
  </RouterLink>
</template>
