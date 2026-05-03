/* Fundación Patagonia Fiel — main site component */
const { useState, useEffect, useRef } = React;

// ──────────────────────────────────────────────────────────────────────────
// Subtle horizon animation — sea bands with gentle wave + occasional bird
// ──────────────────────────────────────────────────────────────────────────
function HorizonHero({ accent, hero, density }) {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (now) => {
      setT((now - start) / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // 3 wave layers
  const wave = (amp, freq, phase, y) => {
    const pts = [];
    for (let x = 0; x <= 1440; x += 12) {
      const yy = y + Math.sin((x / freq) + t * phase) * amp;
      pts.push(`${x},${yy.toFixed(2)}`);
    }
    return `M0,${y + amp + 200} L${pts.join(" L")} L1440,${y + amp + 200} Z`;
  };

  // Bird path: crosses every ~14s
  const birdT = (t * 0.07) % 1;
  const birdX = -60 + birdT * 1560;
  const birdY = 180 + Math.sin(birdT * Math.PI * 2) * 18;
  const birdFlap = Math.sin(t * 6) * 0.5 + 0.5;

  if (hero === "photo") {
    return (
      <div className="hero hero--photo">
        <div className="hero__photo-bg" />
        <div className="hero__photo-overlay" />
        <HeroCopy accent={accent} />
      </div>
    );
  }

  if (hero === "minimal") {
    return (
      <div className="hero hero--minimal">
        <HeroCopy accent={accent} minimal />
      </div>
    );
  }

  return (
    <div className="hero hero--horizon">
      <svg
        className="hero__svg"
        viewBox="0 0 1440 560"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--sky-top)" />
            <stop offset="100%" stopColor="var(--sky-bot)" />
          </linearGradient>
          <linearGradient id="sea1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--sea-1-top)" />
            <stop offset="100%" stopColor="var(--sea-1-bot)" />
          </linearGradient>
        </defs>

        {/* sky */}
        <rect x="0" y="0" width="1440" height="560" fill="url(#sky)" />

        {/* distant mesa silhouette (Bahía San Antonio reference) */}
        <path
          d="M0,300 L120,295 L180,278 L320,272 L420,266 L520,270 L640,260 L780,258 L900,266 L1040,262 L1160,270 L1280,268 L1440,272 L1440,330 L0,330 Z"
          fill="var(--mesa)"
          opacity="0.55"
        />
        <path
          d="M0,318 L160,316 L240,308 L380,310 L520,302 L660,308 L800,300 L940,308 L1080,304 L1220,310 L1440,306 L1440,340 L0,340 Z"
          fill="var(--mesa)"
          opacity="0.85"
        />

        {/* sun / light disk low on horizon */}
        <circle cx="1080" cy="312" r="42" fill="var(--sun)" opacity="0.55" />
        <circle cx="1080" cy="312" r="22" fill="var(--sun)" opacity="0.9" />

        {/* sea — three bands, animated */}
        <path d={wave(3, 60, 0.6, 332)} fill="url(#sea1)" opacity="0.85" />
        <path d={wave(4, 90, 0.4, 360)} fill="var(--sea-2)" opacity="0.7" />
        <path d={wave(5, 120, 0.3, 400)} fill="var(--sea-3)" opacity="0.85" />
        <path d={wave(6, 70, 0.5, 440)} fill="var(--sea-4)" />

        {/* tide line marks */}
        {Array.from({ length: 18 }).map((_, i) => (
          <line
            key={i}
            x1={80 + i * 78}
            x2={120 + i * 78}
            y1={485 + (i % 2) * 12}
            y2={485 + (i % 2) * 12}
            stroke="var(--accent)"
            strokeWidth="1"
            opacity="0.35"
          />
        ))}

        {/* bird */}
        <g transform={`translate(${birdX} ${birdY})`} opacity="0.8">
          <path
            d={`M-12,0 Q-6,${-6 - birdFlap * 4} 0,0 Q6,${-6 - birdFlap * 4} 12,0`}
            stroke="var(--accent)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      </svg>

      <HeroCopy accent={accent} />
    </div>
  );
}

function HeroCopy({ accent, minimal }) {
  return (
    <div className={"hero__copy" + (minimal ? " hero__copy--minimal" : "")}>
      <div className="hero__eyebrow">
        <span className="hero__dot" />
        San Antonio Oeste · Río Negro · Patagonia Argentina
      </div>
      <h1 className="hero__title">
        Cuidar el lugar<br />
        <em>donde nos encontramos.</em>
      </h1>
      <p className="hero__lede">
        Una fundación que trabaja por el vínculo entre las personas y los
        territorios que habitan, en la costa del Golfo San Matías.
      </p>
      <div className="hero__actions">
        <a className="btn btn--primary" href="#contacto">Trabajemos juntos</a>
        <a className="btn btn--ghost" href="#programa">Conocer el programa →</a>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Sections
// ──────────────────────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="nav">
      <a className="nav__brand" href="#top">
        <img src="assets/logo-color.png" alt="" className="nav__logo" />
        <span className="nav__brand-text">
          <span className="nav__brand-small">Fundación</span>
          <span className="nav__brand-big">Patagonia Fiel</span>
        </span>
      </a>
      <button className="nav__burger" onClick={() => setOpen(!open)} aria-label="Menu">
        <span /><span /><span />
      </button>
      <ul className={"nav__links" + (open ? " nav__links--open" : "")}>
        <li><a href="#quienes" onClick={() => setOpen(false)}>Quiénes somos</a></li>
        <li><a href="#programa" onClick={() => setOpen(false)}>Programa</a></li>
        <li><a href="#plan" onClick={() => setOpen(false)}>Plan trienal</a></li>
        <li><a href="#colaborar" onClick={() => setOpen(false)}>Colaborar</a></li>
        <li><a className="nav__cta" href="#contacto" onClick={() => setOpen(false)}>Contacto</a></li>
      </ul>
    </nav>
  );
}

function Quienes() {
  const fines = [
    "Promover la educación ambiental en la comunidad en todos sus niveles.",
    "Fomentar la comunicación, sensibilización y difusión de problemáticas socioambientales.",
    "Impulsar iniciativas de desarrollo local sostenible.",
    "Colaborar en la preservación del patrimonio cultural y natural.",
    "Investigar para la preservación de la biodiversidad y los ecosistemas.",
    "Promover prácticas de manejo sostenible de los recursos naturales.",
    "Favorecer la participación comunitaria en decisiones ambientales.",
    "Cooperar con instituciones científicas y de la sociedad civil.",
  ];

  const team = [
    { name: "Maximiliano Bertini", role: "Presidente" },
    { name: "Dennis Norberto Landete", role: "Secretario" },
    { name: "Juan Francisco Saad", role: "Tesorero · Dr. en Ciencias Biológicas" },
    { name: "María Libertad Chibli", role: "Vocal Titular" },
  ];

  return (
    <section className="section" id="quienes">
      <div className="section__head">
        <span className="section__label">01 — Quiénes somos</span>
        <h2 className="section__title">
          Generamos espacios que <em>fortalecen el vínculo</em> entre las personas
          y los territorios que habitan.
        </h2>
      </div>

      <div className="quienes">
        <div className="quienes__statement">
          <p className="lede">
            La <strong>Fundación Patagonia Fiel</strong> nació en San Antonio Oeste
            en diciembre de 2025, con la convicción de que cuidar la naturaleza es
            también cuidar la trama comunitaria que la habita. Trabajamos en la
            costa del Golfo San Matías, una de las áreas más singulares de la
            Patagonia atlántica.
          </p>
          <p>
            Promovemos la revalorización de la naturaleza y su integración con la
            vida comunitaria a través de la educación ambiental, la investigación
            aplicada y proyectos de desarrollo local sostenible.
          </p>
        </div>

        <div className="fines">
          <div className="fines__head">Nuestros fines</div>
          <ol className="fines__list">
            {fines.map((f, i) => (
              <li key={i}>
                <span className="fines__num">{String(i + 1).padStart(2, "0")}</span>
                <span>{f}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="team">
        <div className="team__head">Consejo de Administración</div>
        <div className="team__grid">
          {team.map((p) => (
            <div key={p.name} className="team__card">
              <div className="team__avatar">
                <span className="team__initials">
                  {p.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </span>
              </div>
              <div className="team__name">{p.name}</div>
              <div className="team__role">{p.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Programa() {
  return (
    <section className="section section--alt" id="programa">
      <div className="section__head">
        <span className="section__label">02 — Programa actual</span>
        <h2 className="section__title">
          Bahía San Antonio <em>bajo la lupa.</em>
        </h2>
        <p className="section__sub">Naturaleza, conciencia y desafíos.</p>
      </div>

      <div className="programa">
        <div className="programa__media">
          <div className="placeholder placeholder--landscape">
            <span>FOTO · Bahía San Antonio · marea baja</span>
          </div>
          <div className="programa__caption">
            Área Natural Protegida desde 1993 · Golfo San Matías
          </div>
        </div>

        <div className="programa__body">
          <p className="lede">
            Un programa de educación ambiental para estudiantes de nivel medio,
            centrado en el ecosistema costero más singular del Golfo San Matías.
          </p>

          <div className="programa__grid">
            <div className="programa__cell">
              <div className="programa__cell-h">Objetivo</div>
              <p>
                Promover la conciencia ambiental a partir del conocimiento de la
                Bahía como sistema socioambiental.
              </p>
            </div>
            <div className="programa__cell">
              <div className="programa__cell-h">Contenidos</div>
              <p>Biodiversidad · Mareas · Impactos humanos · Conservación.</p>
            </div>
            <div className="programa__cell">
              <div className="programa__cell-h">Modalidad</div>
              <p>Charlas-taller presenciales de 40 minutos, coordinadas con docentes.</p>
            </div>
            <div className="programa__cell">
              <div className="programa__cell-h">Equipo responsable</div>
              <p>Dr. Juan Francisco Saad · Est. Camilo Juárez Viecho</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Plan() {
  const years = [
    {
      year: "Primer año",
      title: "Educación y sensibilización",
      bullets: [
        "Charlas y talleres en escuelas primarias (4° y 5°) y secundarias de Río Negro.",
        "Materiales didácticos y actividades participativas para la comunidad.",
        "Bases sostenidas en el tiempo: educación como meta permanente.",
      ],
    },
    {
      year: "Segundo año",
      title: "Saneamiento y puesta en valor",
      bullets: [
        "Mantenimiento de sectores costeros y ambientes naturales de uso comunitario.",
        "Mejora del entorno y equipamiento básico en áreas recreativas.",
        "Desarrollo del Paseo de Salud — circuito natural en San Antonio Oeste.",
      ],
    },
    {
      year: "Tercer año",
      title: "Observatorio Oceanográfico Costero",
      bullets: [
        "Mediciones sistemáticas de calidad de agua en zonas costeras clave.",
        "Acuerdos con instituciones académicas, organismos públicos y privadas.",
        "Observación de aves costeras y marinas · ciencia ciudadana.",
      ],
    },
  ];

  return (
    <section className="section" id="plan">
      <div className="section__head">
        <span className="section__label">03 — Plan trienal</span>
        <h2 className="section__title">
          Tres años, <em>un mismo horizonte.</em>
        </h2>
        <p className="section__sub">
          Una proyección que crece desde el aula hasta la observación científica
          continua del Golfo.
        </p>
      </div>

      <div className="plan">
        {years.map((y, i) => (
          <article key={y.year} className="plan__card">
            <div className="plan__num">{String(i + 1).padStart(2, "0")}</div>
            <div className="plan__year">{y.year}</div>
            <h3 className="plan__title">{y.title}</h3>
            <ul className="plan__list">
              {y.bullets.map((b, j) => (
                <li key={j}>{b}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function Colaborar() {
  const ways = [
    {
      h: "Aportes de empresas",
      p: "Sumate como aliado estratégico al plan trienal: tu aporte financia campañas de educación, saneamiento costero y monitoreo ambiental.",
      cta: "Quiero ser aliado",
    },
    {
      h: "Donaciones particulares",
      p: "Aportes de personas que quieren cooperar con los objetivos de la fundación. Cada contribución se destina íntegramente al objeto fundacional.",
      cta: "Hacer un aporte",
    },
    {
      h: "Cooperación institucional",
      p: "Vínculos con universidades, escuelas, organismos públicos y ONGs locales o internacionales para proyectos compartidos.",
      cta: "Conversemos",
    },
  ];

  return (
    <section className="section section--dark" id="colaborar">
      <div className="section__head section__head--dark">
        <span className="section__label">04 — Cómo colaborar</span>
        <h2 className="section__title">
          La Patagonia se cuida <em>en compañía.</em>
        </h2>
      </div>

      <div className="ways">
        {ways.map((w) => (
          <div key={w.h} className="ways__card">
            <h3 className="ways__h">{w.h}</h3>
            <p className="ways__p">{w.p}</p>
            <a href="#contacto" className="ways__cta">{w.cta} →</a>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contacto() {
  return (
    <section className="section" id="contacto">
      <div className="contact">
        <div className="contact__copy">
          <span className="section__label">05 — Contacto</span>
          <h2 className="section__title">
            Trabajemos juntos.
          </h2>
          <p className="lede">
            Si querés sumar tu organización, escuela, empresa o esfuerzo
            personal a la fundación, escribinos. Respondemos cada mensaje.
          </p>

          <dl className="contact__data">
            <div>
              <dt>Sede</dt>
              <dd>Gerónimo "Tinga" González 425<br />San Antonio Oeste · Río Negro</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd><a href="mailto:contacto@patagoniafiel.org">contacto@patagoniafiel.org</a></dd>
            </div>
            <div>
              <dt>Personería jurídica</dt>
              <dd>En trámite · Constituida 15·12·2025</dd>
            </div>
          </dl>
        </div>

        <form className="contact__form" onSubmit={(e) => e.preventDefault()}>
          <label>
            <span>Nombre</span>
            <input type="text" placeholder="Tu nombre" />
          </label>
          <label>
            <span>Email</span>
            <input type="email" placeholder="vos@ejemplo.com" />
          </label>
          <label>
            <span>Organización <i>(opcional)</i></span>
            <input type="text" placeholder="Empresa, escuela, ONG…" />
          </label>
          <label>
            <span>Mensaje</span>
            <textarea rows="4" placeholder="Contanos en qué podemos colaborar."></textarea>
          </label>
          <button type="submit" className="btn btn--primary btn--block">
            Enviar mensaje
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <img src="assets/logo-color.png" alt="" className="footer__logo" />
          <div>
            <div className="footer__small">Fundación</div>
            <div className="footer__big">Patagonia Fiel</div>
          </div>
        </div>
        <p className="footer__obj">
          "Generar espacios que fortalezcan el vínculo entre las personas y los
          territorios que habitan, promoviendo la revalorización de la
          naturaleza y su integración con la vida comunitaria."
        </p>
      </div>
      <div className="footer__bot">
        <span>© 2026 Fundación Patagonia Fiel</span>
        <span>San Antonio Oeste · Río Negro · Argentina</span>
      </div>
    </footer>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Root
// ──────────────────────────────────────────────────────────────────────────
function Site({ tweaks, _onlyHero }) {
  // Apply tweak vars to root via inline style on container
  const styleVars = {
    "--accent": tweaks.accent,
    "--font-display": tweaks.displayFont,
    "--font-body": tweaks.bodyFont,
    "--density": tweaks.density,
  };

  if (_onlyHero) {
    return (
      <div className="site" id="top" style={styleVars}>
        <Nav />
        <HorizonHero accent={tweaks.accent} hero={tweaks.hero} density={tweaks.density} />
      </div>
    );
  }

  return (
    <div className="site" id="top" style={styleVars} data-density={tweaks.density}>
      <Nav />
      <HorizonHero accent={tweaks.accent} hero={tweaks.hero} density={tweaks.density} />
      <Quienes />
      <Programa />
      <Plan />
      <Colaborar />
      <Contacto />
      <Footer />
    </div>
  );
}

window.Site = Site;
