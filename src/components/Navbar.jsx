import { useState, useEffect } from 'react';
import { useLang } from '../LangContext.jsx';
import { IconWhatsApp, IconGlobe, IconMenu, IconClose } from '../icons.jsx';
import { WHATSAPP_NUMBER } from '../data.js';

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const nav = t.nav;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello W&S Fragrances!")}`;
  const links = [
    { href: '#shop', label: nav.shop },
    { href: '#brands', label: nav.brands },
    { href: '#about', label: nav.about },
    { href: '#reviews', label: nav.reviews },
    { href: '#contact', label: nav.contact },
  ];

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="container nav-inner">
          <a href="#home" className="nav-logo">
            W<span>&</span>S
            <small>Fragrances</small>
          </a>

          <ul className="nav-links">
            {links.map(l => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
          </ul>

          <div className="nav-right">
            <button
              className="lang-toggle"
              onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
              aria-label="Toggle language"
            >
              <IconGlobe size={13} />
              <span className={lang === 'en' ? 'active-lang' : ''}>EN</span>
              <span className="sep">/</span>
              <span className={lang === 'fr' ? 'active-lang' : ''}>FR</span>
            </button>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-sm">
              <IconWhatsApp size={14} />
              {nav.order}
            </a>
            <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Menu">
              {open ? <IconClose size={22} /> : <IconMenu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu${open ? ' open' : ''}`}>
        {links.map(l => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
        ))}
        <div className="lang-row">
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => { setLang('en'); setOpen(false); }}
            style={{ opacity: lang === 'en' ? 1 : 0.5 }}
          >English</button>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => { setLang('fr'); setOpen(false); }}
            style={{ opacity: lang === 'fr' ? 1 : 0.5 }}
          >Français</button>
        </div>
        <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-wa" style={{ marginTop: '1rem', justifyContent: 'center' }} onClick={() => setOpen(false)}>
          <IconWhatsApp size={16} /> {nav.order}
        </a>
      </div>
    </>
  );
}
