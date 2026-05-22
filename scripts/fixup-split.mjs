import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const jsonPath = join(__dirname, '../src/data/roadmap.json')
const data = JSON.parse(readFileSync(jsonPath, 'utf8'))

// Pattern: name ends with " -word" (dash with leading space, no trailing space) — source typo
const TYPO_RE = / -([A-Za-z])/

let fixed = 0

function fixItem(item) {
  // Only fix if description is empty (meaning it wasn't split)
  if (item.description !== '') return
  const match = item.name.match(TYPO_RE)
  if (!match || match.index === undefined) return
  const idx = match.index
  item.description = item.name.slice(idx + 2).trim()  // +2 skips " -"
  item.name = item.name.slice(0, idx).trim()
  fixed++
}

for (const sector of data.sectors) {
  for (const subsector of sector.subsectors) {
    for (const phase of subsector.programs) {
      phase.programs.forEach(fixItem)
      phase.policies.forEach(fixItem)
    }
  }
}

writeFileSync(jsonPath, JSON.stringify(data, null, 2))
console.log(`Fixed ${fixed} item(s).`)
