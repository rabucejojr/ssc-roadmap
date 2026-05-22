export interface ProgramItem {
  name: string
  description: string
}

export interface PhasePrograms {
  programs: ProgramItem[]
  policies: ProgramItem[]
}

export interface Phase {
  index: number
  label: string
  year: number
  milestone: string
  kpi: string
  phasePrograms: PhasePrograms
}

export interface Subsector {
  name: string
  description: string
  milestones: string[]
  kpis: string[]
  programs: PhasePrograms[]
  phases: Phase[]
}

export interface Sector {
  name: string
  title: string
  vision: string
  subsectors: Subsector[]
  slug: string
  colorKey: string
}

export interface RoadmapData {
  sectors: Sector[]
}

export interface RoadmapStats {
  totalSectors: number
  totalSubsectors: number
  totalPhaseEntries: number
  timelineStart: number
  timelineEnd: number
}
