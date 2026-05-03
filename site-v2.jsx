/* Fundación Patagonia Fiel — v2: photo-driven, immersive  */
const { useState, useEffect, useRef } = React;

const PHOTOS = {
  hero: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=2400&q=80&auto=format&fit=crop",
  // Coastal Patagonia / sea
  coast1: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80&auto=format&fit=crop",
  coast2: "https://images.unsplash.com/photo-1583265627959-fb7042f5133b?w=1600&q=80&auto=format&fit=crop",
  // Patagonia landscape
  mesa: "https://images.unsplash.com/photo-1531168556467-80aace0d0144?w=1600&q=80&auto=format&fit=crop",
  steppe: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1600&q=80&auto=format&fit=crop",
  // Wildlife
  bird: "https://images.unsplash.com/photo-1591608971362-f08b2a75731a?w=1600&q=80&auto=format&fit=crop",
  seal: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=1600&q=80&auto=format&fit=crop",
  // Education / community
  classroom: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1600&q=80&auto=format&fit=crop",
  workshop: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1600&q=80&auto=format&fit=crop",
  research: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1600&q=80&auto=format&fit=crop",
  // Beach / tide
  tide: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80&auto=format&fit=crop",
  rocks: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=1600&q=80&auto=format&fit=crop",
  // Hands / community
  hands: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&q=80&auto=format&fit=crop",
  // Wide horizon
  horizon: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=2400&q=80&auto=format&fit=crop",
  // Team avatars (placeholder portraits)
  p1: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop&crop=faces",
  p2: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&auto=format&fit=crop&crop=faces",
  p3: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop&crop=faces",
  p4: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80&auto=format&fit=crop&crop=faces",
};

// ─────────────────────────────────────────────────────────────
// Photo-led hero
// ─────────────────────────────────────────────────────────────
function PhotoHero() {
  return (
    <header className="v2-hero">
      <img src={PHOTOS.hero} alt="" className="v2-hero__img" />
      <div className="v2-hero__veil" />
      <div className="v2-hero__inner">
        <div className="v2-hero__eyebrow">
          <span className="v2-hero__dot" />
          San Antonio Oeste · Río Negro · Patagonia
        </div>
        <h1 className="v2-hero__title">
          Cuidar el lugar<br/>
          <em>donde nos encontramos.</em>
        </h1>
        <p className="v2-hero__lede">
          Trabajamos por el vínculo entre las personas y los territorios que
          habitan, en la costa del Golfo San Matías.
        </p>
        <div className="v2-hero__actions">
          <a className="v2-btn v2-btn--primary" href="#contacto">Trabajemos juntos</a>
          <a className="v2-btn v2-btn--ghost" href="#programa">Conocer el programa →</a>
        </div>
      </div>
      <div className="v2-hero__meta">
        <div><span>Constituida</span><b>15·12·2025</b></div>
        <div><span>Sede</span><b>San Antonio Oeste</b></div>
        <div><span>Plan</span><b>Trienal 2026—2028</b></div>
      </div>
    </header>
  );
}

function V2Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={"v2-nav" + (scrolled ? " v2-nav--scrolled" : "")}>
      <a className="v2-nav__brand" href="#top">
        <img src="assets/logo-color.png" alt="" />
        <span>
          <small>Fundación</small>
          <b>Patagonia Fiel</b>
        </span>
      </a>
      <button className="v2-nav__burger" onClick={() => setOpen(!open)} aria-label="Menú">
        <span/><span/><span/>
      </button>
      <ul className={"v2-nav__links" + (open ? " v2-nav__links--open" : "")}>
        <li><a href="#manifiesto" onClick={() => setOpen(false)}>Manifiesto</a></li>
        <li><a href="#quienes" onClick={() => setOpen(false)}>Quiénes somos</a></li>
        <li><a href="#programa" onClick={() => setOpen(false)}>Programa</a></li>
        <li><a href="#plan" onClick={() => setOpen(false)}>Plan trienal</a></li>
        <li><a className="v2-nav__cta" href="#contacto" onClick={() => setOpen(false)}>Contacto</a></li>
      </ul>
    </nav>
  );
}

// Quote between sections, full-bleed photo
function PhotoQuote({ src, quote, source, align = "left" }) {
  return (
    <section className={"v2-quote v2-quote--" + align}>
      <img src={src} alt="" className="v2-quote__img" />
      <div className="v2-quote__veil" />
      <div className="v2-quote__inner">
        <blockquote>
          <span className="v2-quote__mark">“</span>
          {quote}
        </blockquote>
        {source && <cite>{source}</cite>}
      </div>
    </section>
  );
}

