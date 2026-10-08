import { useEffect, useMemo, useState } from 'react'
import { memories } from '../data/anniversary'

export default function MemorySlideshow({ songProgress }) {
  const [manualIndex, setManualIndex] = useState(0)
  const [failedImages, setFailedImages] = useState({})
  const syncedIndex = useMemo(
    () => Math.min(memories.length - 1, Math.floor(songProgress * memories.length)),
    [songProgress],
  )
  const activeIndex = songProgress > 0 ? syncedIndex : manualIndex

  useEffect(() => {
    if (songProgress > 0) return undefined
    const timer = window.setInterval(
      () => setManualIndex((current) => (current + 1) % memories.length),
      6500,
    )
    return () => window.clearInterval(timer)
  }, [songProgress])

  function show(index) {
    setManualIndex((index + memories.length) % memories.length)
  }

  return (
    <section className="memory-section" id="memories" aria-labelledby="memories-title">
      <div className="memory-heading reveal-card">
        <p className="section-label">Our moving album</p>
        <h2 id="memories-title">A thousand little reasons to replay us.</h2>
        <p>
          Replace these frames with our real photos. While the song plays, every chapter moves with it—until
          the final note brings us home.
        </p>
      </div>

      <div className="slideshow-shell reveal-card">
        <div className="film-strip" aria-hidden="true"><span /><span /><span /><span /><span /></div>
        <div className="slides" aria-live="polite">
          {memories.map((memory, index) => (
            <figure className={index === activeIndex ? 'slide active' : 'slide'} key={memory.src}>
              {!failedImages[memory.src] && (
                <img
                  src={memory.src}
                  alt={`${memory.label}. Replace with a photo of Gideon and Patricia.`}
                  onError={() => setFailedImages((current) => ({ ...current, [memory.src]: true }))}
                />
              )}
              <div className="photo-placeholder" aria-hidden={!failedImages[memory.src]}>
                <span>Photo {String(index + 1).padStart(2, '0')}</span>
                <strong>Add your memory here</strong>
                <i>♡</i>
              </div>
              <figcaption>
                <span>{memory.date}</span>
                <strong>{memory.label}</strong>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="slide-controls">
          <button type="button" onClick={() => show(activeIndex - 1)} aria-label="Previous memory">←</button>
          <p><span>{String(activeIndex + 1).padStart(2, '0')}</span> / {String(memories.length).padStart(2, '0')}</p>
          <button type="button" onClick={() => show(activeIndex + 1)} aria-label="Next memory">→</button>
        </div>

        <div className="slide-dots" aria-label="Choose a memory">
          {memories.map((memory, index) => (
            <button
              type="button"
              className={index === activeIndex ? 'active' : ''}
              aria-label={`Show memory ${index + 1}`}
              onClick={() => show(index)}
              key={memory.src}
            />
          ))}
        </div>
        <div className="film-strip film-strip-bottom" aria-hidden="true"><span /><span /><span /><span /><span /></div>
      </div>
    </section>
  )
}

