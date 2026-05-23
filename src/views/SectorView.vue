<script setup lang="ts">
import type { Component } from 'vue'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
import SubsectorCard from '@/components/SubsectorCard.vue'
import { useRoadmap } from '@/composables/useRoadmap'
import { getSectorColors } from '@/utils/roadmap'
import type { Crumb } from '@/components/BreadcrumbNav.vue'
import { Landmark, Users, TrendingUp, Leaf, Building2, Layers } from '@lucide/vue'

const route = useRoute()
const router = useRouter()
const { findSector } = useRoadmap()

const sectorSlug = computed(() => route.params.sectorSlug as string)
const sector = computed(() => findSector(sectorSlug.value))

if (!sector.value) {
  router.replace('/')
}

const colors = computed(() => sector.value ? getSectorColors(sector.value.slug) : null)

const crumbs = computed((): Crumb[] => [
  { label: 'Home', to: { name: 'home' } },
  { label: sector.value?.title ?? '' },
])

const SECTOR_ICONS: Record<string, Component> = {
  'development-administration': Landmark,
  'social-services': Users,
  economy: TrendingUp,
  environment: Leaf,
  infrastructure: Building2,
}
</script>

<template>
  <div v-if="sector" class="min-h-screen bg-gray-50">
    <AppHeader>
      <template #breadcrumb>
        <BreadcrumbNav :crumbs="crumbs" />
      </template>
    </AppHeader>

    <main>
      <section :class="['text-white', colors?.bg ?? 'bg-blue-700']">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div class="flex items-start gap-4">
            <div class="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shrink-0 mt-0.5">
              <component :is="SECTOR_ICONS[sector.slug] ?? Layers" :size="32" class="text-white" />
            </div>
            <div class="min-w-0">
              <p class="text-white/70 text-xs font-medium uppercase tracking-wider mb-1">Sector</p>
              <h1 class="text-2xl sm:text-3xl font-bold leading-tight mb-3">{{ sector.title }}</h1>
              <p class="text-white/90 text-sm sm:text-base leading-relaxed max-w-2xl">{{ sector.vision }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="mb-6 flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 class="text-lg font-bold text-gray-900">Subsectors</h2>
            <p class="text-sm text-gray-500 mt-0.5">
              {{ sector.subsectors.length }} implementation area{{ sector.subsectors.length !== 1 ? 's' : '' }} — click to explore phase details
            </p>
          </div>
          <span :class="['text-xs font-medium px-3 py-1.5 rounded-full', colors?.badge ?? 'bg-blue-100 text-blue-800']">
            {{ sector.subsectors.length }} subsectors
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <SubsectorCard
            v-for="sub in sector.subsectors"
            :key="sub.name"
            :subsector="sub"
            :sector="sector"
          />
        </div>
      </section>
    </main>
  </div>
</template>
