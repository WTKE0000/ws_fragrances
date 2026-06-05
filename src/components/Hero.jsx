import { useLang } from '../LangContext.jsx';
import { IconWhatsApp, IconArrowRight, IconBottle } from '../icons.jsx';
import { WHATSAPP_NUMBER } from '../data.js';

const BRANDS_MARQUEE = ['Lattafa', 'Afnan', 'Armaf', 'French Avenue', 'Alhambra', 'Paris Corner', 'Maison Alhambra', 'Lattafa', 'Afnan', 'Armaf', 'French Avenue', 'Alhambra', 'Paris Corner', 'Maison Alhambra'];

export default function Hero() {
  const { t, lang } = useLang();
  const h = t.hero;
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lang === 'fr' ? "Bonjour W&S Fragrances! Je voudrais explorer votre collection." : "Hello W&S Fragrances! I'd like to explore your collection.")}`;

  return (
    <>
      <section className="hero" id="home">
        <div className="hero-bg" />
        <div className="container" style={{ width: '100%' }}>
          <div className="hero-grid">
            {/* Left — content */}
            <div>
              <span className="eyebrow">{h.eyebrow}</span>
              <h1 className="display hero-title">
                {h.title1}<br />
                <em>{h.title2}</em>
              </h1>
              <p className="lead hero-desc">{h.desc}</p>
              <div className="hero-actions">
                <a href="#shop" className="btn btn-primary">
                  {h.cta1} <IconArrowRight size={14} />
                </a>
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  <IconWhatsApp size={15} /> {h.cta2}
                </a>
              </div>

              <div className="hero-stats">
                {[
                  { n: '16+', l: h.stat1 },
                  { n: '7+', l: h.stat2 },
                  { n: '100%', l: h.stat3 },
                  { n: 'CMR', l: h.stat4 },
                ].map(s => (
                  <div key={s.l} className="hero-stat">
                    <span className="hero-stat-n">{s.n}</span>
                    <span className="hero-stat-l">{s.l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — visual */}
            <div className="hero-visual">
              <div className="hero-bottle-wrap">
                <div className="hero-bottle-bg" />
                <div className="hero-bottle-ring" style={{ width: '260px', height: '260px' }} />
                <div className="hero-bottle-ring" style={{ width: '200px', height: '200px', animationDirection: 'reverse', animationDuration: '14s' }} />
                <div className="hero-bottle-icon">
                  <IconBottle size={120} />
                </div>
              </div>

              {/* Brand strip below visual */}
              <div className="hero-brand-strip" style={{ position: 'absolute', bottom: '-3.5rem', left: 0, right: 0 }}>
                {['Lattafa', 'Afnan', 'Armaf', 'Alhambra', 'Paris Corner'].map(b => (
                  <div key={b} className="hero-brand-item">{b}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="ticker">
        <div className="ticker-inner" aria-hidden="true">
          {BRANDS_MARQUEE.map((b, i) => (
            <span key={i} className="ticker-item">
              {b}
              <span className="ticker-dot" />
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
