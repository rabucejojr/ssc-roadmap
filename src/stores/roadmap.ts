import { defineStore } from 'pinia'
import { ref } from 'vue'
import { sectors, roadmapStats } from '@/data/roadmap'

export const useRoadmapStore = defineStore('roadmap', () => {
  const activePhaseIndex = ref(0)

  function setActivePhase(index: number) {
    activePhaseIndex.value = index
  }

  return {
    sectors,
    roadmapStats,
    activePhaseIndex,
    setActivePhase,
  }
})
