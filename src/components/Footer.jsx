import { useLang } from '../LangContext.jsx';
import { WHATSAPP_NUMBER, INSTAGRAM, TIKTOK } from '../data.js';
import { IconWhatsApp, IconInstagram, IconTikTok } from '../icons.jsx';

export default function Footer() {
  const { t } = useLang();
  const f = t.footer;
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">W<span>&</span>S <span style={{fontFamily:'var(--body)',fontSize:'1rem',color:'var(--text-3)',fontWeight:300}}>Fragrances</span></div>
            <p className="footer-desc">{f.desc}</p>
            <div className="footer-social">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="WhatsApp">
                <IconWhatsApp size={16} />
              </a>
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Instagram">
                <IconInstagram size={16} />
              </a>
              <a href={TIKTOK} target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="TikTok">
                <IconTikTok size={16} />
              </a>
            </div>
          </div>

          <div>
            <span className="footer-col-head">{f.quickLinks}</span>
            <ul className="footer-links">
              <li><a href="#home">{f.links.home}</a></li>
              <li><a href="#shop">{f.links.shop}</a></li>
              <li><a href="#brands">{f.links.brandsPage}</a></li>
              <li><a href="#about">{f.links.about}</a></li>
            </ul>
          </div>

          <div>
            <span className="footer-col-head">{f.collections}</span>
            <ul className="footer-links">
              <li><a href="#shop">{f.links.oud}</a></li>
              <li><a href="#shop">{f.links.him}</a></li>
              <li><a href="#shop">{f.links.her}</a></li>
              <li><a href="#shop">{f.links.unisex}</a></li>
              <li><a href="#shop">{f.links.fresh}</a></li>
              <li><a href="#shop">{f.links.oriental}</a></li>
            </ul>
          </div>

          <div>
            <span className="footer-col-head">{f.contact}</span>
            <ul className="footer-links">
              <li><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">+237 672 203 290</a></li>
              <li><a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href={TIKTOK} target="_blank" rel="noopener noreferrer">TikTok</a></li>
              <li><a href="#reviews">{f.links.reviews}</a></li>
              <li><a href="#contact">{f.links.message}</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} W&S Fragrances · Cameroun 🇨🇲</span>
          <span>{f.copy}</span>
        </div>
      </div>
    </footer>
  );
}
