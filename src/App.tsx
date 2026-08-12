import React, { useEffect, useState } from 'react';
import './App.css';

import logo from './assets/images/logo.png';
import instagramIcon from './assets/icons/instagram.png';
import mailIcon from './assets/icons/mail.png';
import whatsappIcon from './assets/icons/whatsapp.png';

import {
  CalendarDays,
  ArrowDown,
  ScanHeart,
  ShieldCheck,
  SportShoe,
  ThermometerSnowflake,
  User,
  UsersRound,
  Wind,
} from 'lucide-react';

import hielo from './assets/images/hielo.jpg';
import movimiento from './assets/images/movimiento.jpg';
import recuperacion from './assets/images/recuperacion.jpg';
import respiracion from './assets/images/respiracion.png';
import hero from './assets/images/hero-1.png';

const contactIcons = {
  instagram: instagramIcon,
  mail: mailIcon,
  whatsapp: whatsappIcon,
};

type IconProps = {
  name: keyof typeof contactIcons;
  alt: string;
  className?: string;
};

function Icon({ name, alt, className }: IconProps) {
  return (
    <img
      src={contactIcons[name]}
      className={className}
      alt={alt}
    />
  );
}


const cards = [
  {
    title: <>Respiración<br />Mindfulness</>,
    description: <>Regula tu sistema<br />nervioso.</>,
    image: respiracion,
    icon: Wind,
    className: 'card-breath',
  },
  {
    title: <>Movimiento</>,
    description: <>Entrena tu cuerpo,<br />mejora tu<br />rendimiento y<br />bienestar.</>,
    image: movimiento,
    icon: SportShoe,
    className: 'card-movement',
  },
  {
    title: <>Baño de<br />hielo</>,
    description: <>Fortalece tu<br />mente, reduce<br />inflamación y<br />activa tu energía.</>,
    image: hielo,
    icon: ThermometerSnowflake,
    className: 'card-cold',
  },
  {
    title: <>Recuperación</>,
    description: <>Recuperación<br />profunda para rendir<br />más y vivir en<br />equilibrio.</>,
    image: recuperacion,
    icon: ScanHeart,
    className: 'card-recovery',
  },
];

const benefits = [
  {
    title: 'Planes y sesiones personalizadas',
    description: <>Para ti y tus objetivos.</>,
    icon: User,
  },
  {
    title: 'Experiencias únicas',
    description: <>Diseñadas para transformar cuerpo<br />y mente.</>,
    icon: CalendarDays,
  },
  {
    title: 'Métodos respaldados por la ciencia',
    description: <>Para resultados reales.</>,
    icon: ShieldCheck,
  },
  {
    title: 'Comunidad',
    description: <>Una comunidad que te impulsa a ser tu mejor<br />versión</>,
    icon: UsersRound,
  },
];

function App() {
  const [showScrollCue, setShowScrollCue] = useState(true);

  useEffect(() => {
    const updateScrollCue = () => {
      setShowScrollCue(window.scrollY <= 2);
    };

    updateScrollCue();
    window.addEventListener('scroll', updateScrollCue, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollCue);
    };
  }, []);

  return (
    <main className="landing-page" id="top">
      <header className="mobile-sticky-brand">
        <a href="#top" aria-label="RE Wellness and Recovery, inicio">
          <img src={logo} alt="RE" />
          <small>Wellness <span>&amp;</span> Recovery</small>
        </a>
      </header>

      <section className="hero-section">
        <div className="hero-copy">
          <header className="contact-header">
            <a className="brand" href="#top" aria-label="RE Wellness and Recovery">
                <img src={logo} width="164" alt="logo" />
                <small>Wellness <span>&amp;</span> Recovery</small>
            </a>

            <div className="contact-links">
              <a href="https://wa.me/50378536868" aria-label="WhatsApp +503 7853-6868" target="_blank" rel="noopener noreferrer">
                <Icon name="whatsapp" alt="Whatsapp Logo"/>
                <span>+503 7853-6868</span>
              </a>
              <a href="mailto:rewellness@gmail.com">
                <Icon name="mail" alt="Email Icon"/>
                <span>rewellness@gmail.com</span>
              </a>
              <a href="https://instagram.com/rewellnessco" target="_blank" rel="noopener noreferrer">
                <Icon name="instagram" alt="Instagram Logo" />
                <span>@rewellnessco</span>
              </a>
            </div>
          </header>

          <div className="hero-message">
            <h1>Transforma<br />tu cuerpo.<br />Regula tu mente.</h1>
            <p>
              Experiencias y herramientas que optimizan tu <br />
              sistema nervioso, favorecen tu recuperación y te <br />
              ayudan a volver a tu mejor versión.
            </p>
          </div>
        </div>

        <div className="hero-image">
          <img src={hero} alt="Mujer junto a una tina de inmersión en hielo" />
        </div>

        {showScrollCue && (
          <div className="mobile-scroll-cue" aria-hidden="true">
            <ArrowDown />
          </div>
        )}
      </section>

      <section className="services" aria-label="Servicios">
        {cards.map((card) => {
          const CardIcon = card.icon;
          return (
            <article className={`service-card ${card.className}`} key={card.className}>
              <img src={card.image} alt="" />
              <div className="card-overlay" />
              <CardIcon className="service-icon"/>
              <div className="service-copy">
                <h2>{card.title}</h2>
                <p>{card.description}</p>
              </div>
            </article>
          );
        })}
      </section>

      <section className="benefits" aria-label="Beneficios">
        {benefits.map((benefit) => {
          const BenefitIcon = benefit.icon;
          return (
            <article className="benefit" key={benefit.title}>
              <BenefitIcon className="benefit-icon" aria-hidden="true" />
              <div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            </article>
          );
        })}
      </section>

      <section className="mobile-contact" aria-labelledby="mobile-contact-title">
        <h2 id="mobile-contact-title">Contacto</h2>

        <div className="mobile-contact-links">
          <a href="https://instagram.com/rewellnessco" target="_blank" rel="noopener noreferrer">
            <Icon name="instagram" alt="" />
            <span>@rewellnessco</span>
          </a>
          <a href="https://wa.me/50378536868" target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" alt="" />
            <span>+503 7853-6868</span>
          </a>
          <a href="mailto:rewellness@gmail.com">
            <Icon name="mail" alt="" />
            <span>rewellness@gmail.com</span>
          </a>
        </div>

        <a className="mobile-contact-cta" href="https://wa.me/50378536868" target="_blank" rel="noopener noreferrer">
          ¡Agenda tu consulta!
        </a>
      </section>

      <footer className="mobile-footer">
        <span>© All rights reserved</span>
        <strong>Reset · Reconnect · Restart</strong>
      </footer>
    </main>
  );
}

export default App;
