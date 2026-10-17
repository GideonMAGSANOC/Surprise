import { useEffect, useMemo, useState } from 'react'
import { memories } from '../data/anniversary'

export default function MemorySlideshow({ songProgress }) {
  const [manualIndex, setManualIndex] = useState(0)
  const [manualMode, setManualMode] = useState(false)
  const [failedImages, setFailedImages] = useState({})
  const syncedIndex = useMemo(
    () => Math.min(memories.length - 1, Math.floor(songProgress * memories.length)),
    [songProgress],
  )
  const activeIndex = songProgress > 0 && !manualMode ? syncedIndex : manualIndex
  const activeMemory = memories[activeIndex]

  useEffect(() => {
    if (songProgress > 0 && !manualMode) return undefined
    const timer = window.setInterval(
      () => setManualIndex((current) => (current + 1) % memories.length),
      6500,
    )
    return () => window.clearInterval(timer)
  }, [songProgress, manualMode])

  function show(index) {
    setManualMode(true)
    setManualIndex((index + memories.length) % memories.length)
  }

  return (
    <section className="memory-section" id="memories" aria-labelledby="memories-title">
      <div className="memory-heading reveal-card">
        <p className="section-label">Our moving album</p>
        <h2 id="memories-title">A thousand little reasons to replay us.</h2>
        <p>
          Our favorite moments, one photo at a time. Use the arrows to browse the whole album.
        </p>
      </div>

      <div className="slideshow-shell reveal-card">
        <div className="film-strip" aria-hidden="true"><span /><span /><span /><span /><span /></div>
        <div className="slides" aria-live="polite">
          <figure className="slide active" key={activeMemory.src}>
            {failedImages[activeMemory.src] ? (
              <div className="photo-placeholder">
                <span>{activeMemory.date}</span>
                <strong>Photo unavailable</strong>
                <i>♡</i>
              </div>
            ) : (
              <img
                src={activeMemory.src}
                alt={`Memory ${activeIndex + 1} of ${memories.length}`}
                onError={() => setFailedImages((current) => ({ ...current, [activeMemory.src]: true }))}
              />
            )}
            <figcaption>
              <span>{activeMemory.date}</span>
              <strong>{activeMemory.label}</strong>
            </figcaption>
          </figure>
        </div>

        <div className="slide-controls">
          <button type="button" onClick={() => show(activeIndex - 1)} aria-label="Previous memory">←</button>
          <p><span>{String(activeIndex + 1).padStart(2, '0')}</span> / {String(memories.length).padStart(2, '0')}</p>
          <button type="button" onClick={() => show(activeIndex + 1)} aria-label="Next memory">→</button>
        </div>

        <div className="film-strip film-strip-bottom" aria-hidden="true"><span /><span /><span /><span /><span /></div>
      </div>
    </section>
  )
}

