import { LangProvider, useLang } from './LangContext.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Shop from './components/Shop.jsx';
import Brands from './components/Brands.jsx';
import About from './components/About.jsx';
import Reviews from './components/Reviews.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import { IconWhatsApp } from './icons.jsx';
import { WHATSAPP_NUMBER } from './data.js';

function Inner() {
  const { lang } = useLang();
  const msg = lang === 'fr'
    ? "Bonjour W&S Fragrances! Je voudrais commander un parfum."
    : "Hello W&S Fragrances! I'd like to order a perfume.";
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Shop />
        <Brands />
        <About />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="float-wa"
        aria-label="Order on WhatsApp"
      >
        <IconWhatsApp size={26} />
      </a>
    </>
  );
}

export default function App() {
  return (
    <LangProvider>
      <Inner />
    </LangProvider>
  );
}
