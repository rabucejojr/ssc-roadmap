<script setup lang="ts">
import { computed } from 'vue'
import { PHASE_LABELS, PHASE_YEARS } from '@/utils/roadmap'

const props = defineProps<{
  activeIndex: number
  colorClass?: string
}>()

const emit = defineEmits<{
  select: [index: number]
}>()

const progressWidth = computed(() => {
  const pct = (props.activeIndex / (PHASE_LABELS.length - 1)) * 100
  return `${pct}%`
})
</script>

<template>
  <div class="w-full overflow-x-auto">
    <div class="min-w-120 px-2 py-3">
      <!-- Circles row -->
      <div class="relative flex items-center">
        <!-- Full background track -->
        <div class="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-gray-200" />
        <!-- Active progress track -->
        <div
          :class="['absolute left-0 top-1/2 -translate-y-1/2 h-0.5 transition-all duration-300', colorClass ?? 'bg-blue-600']"
          :style="{ width: progressWidth }"
        />

        <!-- Phase buttons, each in an equal flex column -->
        <div
          v-for="(label, i) in PHASE_LABELS"
          :key="i"
          class="flex-1 flex justify-center relative z-10"
        >
          <button
            :class="[
              'w-9 h-9 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-200',
              i === activeIndex
                ? [(colorClass ?? 'bg-blue-600'), 'border-transparent text-white shadow-md scale-110']
                : i < activeIndex
                  ? [(colorClass ?? 'bg-blue-600'), 'border-transparent text-white opacity-70']
                  : 'bg-white border-gray-300 text-gray-400 hover:border-blue-400 hover:text-blue-600',
            ]"
            @click="emit('select', i)"
            :aria-label="`Phase ${i + 1}: ${label} (${PHASE_YEARS[i]})`"
          >
            {{ i + 1 }}
          </button>
        </div>
      </div>

      <!-- Labels row -->
      <div class="flex mt-2">
        <div
          v-for="(label, i) in PHASE_LABELS"
          :key="i"
          class="flex-1 flex flex-col items-center text-center px-1"
        >
          <p :class="['text-xs font-semibold leading-tight', i === activeIndex ? 'text-blue-700' : 'text-gray-500']">
            {{ label }}
          </p>
          <p :class="['text-xs mt-0.5', i === activeIndex ? 'text-blue-500 font-medium' : 'text-gray-400']">
            {{ PHASE_YEARS[i] }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
