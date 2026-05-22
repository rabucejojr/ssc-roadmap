export const PHASE_LABELS = ['Foundation', 'Development', 'Integration', 'Optimization', 'Maturity'] as const
export const PHASE_YEARS = [2028, 2031, 2034, 2037, 2040] as const
export const TOTAL_PHASES = 5

export const SECTOR_COLORS: Record<string, string> = {
  'development-administration': 'blue',
  'social-services': 'emerald',
  economy: 'amber',
  environment: 'green',
  infrastructure: 'slate',
}

export type SectorColorSet = { bg: string; border: string; badge: string; text: string; light: string }

export const SECTOR_COLOR_CLASSES: Record<string, SectorColorSet> = {
  blue: {
    bg: 'bg-blue-700',
    border: 'border-blue-600',
    badge: 'bg-blue-100 text-blue-800',
    text: 'text-blue-700',
    light: 'bg-blue-50',
  },
  emerald: {
    bg: 'bg-emerald-700',
    border: 'border-emerald-600',
    badge: 'bg-emerald-100 text-emerald-800',
    text: 'text-emerald-700',
    light: 'bg-emerald-50',
  },
  amber: {
    bg: 'bg-amber-600',
    border: 'border-amber-500',
    badge: 'bg-amber-100 text-amber-800',
    text: 'text-amber-700',
    light: 'bg-amber-50',
  },
  green: {
    bg: 'bg-green-700',
    border: 'border-green-600',
    badge: 'bg-green-100 text-green-800',
    text: 'text-green-700',
    light: 'bg-green-50',
  },
  slate: {
    bg: 'bg-slate-700',
    border: 'border-slate-600',
    badge: 'bg-slate-100 text-slate-800',
    text: 'text-slate-700',
    light: 'bg-slate-50',
  },
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function unslugify(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function truncate(text: string, maxLength = 120): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '…'
}

export function getSectorColorKey(sectorSlug: string): string {
  return SECTOR_COLORS[sectorSlug] ?? 'blue'
}

export function getSectorColors(sectorSlug: string): SectorColorSet {
  const key = getSectorColorKey(sectorSlug)
  return (SECTOR_COLOR_CLASSES[key] ?? SECTOR_COLOR_CLASSES['blue']) as SectorColorSet
}
