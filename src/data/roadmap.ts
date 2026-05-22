import type { Sector, Subsector, Phase, PhasePrograms, RoadmapStats } from '@/types/roadmap'
import { PHASE_LABELS, PHASE_YEARS, slugify, getSectorColorKey } from '@/utils/roadmap'
import rawData from './roadmap.json'

interface RawProgramItem {
  name: string
  description: string
}

interface RawPhasePrograms {
  programs: RawProgramItem[]
  policies: RawProgramItem[]
}

interface RawSubsector {
  name: string
  description: string
  milestones: string[]
  kpis: string[]
  programs: RawPhasePrograms[]
}

interface RawSector {
  name: string
  title: string
  vision: string
  subsectors: RawSubsector[]
}

const EMPTY_PHASE_PROGRAMS: PhasePrograms = { programs: [], policies: [] }

function buildPhases(sub: RawSubsector): Phase[] {
  return PHASE_LABELS.map((label, i) => ({
    index: i,
    label,
    year: PHASE_YEARS[i] as number,
    milestone: sub.milestones[i] ?? '',
    kpi: sub.kpis[i] ?? '',
    phasePrograms: (sub.programs[i] as PhasePrograms) ?? EMPTY_PHASE_PROGRAMS,
  }))
}

function buildSubsector(raw: RawSubsector): Subsector {
  return {
    name: raw.name,
    description: raw.description,
    milestones: raw.milestones,
    kpis: raw.kpis,
    programs: raw.programs as PhasePrograms[],
    phases: buildPhases(raw),
  }
}

function buildSector(raw: RawSector): Sector {
  const slug = slugify(raw.name)
  return {
    name: raw.name,
    title: raw.title,
    vision: raw.vision,
    slug,
    colorKey: getSectorColorKey(slug),
    subsectors: (raw.subsectors ?? []).map(buildSubsector),
  }
}

const raw = rawData as { sectors: RawSector[] }

export const sectors: Sector[] = raw.sectors.map(buildSector)

export const roadmapStats: RoadmapStats = {
  totalSectors: sectors.length,
  totalSubsectors: sectors.reduce((sum, s) => sum + s.subsectors.length, 0),
  totalPhaseEntries: sectors.reduce((sum, s) => sum + s.subsectors.length * 5, 0),
  timelineStart: PHASE_YEARS[0] as number,
  timelineEnd: PHASE_YEARS[PHASE_YEARS.length - 1] as number,
}
