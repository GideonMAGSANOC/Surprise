import { milestones } from "../data/anniversary";
import MemorySlideshow from "./MemorySlideshow";
import MusicPlayer from "./MusicPlayer";
import OfficialSongPlayer from "./OfficialSongPlayer";

export default function AnniversaryStory({ audio }) {
  return (
    <main className="anniversary-story">
      <div className="story-progress" aria-hidden="true" />
      <MusicPlayer isPlaying={audio.isPlaying} progress={audio.progress} />

      <section className="movie-hero" aria-labelledby="story-title">
        <div className="parallax-layer stars stars-back" aria-hidden="true" />
        <div className="parallax-layer stars stars-front" aria-hidden="true" />
        <div className="hero-moon" aria-hidden="true">
          <span>4</span>
        </div>
        <div className="hero-copy">
          <p className="movie-kicker">A Gideon & Patricia story</p>
          <h1 id="story-title">
            Four years,
            <br />
            <em>one favorite</em>
            <br />
            love story.
          </h1>
          <p className="hero-date">IV · Years of choosing us</p>
        </div>
        <div className="scroll-note">
          <span />
          Scroll slowly, Love
        </div>
        <div className="hero-flower hero-flower-one" aria-hidden="true">
          ✦
        </div>
        <div className="hero-flower hero-flower-two" aria-hidden="true">
          ✦
        </div>
      </section>

      <OfficialSongPlayer
        autoPlay={audio.autoPlay}
        controlRef={audio.playerRef}
        onAutoplayBlocked={audio.onAutoplayBlocked}
        onPlaybackChange={audio.onPlaybackChange}
        onProgressChange={audio.onProgressChange}
      />

      <section className="prologue story-section">
        <div className="prologue-number parallax-soft" aria-hidden="true">
          04
        </div>
        <div className="prologue-copy reveal-card">
          <p className="section-label">Our prologue</p>
          <h2>
            Some love stories are written. Ours is lived—one ordinary, beautiful
            day at a time.
          </h2>
          <p>
            Since we started as best friends four years ago, hindi natin siguro
            na-imagine kung saan tayo dadalhin ng journey natin. From simple
            harutan, surahan nung highschool and countless memories, you slowly
            became someone so special to me. Since then, you’ve made the
            ordinary days more meaningful, the hard days a little lighter, and
            the happiest moments even more unforgettable.
          </p>
        </div>
        <div className="timeline-thread" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      </section>

      <section
        className="chapters story-section"
        aria-labelledby="chapters-title"
      >
        <div className="chapters-heading reveal-card">
          <p className="section-label">Four chapters</p>
          <h2 id="chapters-title">
            The best parts were never the grand gestures.
          </h2>
        </div>
        <div className="milestone-grid">
          {milestones.map((milestone) => (
            <article className="milestone reveal-card" key={milestone.number}>
              <span>{milestone.number}</span>
              <div className="milestone-heart" aria-hidden="true">
                ♡
              </div>
              <h3>{milestone.title}</h3>
              <p>{milestone.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="letter-section story-section"
        aria-labelledby="letter-title"
      >
        <div className="letter-shadow parallax-soft" aria-hidden="true" />
        <article className="love-letter reveal-card">
          <p className="section-label">Read this while our song plays</p>
          <h2 id="letter-title">A letter for you</h2>
          <p className="salutation">My Love,</p>
          <div className="letter-body">
            <p>
              Happy 4th anniversary loveee. Apat na taon na HAHAHA yawa ngayon
              lang ako magiging sweet. So ayon 4 years na, pero may mga sandali
              pa ring tinitingnan kita at naiisip ko, “Ang swerte ko naman.” You
              have become my safest place, my favorite laugh, and the person I
              want by my side sa lahat ng season ng buhay ko.
            </p>
            <p>
              Thank you for loving every version of me: the manunura, the
              mainitin ang ulo, the tired one (mabilis mawalan ng pag-asa), and
              even the one who does not always know the right words. With you, I
              learned that love is not only found in big promises. Sayo ko
              natutunan maging responsible sa buhay, mas maging mabuting anak/
              kapatid pa, at wag agad sumuko sa mga challenges sa buhay. Thank
              you love kase minahal mo ako hindi lang dahil pogi o mapera ako.
            </p>
            <p>
              Love, if I could go back to the beginning, I would still find you.
              I would still choose every detour (sinearch ko lang yung word para
              romantic) that led me to you. And if the future gives us a
              thousand new chapters, I hope every one of mine still has your
              hand in it.
            </p>
            <p>
              Mahal kita—not only for who you are, but for the life we are
              slowly building together. Here is to more spontaneous dates, long
              talks, silly arguments we eventually laugh about, and ordinary
              days that become unforgettable simply because you are there.
            </p>
          </div>
          <div className="signature">
            <span>Always yours,</span>
            <strong>Gideon</strong>
          </div>
          <div className="letter-stamp" aria-hidden="true">
            G + P<br />
            04
          </div>
        </article>
      </section>

      <MemorySlideshow songProgress={audio.progress} />

      <section className="finale" aria-labelledby="finale-title">
        <div className="finale-stars" aria-hidden="true" />
        <div className="finale-rings" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="finale-copy reveal-card">
          <p>And after every song, every photograph, and every year…</p>
          <h2 id="finale-title">
            Happy 4th Anniversary,
            <br />
            <em>Mahal!</em>
          </h2>
          <div className="infinity" aria-hidden="true">
            ∞
          </div>
          <blockquote>“Ikaw pa rin. Ikaw palagi.”</blockquote>
          <span className="finale-from">With all my love · Gideon</span>
        </div>
        <div className="heart-rain" aria-hidden="true">
          {Array.from({ length: 18 }, (_, index) => (
            <i key={index} style={{ "--heart": index }}>
              ♥
            </i>
          ))}
        </div>
      </section>
    </main>
  );
}
