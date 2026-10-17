import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const photosDirectory = fileURLToPath(new URL('../public/photos/', import.meta.url))
const manifestPath = fileURLToPath(new URL('../src/data/photos.json', import.meta.url))

const photos = readdirSync(photosDirectory)
  .filter((filename) => /\.(jpe?g|png|webp|gif|avif)$/i.test(filename))
  .sort((first, second) => first.localeCompare(second, 'en'))

const manifest = `${JSON.stringify(photos, null, 2)}\n`
if (readFileSync(manifestPath, 'utf8') !== manifest) {
  writeFileSync(manifestPath, manifest)
}
