export default function MusicPlayer({ isPlaying, progress }) {
  return (
    <aside className="music-player" aria-label="Soundtrack controls">
      <a className="music-player-link" href="#soundtrack" aria-label="Go to the official Palagi player">
        <span className={isPlaying ? 'equalizer is-playing' : 'equalizer'} aria-hidden="true">
          <i /><i /><i />
        </span>
      </a>
      <a className="music-meta" href="#soundtrack">
        <p>{isPlaying ? 'Playing on YouTube' : 'Tap for the official duet'}</p>
        <strong>Palagi</strong>
        <span>TJ × KZ</span>
      </a>
      <div className="music-progress" aria-hidden="true">
        <span style={{ width: `${progress * 100}%` }} />
      </div>
    </aside>
  )
}
