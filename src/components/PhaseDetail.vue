<script setup lang="ts">
import { ref } from 'vue'
import type { Phase } from '@/types/roadmap'
import ProgramsParser from './ProgramsParser.vue'

defineProps<{ phase: Phase }>()

type Tab = 'milestone' | 'kpis' | 'programs'
const activeTab = ref<Tab>('milestone')

const tabs: { key: Tab; label: string; icon: string }[] = [
  { key: 'milestone', label: 'Milestone', icon: '🎯' },
  { key: 'kpis', label: 'KPIs', icon: '📊' },
  { key: 'programs', label: 'Programs & Policies', icon: '📋' },
]
</script>

<template>
  <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
    <div class="border-b border-gray-100 flex">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :class="[
          'flex-1 sm:flex-none px-4 py-3 text-xs sm:text-sm font-medium transition-colors duration-150 flex items-center justify-center gap-1.5',
          activeTab === tab.key
            ? 'border-b-2 border-blue-600 text-blue-700 bg-blue-50/50'
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50',
        ]"
        @click="activeTab = tab.key"
      >
        <span>{{ tab.icon }}</span>
        <span>{{ tab.label }}</span>
      </button>
    </div>

    <div class="p-5">
      <div v-if="activeTab === 'milestone'">
        <p v-if="phase.milestone" class="text-sm text-gray-700 leading-relaxed">
          {{ phase.milestone }}
        </p>
        <p v-else class="text-sm text-gray-400 italic">No milestone defined for this phase.</p>
      </div>

      <div v-else-if="activeTab === 'kpis'">
        <div v-if="phase.kpi" class="space-y-1.5">
          <p
            v-for="(line, i) in phase.kpi.split('\n').filter((l) => l.trim())"
            :key="i"
            class="text-sm text-gray-700 leading-relaxed"
          >
            {{ line }}
          </p>
        </div>
        <p v-else class="text-sm text-gray-400 italic">No KPIs defined for this phase.</p>
      </div>

      <div v-else-if="activeTab === 'programs'">
        <ProgramsParser :data="phase.phasePrograms" />
      </div>
    </div>
  </div>
</template>
