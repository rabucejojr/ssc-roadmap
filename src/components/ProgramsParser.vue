<script setup lang="ts">
import type { PhasePrograms } from '@/types/roadmap'

defineProps<{ data: PhasePrograms }>()
</script>

<template>
  <div class="space-y-6">
    <!-- Programs section -->
    <div v-if="data.programs.length">
      <h4 class="text-xs font-bold uppercase tracking-wider mb-3 text-blue-700">Programs</h4>
      <ul class="space-y-3">
        <li
          v-for="(item, i) in data.programs"
          :key="i"
          class="pl-3 border-l-2 border-blue-100"
        >
          <p class="text-sm font-medium text-gray-800 leading-snug">{{ item.name }}</p>
          <p v-if="item.description" class="text-sm text-gray-500 leading-relaxed mt-0.5">
            {{ item.description }}
          </p>
        </li>
      </ul>
    </div>

    <!-- Policies section -->
    <div v-if="data.policies.length">
      <h4 class="text-xs font-bold uppercase tracking-wider mb-3 text-emerald-700">Policies</h4>
      <ul class="space-y-3">
        <li
          v-for="(item, i) in data.policies"
          :key="i"
          class="pl-3 border-l-2 border-emerald-100"
        >
          <p class="text-sm font-medium text-gray-800 leading-snug">{{ item.name }}</p>
          <p v-if="item.description" class="text-sm text-gray-500 leading-relaxed mt-0.5">
            {{ item.description }}
          </p>
        </li>
      </ul>
    </div>

    <p
      v-if="!data.programs.length && !data.policies.length"
      class="text-sm text-gray-400 italic"
    >
      No programs defined for this phase.
    </p>
  </div>
</template>
