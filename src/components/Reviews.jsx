import { useState } from 'react';
import { useLang } from '../LangContext.jsx';
import { PERFUMES } from '../data.js';
import { IconStar } from '../icons.jsx';

const SEED = [
  { id:1, name:'Amara K.', perfume:'Oud For Glory', rating:5, text:'Absolutely incredible. Long-lasting, rich oud that commands attention. Best purchase I\'ve made this year. W&S is the real deal.', textFr:'Absolument incroyable. Oud riche et durable qui attire l\'attention. Meilleur achat de l\'année. W&S est vraiment fiable.', date:'May 2025', city:'Yaoundé' },
  { id:2, name:'Didier N.', perfume:'Asad', rating:5, text:'Une fragrance puissante et masculine. Dure toute la journée. Commande rapide via WhatsApp, livraison soignée. Je recommande.', textFr:'Une fragrance puissante et masculine. Dure toute la journée. Commande rapide via WhatsApp, livraison soignée. Je recommande.', date:'Apr 2025', city:'Douala' },
  { id:3, name:'Chioma E.', perfume:'Yara', rating:5, text:'Such a beautiful feminine scent. Sweet but not overpowering. My whole office noticed it. Will definitely reorder.', textFr:'Un parfum féminin magnifique. Doux mais pas écrasant. Tout mon bureau l\'a remarqué. Je recommanderai.', date:'Mar 2025', city:'Bafoussam' },
  { id:4, name:'Ibrahim S.', perfume:'Black Afgano', rating:5, text:'Royal, dark, unforgettable. This oud lasts all day into the night. Authentic product, fast delivery. Highly recommend W&S.', textFr:'Royal, sombre, inoubliable. Cet oud dure toute la journée. Produit authentique, livraison rapide. Je recommande W&S.', date:'Feb 2025', city:'Garoua' },
  { id:5, name:'Pascale M.', perfume:'9PM', rating:5, text:'The 9PM is divine. So modern and sensual for evenings. Fair price for a premium fragrance. I\'ve already recommended to 5 friends.', textFr:'Le 9PM est divin. Si moderne et sensuel pour les soirées. Prix juste pour un parfum premium. Déjà recommandé à 5 amis.', date:'Jan 2025', city:'Yaoundé' },
  { id:6, name:'Serge T.', perfume:'Club De Nuit', rating:4, text:'Great fragrance, exactly as described. Fast delivery and neat packaging. One of the best online fragrance experiences in Cameroon.', textFr:'Excellente fragrance, exactement comme décrit. Livraison rapide et emballage soigné. Une des meilleures expériences parfum en ligne au Cameroun.', date:'Dec 2024', city:'Douala' },
];

function StarRating({ value, size=12, interactive=false, onChange }) {
  return (
    <div className="review-stars">
      {[1,2,3,4,5].map(i => (
        <span
          key={i}
          style={{ color: i<=value ? 'var(--gold)' : 'var(--text-3)', cursor: interactive?'pointer':'default' }}
          onClick={() => interactive && onChange && onChange(i)}
        >
          <IconStar filled={i<=value} size={size} />
        </span>
      ))}
    </div>
  );
}

export default function Reviews() {
  const { t, lang } = useLang();
  const r = t.reviews;
  const [reviews, setReviews] = useState(SEED);
  const [form, setForm] = useState({ name:'', perfume:'', rating:5, text:'', city:'' });
  const [done, setDone] = useState(false);

  const avg = (reviews.reduce((a,x)=>a+x.rating,0)/reviews.length).toFixed(1);

  const submit = () => {
    if (!form.name || !form.text || !form.perfume) return;
    setReviews(p => [{
      id: Date.now(), ...form, textFr: form.text,
      date: new Date().toLocaleDateString('en-US',{month:'short',year:'numeric'})
    }, ...p]);
    setForm({ name:'', perfume:'', rating:5, text:'', city:'' });
    setDone(true);
    setTimeout(()=>setDone(false), 3000);
  };

  return (
    <section className="section" id="reviews" style={{ background:'var(--ink-2)', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)' }}>
      <div className="container">
        <div style={{ textAlign:'center', marginBottom:'3rem' }}>
          <span className="eyebrow">{r.eyebrow}</span>
          <h2 className="display" style={{ fontSize:'clamp(2rem,4vw,3rem)' }}>
            {r.title1} <em>{r.title2}</em>
          </h2>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'0.75rem', marginTop:'1rem' }}>
            <StarRating value={5} size={15} />
            <span style={{ fontFamily:'var(--display)', fontSize:'1.75rem', color:'var(--gold)', fontWeight:400, lineHeight:1 }}>{avg}</span>
            <span style={{ fontSize:'0.8rem', color:'var(--text-3)' }}>{r.from} {reviews.length}</span>
          </div>
        </div>

        <div className="reviews-grid">
          {reviews.map(rv => (
            <div key={rv.id} className="review-card">
              <div className="review-head">
                <div style={{ display:'flex', alignItems:'center', gap:'0.875rem' }}>
                  <div className="review-av">{rv.name[0]}</div>
                  <div>
                    <div className="review-name">{rv.name}</div>
                    <div className="review-meta">{rv.city} · {rv.date}</div>
                  </div>
                </div>
                <StarRating value={rv.rating} />
              </div>
              <div className="review-perfume">{rv.perfume}</div>
              <p className="review-text">"{lang==='fr' ? rv.textFr : rv.text}"</p>
            </div>
          ))}
        </div>

        {/* Submit */}
        <div style={{ maxWidth:'580px', margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'2rem' }}>
            <span className="eyebrow">{r.submitEyebrow}</span>
            <h3 className="display" style={{ fontSize:'1.75rem' }}>
              {r.submitTitle1} <em>{r.submitTitle2}</em>
            </h3>
          </div>

          {done ? (
            <div style={{ textAlign:'center', padding:'2.5rem', background:'var(--ink-2)', border:'1px solid var(--border-2)', borderRadius:'var(--r2)' }}>
              <p style={{ fontFamily:'var(--display)', fontSize:'1.25rem', color:'var(--gold)' }}>{r.thanks}</p>
            </div>
          ) : (
            <div style={{ background:'var(--ink-2)', border:'1px solid var(--border)', borderRadius:'var(--r2)', padding:'2rem' }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', marginBottom:'1rem' }}>
                <input className="form-field" style={{marginBottom:0}} placeholder={r.namePlaceholder} value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} />
                <input className="form-field" style={{marginBottom:0}} placeholder={r.cityPlaceholder} value={form.city} onChange={e=>setForm(f=>({...f,city:e.target.value}))} />
              </div>
              <select className="form-field" value={form.perfume} onChange={e=>setForm(f=>({...f,perfume:e.target.value}))}>
                <option value="">{r.selectPerfume}</option>
                {PERFUMES.map(p=><option key={p.id} value={p.name}>{p.name} — {p.brand}</option>)}
              </select>
              <div style={{ marginBottom:'1rem' }}>
                <p style={{ fontSize:'0.7rem', color:'var(--text-3)', marginBottom:'0.5rem', letterSpacing:'0.1em', textTransform:'uppercase' }}>{r.yourRating}</p>
                <StarRating value={form.rating} size={20} interactive onChange={v=>setForm(f=>({...f,rating:v}))} />
              </div>
              <textarea className="form-field" placeholder={r.messagePlaceholder} value={form.text} onChange={e=>setForm(f=>({...f,text:e.target.value}))} />
              <button className="btn btn-primary" onClick={submit} style={{ width:'100%', justifyContent:'center', padding:'0.9rem' }}>
                {r.submit}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
