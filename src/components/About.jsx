import { useLang } from '../LangContext.jsx';
import { IconCheck, IconShield, IconTruck, IconWhatsApp } from '../icons.jsx';

const VALUE_ICONS = [IconShield, IconTruck, IconWhatsApp];

export default function About() {
  const { t } = useLang();
  const a = t.about;

  return (
    <section className="section" id="about">
      <div className="container">
        <div className="about-grid">
          {/* Left */}
          <div>
            <span className="eyebrow">{a.eyebrow}</span>
            <h2 className="display" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)', marginBottom: '1.5rem' }}>
              {a.title1}<br /><em>{a.title2}</em>
            </h2>
            <p className="lead" style={{ marginBottom: '1.25rem' }}>{a.p1}</p>
            <p className="lead" style={{ marginBottom: '0' }}>{a.p2}</p>

            <div className="about-quote">
              <p>{a.quote}</p>
              <cite>{a.quoteBy}</cite>
            </div>

            <div className="about-stats">
              {a.stats.map(s => (
                <div key={s.label} className="about-stat">
                  <div className="about-stat-n">{s.num}</div>
                  <div className="about-stat-l">{s.label}</div>
                </div>
              ))}
            </div>

            <a href="#contact" className="btn btn-primary">
              {a.cta} <IconCheck size={14} />
            </a>
          </div>

          {/* Right */}
          <div>
            <div className="value-list">
              {a.values.map((v, i) => {
                const Icon = VALUE_ICONS[i];
                return (
                  <div key={v.title} className="value-item">
                    <div className="value-icon"><Icon size={20} /></div>
                    <div>
                      <div className="value-title">{v.title}</div>
                      <div className="value-desc">{v.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Decorative panel */}
            <div style={{
              marginTop: '1.5rem',
              background: `linear-gradient(135deg, var(--ink-3) 0%, var(--surface) 100%)`,
              border: '1px solid var(--border)',
              borderRadius: 'var(--r2)',
              padding: '2.5rem 2rem',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { label: 'Lattafa Oud For Glory', score: '98%' },
                  { label: 'Afnan Club De Nuit', score: '96%' },
                  { label: 'Armaf 9PM', score: '95%' },
                ].map(item => (
                  <div key={item.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.78rem' }}>
                      <span style={{ color: 'var(--text-2)' }}>{item.label}</span>
                      <span style={{ color: 'var(--gold)', fontWeight: 500 }}>{item.score}</span>
                    </div>
                    <div style={{ height: '2px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: item.score,
                        background: `linear-gradient(90deg, var(--gold) 0%, var(--gold-light) 100%)`,
                        borderRadius: '2px',
                      }} />
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '0.68rem', color: 'var(--text-3)', marginTop: '1.25rem', letterSpacing: '0.05em' }}>
                Customer satisfaction ratings · 2024–2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
