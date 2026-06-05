import { IconStar, IconClose, IconWhatsApp, IconBottle } from '../icons.jsx';
import { useLang } from '../LangContext.jsx';
import { getWhatsAppLink } from '../data.js';

function Stars({ rating, size = 13 }) {
  return (
    <div className="card-stars">
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= Math.round(rating) ? 'var(--gold)' : 'var(--text-3)' }}>
          <IconStar filled={i <= Math.round(rating)} size={size} />
        </span>
      ))}
    </div>
  );
}

export function PerfumeModal({ perfume, onClose }) {
  const { t, lang } = useLang();
  const s = t.shop;
  if (!perfume) return null;
  const desc = lang === 'fr' ? perfume.descFr : perfume.descEn;
  const waLink = getWhatsAppLink(perfume.name, perfume.size);

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-vis" style={{ background: `linear-gradient(135deg, ${perfume.hue} 0%, #0C0906 100%)` }}>
          {perfume.image ? (
            <img
              src={perfume.image}
              alt={perfume.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                padding: '2rem',
              }}
            />
          ) : (
            <div style={{ color: perfume.accent, opacity: 0.75 }}>
              <IconBottle size={100} />
            </div>
          )}
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <IconClose size={16} />
          </button>
          {perfume.badge && (
            <div className="card-badge">{perfume.badge}</div>
          )}
        </div>

        <div className="modal-body">
          <div className="modal-brand">{perfume.brand}</div>
          <h2 className="modal-name">{perfume.name}</h2>

          <div className="modal-meta">
            <Stars rating={perfume.rating} size={14} />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-2)' }}>
              {perfume.rating} — {perfume.reviews} {s.reviews}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-3)', marginLeft: 'auto' }}>{perfume.size}</span>
          </div>

          <p className="modal-desc">{desc}</p>

          <div className="modal-notes-label">{s.fragranceNotes}</div>
          <div className="modal-notes">
            {perfume.notes.map(n => <span key={n} className="modal-note">{n}</span>)}
          </div>

          <div className="modal-price-row">
            <div>
              <span className="modal-price">
                {perfume.price.toLocaleString()}
                <sub> FCFA</sub>
              </span>
              {perfume.originalPrice && (
                <span className="modal-price-orig">{perfume.originalPrice.toLocaleString()}</span>
              )}
            </div>
            <span className="badge-stock">{s.inStock}</span>
          </div>

          <a href={waLink} target="_blank" rel="noopener noreferrer"
            className="btn btn-wa"
            style={{ width: '100%', justifyContent: 'center', padding: '0.9rem' }}>
            <IconWhatsApp size={17} />
            {s.orderWhatsapp}
          </a>
        </div>
      </div>
    </div>
  );
}

export function PerfumeCard({ perfume, onClick }) {
  const { t } = useLang();
  const s = t.shop;
  return (
    <div className="card fade-up" onClick={() => onClick(perfume)} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick(perfume)}>
      {perfume.badge && <div className="card-badge">{perfume.badge}</div>}
      <div className="card-vis" style={{ background: `linear-gradient(160deg, ${perfume.hue} 0%, var(--ink) 100%)` }}>
        {perfume.image ? (
          <img
            src={perfume.image}
            alt={perfume.name}
            className="card-vis-icon"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              padding: '1rem',
              transition: 'transform 0.4s ease',
            }}
          />
        ) : (
          <div className="card-vis-icon" style={{ color: perfume.accent, opacity: 0.7 }}>
            <IconBottle size={70} />
          </div>
        )}
      </div>
      <div className="card-body">
        <div className="card-brand">{perfume.brand}</div>
        <div className="card-name">{perfume.name}</div>
        <div className="card-notes">
          {perfume.notes.slice(0, 3).map(n => <span key={n} className="card-note">{n}</span>)}
        </div>
        <Stars rating={perfume.rating} />
        <span className="card-stars"><span>{perfume.rating} ({perfume.reviews})</span></span>
        <div className="card-foot">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.375rem' }}>
            <span className="card-price">
              {perfume.price.toLocaleString()}
              <sub> FCFA</sub>
            </span>
            {perfume.originalPrice && (
              <span className="card-orig">{perfume.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <span className="card-arrow"><IconArrowRight /></span>
        </div>
      </div>
    </div>
  );
}

function IconArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  );
}