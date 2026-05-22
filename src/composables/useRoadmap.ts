import { sectors } from '@/data/roadmap'
import { slugify } from '@/utils/roadmap'
import type { Sector, Subsector } from '@/types/roadmap'

export function useRoadmap() {
  function findSector(sectorSlug: string): Sector | undefined {
    return sectors.find((s) => s.slug === sectorSlug)
  }

  function findSubsector(sectorSlug: string, subsectorSlug: string): Subsector | undefined {
    const sector = findSector(sectorSlug)
    if (!sector) return undefined
    return sector.subsectors.find((sub) => slugify(sub.name) === subsectorSlug)
  }

  function subsectorSlug(subsector: Subsector): string {
    return slugify(subsector.name)
  }

  return { sectors, findSector, findSubsector, subsectorSlug }
}
