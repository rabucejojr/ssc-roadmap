<script setup lang="ts">
import { computed } from 'vue'
import { PHASE_LABELS, PHASE_YEARS, SECTOR_COLOR_CLASSES } from '@/utils/roadmap'
import type { SectorColorSet } from '@/utils/roadmap'

const props = defineProps<{
  activeIndex: number
  colors?: SectorColorSet
}>()

const emit = defineEmits<{
  select: [index: number]
}>()

const c = computed(() => props.colors ?? (SECTOR_COLOR_CLASSES['blue'] as SectorColorSet))

// Each phase occupies 1/n of the container. Circle centers sit at the midpoint
// of each column: 10%, 30%, 50%, 70%, 90% for n=5. The track must span only
// between those outer centers so it doesn't extend past the first/last circle.
const n = PHASE_LABELS.length
const colHalf = 100 / (2 * n)       // 10% for n=5
const trackOffset = `${colHalf}%`   // left/right inset of both track bars
const trackSpan = 100 - 2 * colHalf // 80% for n=5 — total track length

const progressWidth = computed(() => {
  const pct = (props.activeIndex / (n - 1)) * trackSpan
  return `${pct}%`
})
</script>

<template>
  <div class="w-full overflow-x-auto">
    <div class="min-w-120 px-2 py-3">
      <!-- Circles row -->
      <div class="relative flex items-center">
        <!-- Background track — spans only between outer circle centers -->
        <div
          class="absolute top-1/2 -translate-y-1/2 h-0.5 bg-gray-200"
          :style="{ left: trackOffset, right: trackOffset }"
        />
        <!-- Active progress track -->
        <div
          :class="['absolute top-1/2 -translate-y-1/2 h-0.5 transition-all duration-300', c.bg]"
          :style="{ left: trackOffset, width: progressWidth }"
        />

        <!-- Phase buttons, each in an equal flex column -->
        <div
          v-for="(label, i) in PHASE_LABELS"
          :key="i"
          class="flex-1 flex justify-center relative z-10"
        >
          <button
            :class="[
              'w-9 h-9 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-200 cursor-pointer',
              i === activeIndex
                ? [c.bg, 'border-transparent text-white shadow-md scale-110']
                : i < activeIndex
                  ? [c.bg, 'border-transparent text-white']
                  : ['bg-white border-gray-300 text-gray-400', c.hoverBorder, c.hoverText],
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
          <p :class="['text-xs font-semibold leading-tight', i === activeIndex ? c.text : 'text-gray-500']">
            {{ label }}
          </p>
          <p :class="['text-xs mt-0.5', i === activeIndex ? [c.textSub, 'font-medium'] : 'text-gray-400']">
            {{ PHASE_YEARS[i] }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
