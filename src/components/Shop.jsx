import { useState, useMemo } from 'react';
import { PERFUMES, BRANDS, BRANDS_FR, NOTES, CATEGORIES_EN, CATEGORIES_FR } from '../data.js';
import { PerfumeCard, PerfumeModal } from './PerfumeCard.jsx';
import { useLang } from '../LangContext.jsx';
import { IconSearch } from '../icons.jsx';

export default function Shop() {
  const { t, lang } = useLang();
  const s = t.shop;
  const CATEGORIES = lang === 'fr' ? CATEGORIES_FR : CATEGORIES_EN;
  const BRAND_LIST = lang === 'fr' ? BRANDS_FR : BRANDS;

  const [cat, setCat] = useState('all');
  const [brand, setBrand] = useState(BRAND_LIST[0]);
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');
  const [selected, setSelected] = useState(null);

  const toggleNote = n => setNotes(p => p.includes(n) ? p.filter(x => x !== n) : [...p, n]);

  const filtered = useMemo(() => {
    let list = [...PERFUMES];
    if (cat !== 'all') {
      if (cat === 'oud') list = list.filter(p => p.notes.includes('Oud'));
      else if (cat === 'fresh') list = list.filter(p => p.notes.some(n => ['Bergamot', 'Citrus', 'Lavender'].includes(n)));
      else if (cat === 'oriental') list = list.filter(p => p.notes.some(n => ['Oud', 'Amber', 'Sandalwood'].includes(n)));
      else list = list.filter(p => p.category === cat);
    }
    const allBrand = lang === 'fr' ? 'Tous' : 'All';
    if (brand !== allBrand) list = list.filter(p => p.brand === brand);
    if (notes.length) list = list.filter(p => notes.every(n => p.notes.includes(n)));
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.notes.some(n => n.toLowerCase().includes(q)));
    }
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    else if (sort === 'popular') list.sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [cat, brand, notes, search, sort, lang]);

  const allBrand = lang === 'fr' ? 'Tous' : 'All';

  const clearAll = () => { setNotes([]); setBrand(allBrand); setSearch(''); setCat('all'); };
  const hasFil = notes.length > 0 || brand !== allBrand || search.trim();

  return (
    <section className="section" id="shop">
      <div className="container">
        {/* Header */}
        <div className="shop-header">
          <div>
            <span className="eyebrow">{s.eyebrow}</span>
            <h2 className="display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              {s.title1} <em>{s.title2}</em>
            </h2>
            <p className="lead" style={{ marginTop: '0.75rem', maxWidth: '420px' }}>{s.subtitle}</p>
          </div>
          <div className="search-wrap">
            <span className="search-icon"><IconSearch /></span>
            <input
              type="search"
              placeholder={s.searchPlaceholder}
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label={s.searchPlaceholder}
            />
          </div>
        </div>

        {/* Category filter */}
        <div className="filter-row" style={{ marginBottom: '0.625rem' }}>
          {CATEGORIES.map(c => (
            <button key={c.id} className={`filter-chip${cat === c.id ? ' on' : ''}`} onClick={() => setCat(c.id)}>
              {c.label}
            </button>
          ))}
        </div>

        {/* Brand filter */}
        <div className="filter-row" style={{ marginBottom: '1.25rem' }}>
          {BRAND_LIST.map(b => (
            <button key={b} className={`filter-chip${brand === b ? ' on' : ''}`} onClick={() => setBrand(b)} style={{ fontSize: '0.67rem' }}>
              {b}
            </button>
          ))}
        </div>

        {/* Notes filter */}
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: '0.625rem' }}>
            {s.filterNotes}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
            {NOTES.map(n => (
              <button key={n} className={`note-chip${notes.includes(n) ? ' on' : ''}`} onClick={() => toggleNote(n)}>
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Meta bar */}
        <div className="shop-meta">
          <span style={{ fontSize: '0.8rem', color: 'var(--text-3)' }}>
            {s.results(filtered.length)}
            {hasFil && (
              <button onClick={clearAll} style={{ marginLeft: '1rem', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.72rem', color: 'var(--gold)', letterSpacing: '0.05em', fontFamily: 'var(--body)' }}>
                {s.clearFilters} ×
              </button>
            )}
          </span>
          <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort">
            <option value="default">{s.sortDefault}</option>
            <option value="price-asc">{s.sortPriceAsc}</option>
            <option value="price-desc">{s.sortPriceDesc}</option>
            <option value="rating">{s.sortRating}</option>
            <option value="popular">{s.sortPopular}</option>
          </select>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid-wrap">
            <div className="grid">
              {filtered.map(p => (
                <PerfumeCard key={p.id} perfume={p} onClick={setSelected} />
              ))}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-3)' }}>
            <p style={{ fontSize: '0.875rem' }}>{s.noResults}</p>
          </div>
        )}
      </div>

      {selected && <PerfumeModal perfume={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
