import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const jsonPath = join(__dirname, '../src/data/roadmap.json')

const data = JSON.parse(readFileSync(jsonPath, 'utf8'))

function parseItem(text) {
  const cleaned = text.trim()
  // Try " - " separator (first occurrence, canonical form)
  let dashIdx = cleaned.indexOf(' - ')
  let descOffset = 3
  // Fallback: " -word" (typo in source — no space after dash)
  if (dashIdx === -1) {
    const match = cleaned.match(/ -([A-Za-z])/)
    if (match && match.index !== undefined) {
      dashIdx = match.index
      descOffset = 2
    }
  }
  if (dashIdx !== -1) {
    return {
      name: cleaned.slice(0, dashIdx).trim(),
      description: cleaned.slice(dashIdx + descOffset).trim(),
    }
  }
  // Try newline separator (first line = name, rest = description)
  const nlIdx = cleaned.indexOf('\n')
  if (nlIdx !== -1) {
    return {
      name: cleaned.slice(0, nlIdx).trim(),
      description: cleaned.slice(nlIdx + 1).replace(/\n/g, ' ').trim(),
    }
  }
  // Name only, no description
  return { name: cleaned, description: '' }
}

function parseProgramsString(raw) {
  const result = { programs: [], policies: [] }
  if (!raw || !raw.trim()) return result

  let currentSection = 'programs'

  const blocks = raw.split('\n\n').map((b) => b.trim()).filter((b) => b.length > 0)

  for (const block of blocks) {
    const nlIdx = block.indexOf('\n')
    const firstLine = nlIdx === -1 ? block : block.slice(0, nlIdx)

    if (firstLine === 'Programs') {
      currentSection = 'programs'
      if (nlIdx !== -1) {
        const rest = block.slice(nlIdx + 1).trim()
        if (rest) result.programs.push(parseItem(rest))
      }
    } else if (firstLine === 'Policies') {
      currentSection = 'policies'
      if (nlIdx !== -1) {
        const rest = block.slice(nlIdx + 1).trim()
        if (rest) result.policies.push(parseItem(rest))
      }
    } else {
      result[currentSection].push(parseItem(block))
    }
  }

  return result
}

let totalItems = 0

for (const sector of data.sectors) {
  for (const subsector of sector.subsectors) {
    const structured = subsector.programs.map((p) => parseProgramsString(p))
    subsector.programs = structured
    structured.forEach((ph) => {
      totalItems += ph.programs.length + ph.policies.length
    })
  }
}

writeFileSync(jsonPath, JSON.stringify(data, null, 2))
console.log(`Done. Parsed ${totalItems} total program/policy items across all phases.`)
