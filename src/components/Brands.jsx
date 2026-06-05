import { useLang } from '../LangContext.jsx';
import { IconShield, IconTruck, IconWhatsApp, IconUsers } from '../icons.jsx';

const BRANDS_DATA = [
  { name: 'Lattafa', origin: 'UAE', specialty: 'Oud & Oriental' },
  { name: 'Afnan', origin: 'UAE', specialty: 'Luxury Niche' },
  { name: 'French Avenue', origin: 'France', specialty: 'Floral & Fresh' },
  { name: 'Alhambra', origin: 'UAE', specialty: 'Oriental Blends' },
  { name: 'Paris Corner', origin: 'UAE', specialty: 'Premium Woody' },
  { name: 'Armaf', origin: 'UAE', specialty: 'Designer Inspired' },
  { name: 'Maison Alhambra', origin: 'UAE', specialty: 'Rose & Oud' },
  { name: 'Fragrance World', origin: 'UAE', specialty: 'Rose & Oud' },
];

const TRUST_ICONS = [IconShield, IconTruck, IconWhatsApp, IconUsers];

export default function Brands() {
  const { t } = useLang();
  const b = t.brands;
  return (
    <section className="section" id="brands" style={{ background: 'var(--ink-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', paddingTop: '6rem', paddingBottom: '6rem' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '540px', margin: '0 auto 0' }}>
          <span className="eyebrow">{b.eyebrow}</span>
          <h2 className="display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            {b.title1} <em>{b.title2}</em>
          </h2>
          <p className="lead" style={{ marginTop: '0.75rem' }}>{b.subtitle}</p>
        </div>

        <div className="brands-grid">
          {BRANDS_DATA.map(br => (
            <div key={br.name} className="brand-cell">
              <div className="brand-cell-name">{br.name}</div>
              <div className="brand-cell-origin">{br.origin}</div>
              <div className="brand-cell-spec">{br.specialty}</div>
            </div>
          ))}
        </div>

        <div className="trust-bar">
          {b.badges.map((badge, i) => {
            const Icon = TRUST_ICONS[i];
            return (
              <div key={badge.label} className="trust-cell">
                <div className="trust-icon"><Icon size={20} /></div>
                <div>
                  <div className="trust-label">{badge.label}</div>
                  <div className="trust-desc">{badge.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
