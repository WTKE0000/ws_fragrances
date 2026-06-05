import { useState } from 'react';
import { useLang } from '../LangContext.jsx';
import { WHATSAPP_NUMBER, INSTAGRAM, TIKTOK } from '../data.js';
import { IconWhatsApp, IconInstagram, IconTikTok } from '../icons.jsx';

export default function Contact() {
  const { t, lang } = useLang();
  const c = t.contact;
  const [form, setForm] = useState({ name:'', phone:'', perfume:'', message:'' });
  const [sent, setSent] = useState(false);

  const send = () => {
    if (!form.name) return;
    const lines = [
      lang === 'fr' ? 'Bonjour W&S Fragrances!' : 'Hello W&S Fragrances!',
      '',
      `${lang==='fr'?'Nom':'Name'}: ${form.name}`,
      form.phone ? `${lang==='fr'?'Téléphone':'Phone'}: ${form.phone}` : '',
      form.perfume ? `${lang==='fr'?'Intéressé par':'Interested in'}: ${form.perfume}` : '',
      '',
      form.message || (lang==='fr'?'Je voudrais en savoir plus sur votre collection.':'I would like to know more about your collection.'),
    ].filter(l=>l!==undefined);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank');
    setSent(true);
    setTimeout(()=>setSent(false), 3000);
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div style={{ textAlign:'center', maxWidth:'520px', margin:'0 auto 4rem' }}>
          <span className="eyebrow">{c.eyebrow}</span>
          <h2 className="display" style={{ fontSize:'clamp(2rem,4vw,3rem)' }}>
            {c.title1} <em>{c.title2}</em>
          </h2>
          <p className="lead" style={{ marginTop:'0.75rem' }}>{c.subtitle}</p>
        </div>

        <div className="contact-grid">
          {/* Left col */}
          <div>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="contact-wa-card">
              <div className="contact-wa-icon"><IconWhatsApp size={22} /></div>
              <div>
                <div className="contact-wa-label">{c.whatsappLabel}</div>
                <div className="contact-wa-num">{c.whatsappNumber}</div>
                <div className="contact-wa-sub">{c.whatsappSub}</div>
              </div>
            </a>

            <div className="contact-info-card">
              <div className="contact-info-label">{c.followLabel}</div>
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="contact-social-link">
                <IconInstagram size={18} />
                <div>
                  <div>Instagram</div>
                  <div className="contact-social-handle">@ws_fragrances</div>
                </div>
              </a>
              <a href={TIKTOK} target="_blank" rel="noopener noreferrer" className="contact-social-link">
                <IconTikTok size={18} />
                <div>
                  <div>TikTok</div>
                  <div className="contact-social-handle">@ws_frangrances</div>
                </div>
              </a>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-label">{c.hoursLabel}</div>
              {c.hours.map(h => (
                <div key={h.day} className="hours-row">
                  <span className="hours-day">{h.day}</span>
                  <span className="hours-time">{h.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="form-card">
            <h3>{c.formTitle1} <em>{c.formTitle2}</em></h3>
            <div className="form-row">
              <input className="form-field" style={{marginBottom:0}} placeholder={c.namePlaceholder} value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} />
              <input className="form-field" style={{marginBottom:0}} placeholder={c.phonePlaceholder} value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} />
            </div>
            <input className="form-field" placeholder={c.perfumePlaceholder} value={form.perfume} onChange={e=>setForm(f=>({...f,perfume:e.target.value}))} />
            <textarea className="form-field" placeholder={c.messagePlaceholder} value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} />
            <button className="btn btn-wa" onClick={send} style={{ width:'100%', justifyContent:'center', padding:'0.9rem' }}>
              <IconWhatsApp size={17} />
              {sent ? c.sendingBtn : c.sendBtn}
            </button>
            <p className="form-note">{c.formNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
