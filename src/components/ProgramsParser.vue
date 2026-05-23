<script setup lang="ts">
import { ref } from 'vue'
import type { PhasePrograms } from '@/types/roadmap'
import { ChevronDown, ChevronRight } from '@lucide/vue'

defineProps<{ data: PhasePrograms }>()

// Track open items with a string key: "p-{i}" for programs, "pol-{i}" for policies
const open = ref<Set<string>>(new Set())

function toggle(key: string) {
  if (open.value.has(key)) {
    open.value.delete(key)
  } else {
    open.value.add(key)
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Programs section -->
    <div v-if="data.programs.length">
      <h4 class="text-xs font-bold uppercase tracking-wider mb-2 text-blue-700">Programs</h4>
      <ul class="space-y-1">
        <li v-for="(item, i) in data.programs" :key="i">
          <button
            :class="[
              'w-full flex items-start gap-2 text-left px-3 py-2 rounded-lg transition-colors duration-150 group',
              item.description ? 'cursor-pointer hover:bg-blue-50/60' : 'cursor-default',
            ]"
            :disabled="!item.description"
            @click="item.description ? toggle(`p-${i}`) : undefined"
          >
            <span class="mt-0.5 shrink-0 text-blue-400">
              <component
                :is="open.has(`p-${i}`) ? ChevronDown : ChevronRight"
                :size="14"
                :class="item.description ? 'opacity-100' : 'opacity-0'"
              />
            </span>
            <span class="text-sm font-medium text-gray-800 leading-snug">{{ item.name }}</span>
          </button>
          <div
            v-if="item.description && open.has(`p-${i}`)"
            class="ml-5 px-3 pb-2 text-sm text-gray-500 leading-relaxed border-l-2 border-blue-100"
          >
            {{ item.description }}
          </div>
        </li>
      </ul>
    </div>

    <!-- Policies section -->
    <div v-if="data.policies.length">
      <h4 class="text-xs font-bold uppercase tracking-wider mb-2 text-emerald-700">Policies</h4>
      <ul class="space-y-1">
        <li v-for="(item, i) in data.policies" :key="i">
          <button
            :class="[
              'w-full flex items-start gap-2 text-left px-3 py-2 rounded-lg transition-colors duration-150',
              item.description ? 'cursor-pointer hover:bg-emerald-50/60' : 'cursor-default',
            ]"
            :disabled="!item.description"
            @click="item.description ? toggle(`pol-${i}`) : undefined"
          >
            <span class="mt-0.5 shrink-0 text-emerald-400">
              <component
                :is="open.has(`pol-${i}`) ? ChevronDown : ChevronRight"
                :size="14"
                :class="item.description ? 'opacity-100' : 'opacity-0'"
              />
            </span>
            <span class="text-sm font-medium text-gray-800 leading-snug">{{ item.name }}</span>
          </button>
          <div
            v-if="item.description && open.has(`pol-${i}`)"
            class="ml-5 px-3 pb-2 text-sm text-gray-500 leading-relaxed border-l-2 border-emerald-100"
          >
            {{ item.description }}
          </div>
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