function Manifiesto() {
  return (
    <section className="v2-section v2-section--manifiesto" id="manifiesto">
      <div className="v2-grid v2-grid--manifiesto">
        <div className="v2-mani__photos">
          <img src={PHOTOS.coast1} alt="Costa de la Bahía San Antonio" className="v2-mani__photo v2-mani__photo--1" />
          <img src={PHOTOS.bird} alt="Aves costeras" className="v2-mani__photo v2-mani__photo--2" />
          <img src={PHOTOS.tide} alt="Marea baja" className="v2-mani__photo v2-mani__photo--3" />
        </div>
        <div className="v2-mani__copy">
          <span className="v2-label">Manifiesto</span>
          <h2 className="v2-h2">
            La Patagonia no se hereda: <em>se cuida.</em>
          </h2>
          <p className="v2-lede">
            Nacimos en San Antonio Oeste, frente a una de las costas más singulares
            del Atlántico Sur. Vimos cómo se erosionan los vínculos entre la gente y
            su territorio. Decidimos hacer algo al respecto.
          </p>
          <p>
            La <strong>Fundación Patagonia Fiel</strong> existe para generar
            espacios que fortalezcan ese vínculo, integrando a la naturaleza en la
            vida comunitaria a través de la educación ambiental, la investigación
            aplicada y proyectos de desarrollo local sostenible.
          </p>
          <div className="v2-mani__sig">
            — Consejo de Administración<br/>
            <span>San Antonio Oeste · diciembre 2025</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Quienes() {
  const fines = [
    "Promover la educación ambiental en la comunidad en todos sus niveles.",
    "Fomentar la comunicación, sensibilización y difusión socioambiental.",
    "Impulsar iniciativas de desarrollo local sostenible.",
    "Colaborar en la preservación del patrimonio cultural y natural.",
    "Investigar para la preservación de la biodiversidad y los ecosistemas.",
    "Promover prácticas de manejo sostenible de recursos naturales.",
    "Favorecer la participación comunitaria en decisiones ambientales.",
    "Cooperar con instituciones científicas y de la sociedad civil.",
  ];

  const team = [
    { name: "Maximiliano Bertini", role: "Presidente", img: PHOTOS.p1 },
    { name: "Dennis N. Landete", role: "Secretario", img: PHOTOS.p2 },
    { name: "Juan Francisco Saad", role: "Tesorero · Dr. en Cs. Biológicas", img: PHOTOS.p3 },
    { name: "María Libertad Chibli", role: "Vocal Titular", img: PHOTOS.p4 },
  ];

  return (
    <section className="v2-section" id="quienes">
      <div className="v2-section__head">
        <span className="v2-label">01 — Quiénes somos</span>
        <h2 className="v2-h2">
          Una fundación que <em>escucha el territorio.</em>
        </h2>
      </div>

      <div className="v2-fines-wrap">
        <div className="v2-fines">
          <div className="v2-fines__head">Nuestros fines</div>
          <ol className="v2-fines__list">
            {fines.map((f, i) => (
              <li key={i}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <p>{f}</p>
              </li>
            ))}
          </ol>
        </div>
        <img className="v2-fines__photo" src={PHOTOS.steppe} alt="Estepa patagónica" />
      </div>

      <div className="v2-team">
        <div className="v2-team__head">
          <span className="v2-label">Consejo de Administración</span>
          <h3 className="v2-h3">Las personas detrás del proyecto.</h3>
        </div>
        <div className="v2-team__grid">
          {team.map((p) => (
            <figure key={p.name} className="v2-team__card">
              <div className="v2-team__photo">
                <img src={p.img} alt={p.name} />
              </div>
              <figcaption>
                <b>{p.name}</b>
                <span>{p.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Programa() {
  return (
    <section className="v2-section v2-section--programa" id="programa">
      <div className="v2-prog__hero">
        <img src={PHOTOS.coast2} alt="Bahía San Antonio" />
        <div className="v2-prog__hero-veil" />
        <div className="v2-prog__hero-copy">
          <span className="v2-label v2-label--light">02 — Programa actual</span>
          <h2 className="v2-h2 v2-h2--light">
            Bahía San Antonio<br/><em>bajo la lupa.</em>
          </h2>
          <p className="v2-prog__sub">Naturaleza, conciencia y desafíos.</p>
        </div>
      </div>

      <div className="v2-prog__body">
        <div className="v2-prog__intro">
          <p className="v2-lede">
            Un programa de educación ambiental para estudiantes de nivel medio,
            centrado en el ecosistema costero más singular del Golfo San Matías —
            Área Natural Protegida desde 1993.
          </p>
        </div>

        <div className="v2-prog__grid">
          <article className="v2-prog__cell">
            <img src={PHOTOS.classroom} alt="Charla en el aula" />
            <div>
              <h4>Charlas-taller</h4>
              <p>Encuentros presenciales de 40 minutos con contenido científico accesible y participación activa de los estudiantes.</p>
            </div>
          </article>
          <article className="v2-prog__cell">
            <img src={PHOTOS.bird} alt="Avifauna" />
            <div>
              <h4>Biodiversidad</h4>
              <p>Reconocer las características ecológicas de la bahía y comprender su importancia regional desde la mirada científica.</p>
            </div>
          </article>
          <article className="v2-prog__cell">
            <img src={PHOTOS.tide} alt="Marea baja" />
            <div>
              <h4>Mareas e impacto</h4>
              <p>Comprender la dinámica de mareas más amplia del Atlántico y los impactos de las actividades humanas en el ecosistema.</p>
            </div>
          </article>
          <article className="v2-prog__cell">
            <img src={PHOTOS.hands} alt="Compromiso comunitario" />
            <div>
              <h4>Pensamiento crítico</h4>
              <p>Fomentar la capacidad de cuestionar y proponer soluciones desde una ciudadanía ambientalmente comprometida.</p>
            </div>
          </article>
        </div>

        <aside className="v2-prog__team">
          <div>
            <span className="v2-label">Equipo responsable</span>
            <p><b>Dr. Juan Francisco Saad</b> · responsable<br/><b>Est. Camilo Juárez Viecho</b> · colaborador</p>
          </div>
          <div>
            <span className="v2-label">Destinatarios</span>
            <p>Estudiantes de la Escuela Secundaria Río Negro.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Plan() {
  const years = [
    {
      year: "Primer año",
      title: "Educación y sensibilización",
      img: PHOTOS.workshop,
      bullets: [
        "Charlas y talleres en escuelas primarias (4° y 5°) y secundarias de Río Negro.",
        "Materiales didácticos y actividades participativas para la comunidad.",
        "La educación como meta permanente de la fundación.",
      ],
    },
    {
      year: "Segundo año",
      title: "Saneamiento y puesta en valor",
      img: PHOTOS.rocks,
      bullets: [
        "Mantenimiento de sectores costeros y ambientes naturales de uso comunitario.",
        "Mejora del entorno y equipamiento básico en áreas recreativas.",
        "Desarrollo del Paseo de Salud — circuito natural en San Antonio Oeste.",
      ],
    },
    {
      year: "Tercer año",
      title: "Observatorio Oceanográfico",
      img: PHOTOS.research,
      bullets: [
        "Mediciones sistemáticas de calidad de agua en zonas costeras clave.",
        "Acuerdos con instituciones académicas, organismos públicos y privados.",
        "Observación de aves costeras y marinas · ciencia ciudadana.",
      ],
    },
  ];

  return (
    <section className="v2-section v2-section--plan" id="plan">
      <div className="v2-section__head">
        <span className="v2-label">03 — Plan trienal</span>
        <h2 className="v2-h2">
          Tres años, <em>un mismo horizonte.</em>
        </h2>
        <p className="v2-h2-sub">
          Una proyección que crece desde el aula hasta la observación científica continua del Golfo.
        </p>
      </div>

      <div className="v2-plan">
        {years.map((y, i) => (
          <article key={y.year} className="v2-plan__card">
            <div className="v2-plan__photo">
              <img src={y.img} alt={y.title} />
              <span className="v2-plan__num">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <div className="v2-plan__body">
              <span className="v2-label">{y.year}</span>
              <h3>{y.title}</h3>
              <ul>{y.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Colaborar() {
  const ways = [
    { h: "Aportes de empresas", p: "Sumate como aliado estratégico al plan trienal: tu aporte financia educación, saneamiento costero y monitoreo ambiental." },
    { h: "Donaciones particulares", p: "Aportes de personas que quieren cooperar. Cada contribución se destina íntegramente al objeto fundacional." },
    { h: "Cooperación institucional", p: "Vínculos con universidades, escuelas, organismos públicos y ONGs locales o internacionales para proyectos compartidos." },
  ];
  return (
    <section className="v2-section v2-section--colab" id="colaborar">
      <img className="v2-colab__bg" src={PHOTOS.mesa} alt="" />
      <div className="v2-colab__veil" />
      <div className="v2-colab__inner">
        <div className="v2-section__head v2-section__head--light">
          <span className="v2-label v2-label--light">04 — Cómo colaborar</span>
          <h2 className="v2-h2 v2-h2--light">
            La Patagonia se cuida <em>en compañía.</em>
          </h2>
        </div>
        <div className="v2-ways">
          {ways.map((w) => (
            <div key={w.h} className="v2-ways__card">
              <h3>{w.h}</h3>
              <p>{w.p}</p>
              <a href="#contacto">Contactar →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contacto() {
  return (
    <section className="v2-section v2-section--contact" id="contacto">
      <div className="v2-contact">
        <div className="v2-contact__copy">
          <span className="v2-label">05 — Contacto</span>
          <h2 className="v2-h2">Trabajemos juntos.</h2>
          <p className="v2-lede">
            Si querés sumar tu organización, escuela, empresa o esfuerzo personal,
            escribinos. Respondemos cada mensaje.
          </p>
          <dl className="v2-contact__data">
            <div><dt>Sede</dt><dd>Gerónimo "Tinga" González 425<br/>San Antonio Oeste · Río Negro</dd></div>
            <div><dt>Email</dt><dd><a href="mailto:contacto@patagoniafiel.org">contacto@patagoniafiel.org</a></dd></div>
            <div><dt>Personería</dt><dd>En trámite · Constituida 15·12·2025</dd></div>
          </dl>
        </div>
        <form className="v2-contact__form" onSubmit={(e) => e.preventDefault()}>
          <label><span>Nombre</span><input type="text" placeholder="Tu nombre" /></label>
          <label><span>Email</span><input type="email" placeholder="vos@ejemplo.com" /></label>
          <label><span>Organización <i>(opcional)</i></span><input type="text" placeholder="Empresa, escuela, ONG…" /></label>
          <label><span>Mensaje</span><textarea rows="4" placeholder="Contanos en qué podemos colaborar."></textarea></label>
          <button type="submit" className="v2-btn v2-btn--primary v2-btn--block">Enviar mensaje</button>
        </form>
      </div>
    </section>
  );
}

function V2Footer() {
  return (
    <footer className="v2-footer">
      <img className="v2-footer__bg" src={PHOTOS.horizon} alt="" />
      <div className="v2-footer__veil" />
      <div className="v2-footer__inner">
        <div className="v2-footer__brand">
          <img src="assets/logo-color.png" alt="" />
          <div>
            <small>Fundación</small>
            <b>Patagonia Fiel</b>
          </div>
        </div>
        <p className="v2-footer__obj">
          "Generar espacios que fortalezcan el vínculo entre las personas y los
          territorios que habitan, promoviendo la revalorización de la naturaleza
          y su integración con la vida comunitaria."
        </p>
        <div className="v2-footer__bot">
          <span>© 2026 Fundación Patagonia Fiel</span>
          <span>San Antonio Oeste · Río Negro · Argentina</span>
        </div>
      </div>
    </footer>
  );
}

function SiteV2({ tweaks }) {
  const styleVars = {
    "--accent": tweaks.accent,
    "--font-display": tweaks.displayFont,
    "--font-body": tweaks.bodyFont,
    "--density": tweaks.density,
  };
  return (
    <div className="v2-site" id="top" style={styleVars}>
      <V2Nav />
      <PhotoHero />
      <Manifiesto />
      <PhotoQuote
        src={PHOTOS.seal}
        quote="La Bahía San Antonio es uno de los ecosistemas costeros más relevantes del Golfo San Matías, refugio de aves migratorias y fauna marina única."
      />
      <Quienes />
      <Programa />
      <PhotoQuote
        src={PHOTOS.steppe}
        quote="Cada generación que crece comprendiendo su territorio aprende a cuidarlo. La educación ambiental no es un curso: es una forma de habitar el lugar."
        source="Programa Bahía San Antonio bajo la lupa"
      />
      <Plan />
      <Colaborar />
      <Contacto />
      <V2Footer />
    </div>
  );
}

window.SiteV2 = SiteV2;
