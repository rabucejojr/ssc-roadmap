<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
import PhaseTimeline from '@/components/PhaseTimeline.vue'
import PhaseDetail from '@/components/PhaseDetail.vue'
import { useRoadmap } from '@/composables/useRoadmap'
import { getSectorColors } from '@/utils/roadmap'
import type { Crumb } from '@/components/BreadcrumbNav.vue'

const route = useRoute()
const router = useRouter()
const { findSector, findSubsector } = useRoadmap()

const sectorSlug = computed(() => route.params.sectorSlug as string)
const subsectorSlug = computed(() => route.params.subsectorSlug as string)

const sector = computed(() => findSector(sectorSlug.value))
const subsector = computed(() => findSubsector(sectorSlug.value, subsectorSlug.value))

if (!sector.value || !subsector.value) {
  router.replace('/')
}

const activePhase = ref(0)
const colors = computed(() => sector.value ? getSectorColors(sector.value.slug) : null)

const currentPhase = computed(() => subsector.value?.phases[activePhase.value] ?? null)

const crumbs = computed((): Crumb[] => [
  { label: 'Home', to: { name: 'home' } },
  { label: sector.value?.title ?? '', to: { name: 'sector', params: { sectorSlug: sectorSlug.value } } },
  { label: subsector.value?.name ?? '' },
])
</script>

<template>
  <div v-if="sector && subsector" class="min-h-screen bg-gray-50">
    <AppHeader>
      <template #breadcrumb>
        <BreadcrumbNav :crumbs="crumbs" />
      </template>
    </AppHeader>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-6">
        <div class="flex items-start gap-3 flex-wrap">
          <div :class="['w-2 rounded-full self-stretch flex-shrink-0', colors?.bg ?? 'bg-blue-600']" />
          <div class="min-w-0 flex-1">
            <p :class="['text-xs font-semibold uppercase tracking-wider mb-1', colors?.text ?? 'text-blue-700']">
              {{ sector.title }}
            </p>
            <h1 class="text-xl sm:text-2xl font-bold text-gray-900 leading-tight mb-2">
              {{ subsector.name }}
            </h1>
            <p class="text-sm text-gray-600 leading-relaxed max-w-3xl">
              {{ subsector.description }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 mb-6">
        <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">Implementation Phases</p>
        <PhaseTimeline
          :active-index="activePhase"
          :colors="colors ?? undefined"
          @select="(i) => (activePhase = i)"
        />
      </div>

      <div v-if="currentPhase">
        <div class="flex items-center gap-2 mb-4">
          <span :class="['text-xs font-bold px-3 py-1 rounded-full', colors?.badge ?? 'bg-blue-100 text-blue-800']">
            Phase {{ currentPhase.index + 1 }}
          </span>
          <span class="text-sm font-semibold text-gray-700">{{ currentPhase.label }}</span>
          <span class="text-sm text-gray-400">·</span>
          <span class="text-sm text-gray-400">Target: {{ currentPhase.year }}</span>
        </div>
        <PhaseDetail :phase="currentPhase" />
      </div>
    </main>
  </div>
</template>
