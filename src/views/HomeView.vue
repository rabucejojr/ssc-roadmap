<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import StatCard from '@/components/StatCard.vue'
import SectorCard from '@/components/SectorCard.vue'
import { useRoadmapStore } from '@/stores/roadmap'

const store = useRoadmapStore()
const { sectors, roadmapStats } = store

const stats = [
  {
    label: 'Sectors',
    value: roadmapStats.totalSectors,
    sublabel: 'Strategic focus areas',
    icon: '🏛️',
    colorClass: 'bg-blue-50',
  },
  {
    label: 'Subsectors',
    value: roadmapStats.totalSubsectors,
    sublabel: 'Implementation areas',
    icon: '📌',
    colorClass: 'bg-teal-50',
  },
  {
    label: 'Timeline',
    value: `${roadmapStats.timelineStart}–${roadmapStats.timelineEnd}`,
    sublabel: '5 implementation phases',
    icon: '📅',
    colorClass: 'bg-amber-50',
  },
  {
    label: 'Phase Entries',
    value: roadmapStats.totalPhaseEntries,
    sublabel: 'Milestones, KPIs & programs',
    icon: '🎯',
    colorClass: 'bg-green-50',
  },
]
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />

    <main>
      <section class="bg-linear-to-br from-blue-800 to-blue-900 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div class="max-w-3xl">
            <p class="text-blue-200 text-sm font-medium uppercase tracking-wider mb-3">
              Smart and Sustainable Communities
            </p>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5">
              SSC Roadmap<br />
              <span class="text-blue-200">PLGU Surigao del Norte</span>
            </h1>
            <p class="text-blue-100 text-base sm:text-lg leading-relaxed max-w-2xl">
              A comprehensive roadmap guiding Surigao del Norte toward a future-ready, resilient, and
              sustainable province through five phased implementation cycles from 2028 to 2040.
            </p>
          </div>
        </div>
      </section>

      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            v-for="stat in stats"
            :key="stat.label"
            :label="stat.label"
            :value="stat.value"
            :sublabel="stat.sublabel"
            :icon="stat.icon"
            :colorClass="stat.colorClass"
          />
        </div>
      </section>

      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="mb-6">
          <h2 class="text-xl font-bold text-gray-900">Roadmap Sectors</h2>
          <p class="text-sm text-gray-500 mt-1">Select a sector to explore its subsectors and implementation phases.</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <SectorCard v-for="sector in sectors" :key="sector.slug" :sector="sector" />
        </div>
      </section>

      <footer class="border-t border-gray-200 bg-white mt-4">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <p class="text-sm text-gray-400">
            SSC Roadmap Dashboard — Provincial Government of Surigao del Norte &middot; 2028–2040
          </p>
        </div>
      </footer>
    </main>
  </div>
</template>
