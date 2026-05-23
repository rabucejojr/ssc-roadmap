<script setup lang="ts">
import type { Component } from 'vue'
import type { Sector } from '@/types/roadmap'
import { getSectorColors, truncate } from '@/utils/roadmap'
import { RouterLink } from 'vue-router'
import { Landmark, Users, TrendingUp, Leaf, Building2, Layers } from '@lucide/vue'

const props = defineProps<{ sector: Sector }>()
const colors = getSectorColors(props.sector.slug)

const SECTOR_ICONS: Record<string, Component> = {
  'development-administration': Landmark,
  'social-services': Users,
  economy: TrendingUp,
  environment: Leaf,
  infrastructure: Building2,
}

const icon = SECTOR_ICONS[props.sector.slug] ?? Layers
</script>

<template>
  <RouterLink
    :to="{ name: 'sector', params: { sectorSlug: sector.slug } }"
    class="block bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group"
  >
    <div :class="['h-2 w-full', colors.bg]" />
    <div class="p-5">
      <div class="flex items-start gap-3 mb-3">
        <div :class="['w-10 h-10 rounded-lg flex items-center justify-center shrink-0', colors.light]">
          <component :is="icon" :size="20" :class="colors.text" />
        </div>
        <div class="min-w-0 flex-1">
          <h3 class="text-base font-semibold text-gray-900 group-hover:text-blue-700 transition-colors leading-snug">
            {{ sector.title }}
          </h3>
          <span :class="['inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full', colors.badge]">
            {{ sector.subsectors.length }} subsector{{ sector.subsectors.length !== 1 ? 's' : '' }}
          </span>
        </div>
      </div>
      <p class="text-sm text-gray-500 leading-relaxed">
        {{ truncate(sector.vision, 140) }}
      </p>
      <div class="mt-4 flex items-center gap-1.5 flex-wrap">
        <span
          v-for="sub in sector.subsectors"
          :key="sub.name"
          class="text-xs text-gray-400 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-full"
        >
          {{ sub.name }}
        </span>
      </div>
    </div>
  </RouterLink>
</template>
